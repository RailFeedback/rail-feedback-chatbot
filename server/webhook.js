import { User, Message, Word } from './models';
import { Sender, Receiver } from './messenger';
import handler from './messages';
import Scorer from './scorer';

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const sender = new Sender();
const receiver = new Receiver();

const message_sender = (psid) => (message) => sender.send(message);

class Webhook {
    constructor(operator,trip){
      this.scorer = new Scorer(operator,trip);
    }
    async get(req, res){
      console.log(req.url);
      // Parse the query params
      let mode = req.query['hub.mode'];
      let token = req.query['hub.verify_token'];
      let challenge = req.query['hub.challenge'];
      console.log(mode,token,challenge);
      // Checks if a token and mode is in the query string of the request
      if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
          // Responds with the challenge token from the request
          console.log('WEBHOOK_VERIFIED');
          res.status(200).send(challenge);
        } else {
          // Responds with '403 Forbidden' if verify tokens do not match
          res.sendStatus(403);
        }
      }
    }
    async post(req,res){
      let body = req.body;
      // Checks this is an event from a page subscription
      if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        for (let entry of body.entry){
          // Gets the message. entry.messaging is an array, but
          // will only ever contain one message, so we get index 0
          const event = entry.messaging[0];
          console.log('EVENT',event,sender);
          // sender.send(event.sender.id,{text:'Hello my friend'});
          const words_getter = this.scorer.words_getter.bind(this.scorer);
          const word_conversion = this.scorer.word_conversion.bind(this.scorer);
          const methods = { words_getter, word_conversion };
          // Receive the message and handle user creation
          const { user, message } = await receiver.receive(event.sender.id,event.message);
          console.log('USER',user);
          console.log('MESSAGE',message);
          // Handle message
          const handle = async () => {
            if (message.text === "RESET") {
              user.state = 1;
              await user.save();
              return;
            }
            let response = await handler(user.state,message.text,methods);
            await sender.send(user.psid,response.message);
            // Send the reponse to the user
            if (response.previous) await handle();
            else if (response.next) user.state += 1;
            else if (response.completed) user.state = 4;
            await user.save();
          }
          await handle();
        }
        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
      } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
    }
}

export default Webhook;
