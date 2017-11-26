import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const message = new mongoose.Schema({
  user: {
    ref: 'User',
    type: ObjectId,
  },
  mid: String,
  text: String,
  quick_reply: {
    payload: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Message', message);
