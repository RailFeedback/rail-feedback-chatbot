import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const operator = new mongoose.Schema({
  name: String
});

export default mongoose.model('Operator', operator);
