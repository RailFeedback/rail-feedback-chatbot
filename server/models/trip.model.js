import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const trip = new mongoose.Schema({
  start_station: String,
  end_station: String,
  start_time: Date,
  end_time: Date
});

export default mongoose.model('Trip', trip);
