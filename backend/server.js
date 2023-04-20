/**
 * Express webserver / controller
 */

// import express
const express = require('express'); // eslint-disable-line 

// import the cors -cross origin resource sharing- module
const cors = require('cors'); // eslint-disable-line 

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
  const res = await dbLib.getMessages(req.params.user1, req.params.user2, req.params.chat);
  resp.status(200).json({ data: res });
});

webapp.get('/chat/getChatId/:user1/:user2', async (req, resp) => {
  const res = await dbLib.getChatId(req.params.user1, req.params.user2);
  resp.status(200).json({ data: res });
});

webapp.get('/chat/getFriends/:user', async (req, resp) => {
  const res = await dbLib.getFriends(req.params.user);
  resp.status(200).json({ data: res });
});

webapp.get('/user/:user', async (req, resp) => {
  if (!req.params.user) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }
  const res = await dbLib.getUserData(req.params.user);
  if (res.length === 0) {
    resp.status(404).json({ message: 'user not found' });
    return;
  }
  resp.status(200).json({ data: res });
});

webapp.post('/user/', async (req, resp) => {
  console.log('Creating User REQUEST BODY', req.body);
  if (!req.body.id || !req.body.password || !req.body.email
         || !req.body.firstName || !req.body.lastName || !req.body.friends
         || !req.body.friendReqs) {
    console.log('here');
    resp.status(404).json({ message: 'missing data' });
    return;
  }
  try {
    const newUser = {
      id: req.body.id,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      friends: req.body.friends,
      friendReqs: req.body.friendReqs,
      email: req.body.email,
      pfp: 'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
    };
    console.log('newUser', newUser);
    const result = await dbLib.addUser(newUser);
    console.log('result after post: ', result);
    resp.status(201).json({ data: { id: result } });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.put('/user/addfriend/:user/:friend', async (req, resp) => {
  if (!req.params.user || !req.params.friend) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }
  const res = await dbLib.addFriend(req.params.user, req.params.friend);
  resp.status(200).json({ data: res });
});

webapp.put('/user/removefriend/:user/:friend', async (req, resp) => {
  if (!req.params.user || !req.params.friend) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }
  const res = await dbLib.removeFriend(req.params.user, req.params.friend);
  resp.status(200).json({ data: res });
});

webapp.put('/user/sendfriendreq/:user/:friend', async (req, resp) => {
  if (!req.params.user || !req.params.friend) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }
  const res = await dbLib.sendFriendReq(req.params.user, req.params.friend);
  resp.status(200).json({ data: res });
});

webapp.put('/user/removefriendreq/:user/:friend', async (req, resp) => {
  if (!req.params.user || !req.params.friend) {
    resp.status(404).json({ data: 'missing user' });
    return;
  }
  const res = await dbLib.removeFriendReq(req.params.user, req.params.friend);
  resp.status(200).json({ data: res });
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
