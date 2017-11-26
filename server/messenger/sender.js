import rp from 'request-promise';

const FACEBOOK_TOKEN = process.env.FACEBOOK_TOKEN || '';

class Sender {
  constructor(){
    this.mock = (FACEBOOK_TOKEN.length == 0);
    this.url = `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_TOKEN}`
  }
  async send(psid,message){
    if (this.mock) return
    const data = {
      recipient: { id:psid },
      messaging_type: 'RESPONSE',
      message: message
    }
    console.log('SEND',psid,message);
    await rp({
      method: 'POST',
      uri: this.url,
      body: data,
      json: true
    });
  }
}

export default Sender;
