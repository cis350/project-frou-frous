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
const dbLibLogin = require('./model/LoginDBOperations');

// root endpoint route
webapp.get('/', (req, resp) => {
  console.log('Test', req.body);
  resp.json({ messge: 'hello CIS3500 friends!!! You have dreamy eyes' });
});

webapp.get('/user/:username', async (req, resp) => {
  if (!req.params.username) {
    resp.status(404).json({ message: 'user not found' });
    return;
  }
  const result = await dbLibLogin.getReport(req.params.username);
  resp.status(201).json({ data: result });
});

webapp.post('/user/createUser', async (req, resp) => {
  console.log('Creating User REQUEST BODY', req.body);
  if (!req.body.id || !req.body.password || !req.body.email
         || !req.body.firstName || !req.body.lastName || !req.body.friends
         || !req.body.friendsReq) {
    resp.status(404).json({ message: 'missing data' });
    return;
  }
  try {
    const newUser = {
      id: req.body.id,
      pasword: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      friends: req.body.friends,
      friendsReq: req.body.friendsReq,
    };
    const result = await dbLibLogin.addReport(newUser);
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
