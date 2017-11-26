import request from 'supertest';
// import mongoose from 'mongoose';
// import mockgoose from 'mockgoose';

import app from './app';
import { Message, Operator, Trip, User, Word } from './models';

// beforeAll(function(done) {
//   mockgoose(mongoose).then(() => mongoose.connect('',done))
// });
//
//
// afterEach(function() {
//     mockgoose.reset();
// });
//
// afterAll(function() {
//     mongoose.connection.close();
//     // mockgoose.
// });

beforeEach( async () => {
  await app.started;
});

afterAll( async () => {
  await Promise.all([Message, Operator, Trip, User, Word].map((Model) => Model.remove()));
})

test('it should load hello world', async () => {
  let response = await request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect(200)
})

const data = {
  "object":"page",
  "entry":[
    {
      "id":"3456",
      "time":1458692752478,
      "messaging":[
        {
          "sender":{
            "id":"1234"
          },
          "recipient":{
            "id":"3456"
          },
          "timestamp":1458692752478,
          "message":{
            "mid":"mid.1457764197618:41d102a3e1ae206a38",
            "text":"hello, world!",
            "quick_reply": {
              "payload": "<DEVELOPER_DEFINED_PAYLOAD>"
            }
          }
        }
      ]
    }
  ]
}

test('simple webhook should work', async () => {
  await request(app).post('/webhook').send(data).expect(200)
  data.entry[0].messaging[0].message.mid = 'new1';
  data.entry[0].messaging[0].message.text = 'yes';
  await request(app).post('/webhook').send(data).expect(200)
  data.entry[0].messaging[0].message.mid = 'new2';
  data.entry[0].messaging[0].message.text = 'seat';
  await request(app).post('/webhook').send(data).expect(200)
  data.entry[0].messaging[0].message.mid = 'new3';
  data.entry[0].messaging[0].message.text = 'None available';
  await request(app).post('/webhook').send(data).expect(200)
})
