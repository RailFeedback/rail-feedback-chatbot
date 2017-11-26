import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import seed from './seed';
import models from './models';
import Webhook from './webhook';

const PORT = process.env.PORT || '8888';
const MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rail-bot';

// Connect to MongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGOLAB_URI,{ useMongoClient: true });
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Seed data
seed();

// Create express app
const app = express();
const webhook = new Webhook();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Configure resources
app.get('/', (req, res) => res.send('Hello World'));

// Now lets setup the webhook
app.get('/webhook',webhook.get.bind(webhook));
app.post('/webhook',webhook.post.bind(webhook));

const server = app.listen(PORT, function () {
    const address = server.address();
    const link = `http://localhost:${address.port}/`;
    console.log('Server running at', link);
});

export default app;
