import rp from 'request-promise';

const FACEBOOK_TOKEN = process.env.FACEBOOK_TOKEN

class Profile {
  constructor(psid){
    this.url = `https://graph.facebook.com/v2.6/${psid}?fields=first_name,last_name,profile_pic&access_token=${FACEBOOK_TOKEN}`;
  }
  get(){
    return rp({
      method: 'GET',
      uri: this.url,
      json: true
    });
  }
}

export default Profile;
