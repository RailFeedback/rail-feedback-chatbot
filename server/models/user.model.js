import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const user = new mongoose.Schema({
  psid: String,
  first_name: String,
  last_name: String,
  profile_pic: String,
  gender: String
});

export default mongoose.model('User', user);
