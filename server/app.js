import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import seed from './seed';
import Webhook from './webhook';
import { Word } from './models';
import Scorer from './analysis/scorer';

const PORT = process.env.PORT || '8888';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rail-bot';

// Create express app
const app = express();

const main = async () => {

  // Connect to MongoDB
  mongoose.Promise = Promise;
  mongoose.connect(MONGODB_URI,{ useMongoClient: true });
  mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });

  // Seed data and access default operator and trip
  const { gwr, london_swindon } = await seed();
  const scorer = new Scorer(gwr,london_swindon);
  const webhook = new Webhook(gwr,london_swindon);

  // Configure middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());

  // Configure resources
  app.get('/',(req,res) => res.send('Hello World'));

  // Now lets setup the webhook
  app.get('/webhook',webhook.get.bind(webhook));
  app.post('/webhook',webhook.post.bind(webhook));

  // API for words
  app.get('/words', async (req,res) => {
    let words = await scorer.word_finder();
    words = words.sort((a,b) => scorer.score(b) - scorer.score(a));
    res.json(words);
  });

  const server = app.listen(PORT,function(){
    const address = server.address();
    const link = `http://localhost:${address.port}/`;
    console.log('Server running at',link);
  });

}

app.started = main();
app.started.catch((error) => console.log(error));

export default module.exports = app;
