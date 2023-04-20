/**
 * Express webserver / controller
 */

// import express
const express = require('express'); // eslint-disable-line 

// import the cors -cross origin resource sharing- module
const cors = require('cors'); // eslint-disable-line 
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dgyhizrvt',
  api_key: '665667247954395',
  api_secret: 'SLHkQi0yP4V4V9C5dzOHdBpgPus',
});

const bodyParser = require('body-parser') // eslint-disable-line 

// create a new express app
const webapp = express();

webapp.use(bodyParser.json());

// enable cors
webapp.use(cors());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const dbLib = require('./model/chatDB');

// root endpoint route
webapp.get('/', (req, resp) => {
  console.log('Test', req.body);
  resp.json({ messge: 'hello CIS3500 friends!!! You have dreamy eyes' });
});

/**
 * route implementation POST / chat/sendMessage
 */
webapp.post('/chat/sendMessage', async (req, resp) => {
  // parse the body
  console.log('Sending Message REQUEST BODY', req.body);
  if (!req.body.sender || !req.body.message || !req.body.chatId) {
    console.log('Send Message BAD BODY DATA');
    resp.status(404).json({ message: 'missing users or message' });
    return;
  }
  try {
    // create the new student object
    const newMessage = {
      chatId: req.body.chatId,
      sender: req.body.sender,
      message: req.body.message,
      timestamp: Date.now(),
    };
    const result = await dbLib.addMessage(newMessage);
    resp.status(201).json({ data: { id: result } });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/chat/user/:user1/:user2/:chat', async (req, resp) => {
  if (!req.params.user1 || !req.params.user2 || !req.params.chat) {
    resp.status(404).json({ message: 'missing users or message' });
    return;
  }

  const res = await dbLib.getMessages(req.params.user1, req.params.user2, req.params.chat);
  resp.status(201).json({ data: res });
});

webapp.get('/chat/getChatId/:user1/:user2', async (req, resp) => {
  if (!req.params.user1 || !req.params.user2) {
    resp.status(404).json({ message: 'missing users or message' });
    return;
  }

  const res = await dbLib.getChatId(req.params.user1, req.params.user2);
  resp.status(201).json({ data: res });
});

webapp.get('/chat/getFriends/:user', async (req, resp) => {
  console.log('Getting Friends');
  if (!req.params.user) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }

  const res = await dbLib.getFriends(req.params.user);
  resp.status(201).json({ data: res });
});

webapp.post('/report', async (req, resp) => {
  console.log('Reporting User', req.body.img);
  try {
    const imageResp = cloudinary.uploader.upload(req.body.img, {public_id: req.body.reporteeid})

    console.log('Image Response', imageResp);
    // create the new student object
    const newReport = {
      reporterid: req.body.reporterid,
      reporteeid: req.body.reporteeid,
      caption: req.body.caption,
      date: req.body.date,
      comments: [],
      likes: [],
      img: (await imageResp).secure_url,
    };
    console.log('hey');
    const result = await dbLib.reportUser(newReport);
    resp.status(201).json({ data: { id: result } });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation DELETE /student/:id
 */
// webapp.delete('/student/:id', async (req, res) => {
//   try {
//     const result = await dbLib.deleteStudent(req.params.id);
//     if (result.deletedCount === 0) {
//       res.status(404).json({ error: 'student not in the system' });
//       return;
//     }
//     // send the response with the appropriate status code
//     res.status(200).json({ message: result });
//   } catch (err) {
//     res.status(400).json({ message: 'there was error' });
//   }
// });

/**
 * route implementation PUT /student/:id
 */
// webapp.put('/student/:id', async (req, res) => {
//   console.log('UPDATE a student');
//   // parse the body of the request
//   if (!req.body.major) {
//     res.status(404).json({ message: 'missing major' });
//     return;
//   }
//   try {
//     const result = await dbLib.updateStudent(req.params.id, req.body.major);
//     // send the response with the appropriate status code
//     res.status(200).json({ message: result });
//   } catch (err) {
//     res.status(404).json({ message: 'there was error' });
//   }
// });

// export the webapp
module.exports = webapp;
