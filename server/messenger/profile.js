import rp from 'request-promise';

const FACEBOOK_TOKEN = process.env.FACEBOOK_TOKEN || '';

class Profile {
  constructor(psid){
    this.psid = psid;
    this.mock = (FACEBOOK_TOKEN.length == 0);
    this.url = `https://graph.facebook.com/v2.6/${psid}?fields=first_name,last_name,profile_pic&access_token=${FACEBOOK_TOKEN}`;
  }
  async get(){
    if (this.mock) return {};
    return rp({
      method: 'GET',
      uri: this.url,
      json: true
    });
  }
}

export default Profile;
