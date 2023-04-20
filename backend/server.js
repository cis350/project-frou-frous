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
const dbLib = require('./model/reportsDB');

webapp.get('reports/:reportId', async (req, resp) => {
  const res = await dbLib.getReportData(req.params.reportId);
  resp.status(201).json({ data: res });
});

webapp.put('reports/:reportId/sendComment', async (req, resp) => {
  console.log('Sending Comment REQUEST BODY', req.body);
  if (!req.body.userId || !req.body.message) {
    console.log('Send Comment BAD BODY DATA');
    resp.status(404).json({ message: 'missing input fields' });
    return;
  }
  try {
    // create the new student object
    const newComment = {
      commenterId: req.body.userId,
      content: req.body.message,
      timestamp: Date.now(),
    };
    const result = await dbLib.sendComment(req.params.reportId, newComment);
    resp.status(201).json({ data: { id: result } });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.put('reports/:reportId/updateLikes', async (req, resp) => {
  if (!req.body.userId) {
    console.log('Update Likes BAD BODY DATA');
    resp.status(404).json({ message: 'missing input fields' });
    return;
  }
  try {
    const result = await dbLib.updateLikes(req.params.reportId, req.body.userId);
    resp.status(201).json({ data: { id: result }});
  } catch (error) {
    resp.status(400).json({ message: 'There was an error' });
  }
});
