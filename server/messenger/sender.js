import rp from 'request-promise';

const FACEBOOK_TOKEN = process.env.FACEBOOK_TOKEN

class Sender {
  constructor(){
    this.url = `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_TOKEN}`
  }
  async send(psid,message){
    const data = {
      recipient: { id:psid },
      messaging_type: 'RESPONSE',
      message: message
    }
    await rp({
      method: 'POST',
      uri: this.url,
      body: data,
      json: true
    });
    return;
  }
}

export default Sender;
