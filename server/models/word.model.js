import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const word = new mongoose.Schema({
  trip: {
    ref: 'Trip',
    type: ObjectId,
  },
  operator: {
    ref: 'Operator',
    type: ObjectId,
  },
  word: {
    type: String,
    lower: true
  },
  impressions: {
    type: Number,
    default: 0
  },
  conversions: {
    type: Number,
    default: 0
  },
  rank: Number
});

export default mongoose.model('Word', word);
