import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';

import Webhook from './webhook';

const PORT = process.env.PORT || '8888';

// // Connect to MongoDB
// mongoose.connect(config.mongo.uri,{ useMongoClient: true });
// mongoose.connection.on('error', function(err) {
//   console.error('MongoDB connection error: ' + err);
//   process.exit(-1);
// });

// Create express app
const app = express();
const webhook = new Webhook();

// Configure middleware
// if (config.debug) app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Configure resources
app.get('/', (req, res) => res.send('Hello World'));

// Now lets setup the webhook
app.post('/webhook', webhook.request.bind(webhook));

const server = app.listen(PORT, function () {
    const address = server.address();
    const link = `http://localhost:${address.port}/`;
    console.log('Server running at', link);
});

export default app;
