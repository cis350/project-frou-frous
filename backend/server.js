/**
 * Express webserver / controller
 */

// import express
const express = require('express'); // eslint-disable-line 

// import the cors -cross origin resource sharing- module
const cors = require('cors'); // eslint-disable-line 
// eslint-disable-next-line import/no-extraneous-dependencies
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

// webapp.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const dbLib = require('./model/chatDB');
const dbLib2 = require('./model/reportsDB');
const dbLibLeaderboad = require('./model/leaderboardDB');

webapp.get('/leaderboard', async (req, resp) => {
  const res = await dbLibLeaderboad.getLeaders();
  resp.status(200).json(res);
});

webapp.get('/Reports/lastreporter/:user', async (req, resp) => {
  const res = await dbLib2.getLastReporter(req.params.user);
  resp.status(200).json(res);
});
webapp.get('/Reports/mostreporter/:user', async (req, resp) => {
  const res = await dbLib2.getMostReporter(req.params.user);
  resp.status(200).json(res);
});

webapp.get('/Reports/reports/:user', async (req, resp) => {
  const res = await dbLib2.getTotalReports(req.params.user);
  resp.status(200).json(res);
});

webapp.get('/Reports/reportsweekly/:user', async (req, resp) => {
  const res = await dbLib2.getWeeklyReports(req.params.user);
  resp.status(200).json(res);
});

webapp.get('/Reports/getUserData/:user', async (req, resp) => {
  const res = await dbLib2.getUserHistory(req.params.user);
  resp.status(200).json({ data: res });
});

webapp.get('/Schedule/totalclasses/:user', async (req, resp) => {
  const res = await dbLib2.getTotalClasses(req.params.user);
  resp.status(200).json({ data: res });
});

webapp.get('/Reports/:reportId/getReportData', async (req, resp) => {
  const res = await dbLib2.getReportData(req.params.reportId);
  // console.log(res);
  resp.status(200).json({ data: res });
});

webapp.put('/Reports/:reportId/sendComment', async (req, resp) => {
  console.log('Sending Comment REQUEST BODY', req.body);
  if (!req.body.commenterid || !req.body.content) {
    console.log(!req.body.commenterid);
    console.log('Send Comment: BAD BODY DATA');
    resp.status(404).json({ message: 'missing input fields' });
    return;
  }
  try {
    // create the new student object
    const newComment = {
      commenterid: req.body.commenterid,
      content: req.body.content,
      timestamp: Date.now(),
    };
    const result = await dbLib2.sendComment(req.params.reportId, newComment);
    resp.status(201).json({ data: { id: result } });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error in sending comment' });
    console.log(err);
  }
});

webapp.put('/Reports/:reportId/updateLikes', async (req, resp) => {
  console.log('server.js Updating Likes REQUEST BODY', req.body);
  if (!req.body.userId || !req.body.reportId) {
    console.log('Update Likes: BAD BODY DATA');
    resp.status(404).json({ message: 'missing input fields' });
    return;
  }
  try {
    const result = await dbLib2.updateLikes(req.body.reportId, req.body.userId, req.body.isLiked);
    resp.status(201).json({ data: { id: result } });
  } catch (error) {
    console.log(error);
    resp.status(400).json({ message: 'There was an error in updating likes.' });
  }
});
// webapp.put('/Reports/:reportId/updateLikes', async (req, resp) => {
//   resp.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   resp.set('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
//   console.log('update likes has been called');
//   if (!req.body.userId) {
//     console.log('Update Likes BAD BODY DATA');
//     resp.status(404).json({ message: 'missing input fields' });
//     return;
//   }
//   try {
//     console.log('userId');
//     console.log(req.body.userId);
//     console.log('webapp route handler successfully called');
//     const result = await dbLib2.updateLikes(req.params.reportId, req.body.userId);
//     resp.status(201).json({ data: { id: result } });
//   } catch (error) {
//     console.log('userId');
//     console.log(req.body.userId);
//     console.log('HERE IS AN ERROR!!!!');
//     resp.status(400).json({ message: 'There was an error' });
//   }
//   console.log('webapp route handler done');
// });

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

webapp.get('/user/:userId/getFriendReports', async (req, resp) => {
  if (!req.params.userId) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }
  try {
    const res = await dbLib2.getFriendReports(req.params.userId);
    resp.status(200).json({ data: res });
  } catch (error) {
    resp.status(400).json({ message: 'There was an error' });
  }
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

webapp.put('/user/changePfp', async (req, resp) => {
  try {
    const imageResp = cloudinary.uploader.upload(req.body.pfp);
    const imgUrl = (await imageResp).secure_url;
    console.log('imgUrl', imgUrl);
    const result = await dbLib.changePfp(req.body.user, imgUrl);
    resp.status(201).json({ data: result });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/report', async (req, resp) => {
  console.log('Reporting User', req.body.img);
  try {
    const imageResp = cloudinary.uploader.upload(req.body.img, { public_id: req.body.reporteeid });
    // create the new student object
    const newReport = {
      _id: req.body.id,
      reporterid: req.body.reporterid,
      reporteeid: req.body.reporteeid,
      caption: req.body.caption,
      date: req.body.date,
      comments: [],
      likes: [],
      img: (await imageResp).secure_url,
    };
    const result = await dbLib.reportUser(newReport);
    resp.status(201).json({ data: { id: result } });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/schedule/:user', async (req, resp) => {
  if (!req.params.user) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }
  const res = await dbLib.getSchedule(req.params.user);
  resp.status(200).json({ data: res });
});

webapp.put('/classes/:user/:day', async (req, resp) => {
  if (!req.params.user) {
    resp.status(404).json({ message: 'missing user' });
    return;
  }
  const res = await dbLib.addClass(req.params.user, req.body, req.params.day);
  resp.status(201).json({ data: res });
});

module.exports = webapp;
