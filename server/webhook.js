import { User, Message, Word } from './models';
import { Sender, Reciever } from './messenger';
import Scorer from './scorer';

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const sender = new Sender();
const reteciever = new Reciever();

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
        body.entry.forEach(function(entry) {
          // Gets the message. entry.messaging is an array, but
          // will only ever contain one message, so we get index 0
          const event = entry.messaging[0];
          console.log('EVENT',event,sender);
          // sender.send(event.sender.id,{text:'Hello my friend'});
          const words_getter = scorer.words_getter.bind(scorer);
          const word_conversion = scorer.word_conversion.bind(scorer);
          const methods = { words_getter, word_conversion };
          // Recieve the message and handle user creation
          const { user, message } = reciever.recieve(event.sender.id,event.message);
          // Handle message
          const handle = () => {
            let { message, next, previous, completed } = handler(user.rank,message.text,methods);
            sender.send(user.psid,message);
            // Send the reponse to the user
            if (previous) handle();
            else if (next) user.rank += 1;
            else if (completed) user.rank = 0;
          }
          handle();
        });
        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
      } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
    }
}

export default Webhook;
