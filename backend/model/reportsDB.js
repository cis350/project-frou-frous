// this is a node app, we must use commonJS modules/ require
// the names of the functions come from the operationId field
/**
 * This module implements model queries functions
 * the names of the functions come from the operationId field
 * in the API documentation
 */

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import ObjectID
// const { ObjectId } = require('mongodb');

// the mongodb server URL
const dbURL = 'mongodb+srv://kait:bvRU17DvKEu38fHb@froufrouscluster.w2cbat4.mongodb.net/?retryWrites=true&w=majority';

/**
 * MongoDB database connection
 * It will be exported so we can close the connection
 * after running our tests
 */
let MongoConnection;
// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'FrouFrous350' },
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    return MongoConnection;
  } catch (err) {
    // console.log(err.message);
    return err;
  }
};
/**
 *
 * @returns the database attached to this MongoDB connection
 */
const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

/**
 *
 * Close the mongodb connection
 */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

/**
 * GET report information
 * @param { reportId } the id of the report
 * @returns the report information
 */
const getReportData = async (reportId) => {
  const db = await getDB();
  const result = await db.collection('Reports').find({ _id: reportId }).toArray();
  if (result.length === 0) {
    throw new Error(`No report found with reportId: ${reportId}`);
  }
  return result[0];
};

/**
 * GET report comments
 * @param { reportId } id of report
 * @returns comments as an array of comment objects
 */
const getComments = async (reportId) => {
  const reportData = await getReportData(reportId);
  return reportData.comments.toArray();
};

/**
 * GET report likes
 * @param { reportId } id of report
 * @returns likes as an array of userId strings
 */
const getLikes = async (reportId) => {
  const reportData = await getReportData(reportId);
  return reportData.likes.toArray();
};

/**
 * PUSH a new comment
 */
const sendComment = async (reportId, newComment) => {
  const db = await getDB();
  await db.collection('Reports').updateOne(
    { _id: reportId },
    { $push: { comments: newComment } },
  );
};

/**
 * PUSH a new like
 */
const updateLikes = async (reportId, userId) => {
  const db = await getDB();
  if (db.collection('Reports').find({ _id: reportId, likes: { $in: [userId] } }).length() === 0) {
    await db.collection('Reports').updateOne(
      { _id: reportId },
      { $push: { likes: userId } },
    );
  } else {
    await db.collection('Reports').updateOne(
      { _id: reportId },
      { $pull: { likes: userId } },
    );
  }
};

const getTotalSkippedClasses = async (user) => {
  const db = await getDB();
  const reports = await db.collection('Reports').aggregate([
    { $match: { reporteeid: user } },
    { $group: { _id: '$reporteeid', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]).toArray();
  const ids = reports.map((value) => value._id); // eslint-disable-line
  let count = 0;
  console.log('ids', ids);
  console.log('Reports:', reports);
  reports.forEach((report) => {
    count = report.count;
  });
  console.log('count: ', count);
  return count;
};
const getMostReporter = async (user) => {
  const db = await getDB();
  const reports = await db.collection('Reports').aggregate([
    { $match: { reporteeid: user } },
    { $group: { _id: '$reporterid', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]).toArray();
  const ids = reports.map((value) => value._id); // eslint-disable-line
  let reporter = '';
  console.log('ids', ids);
  console.log('Reports:', reports);
  reports.forEach((report) => {
    reporter = report._id; // eslint-disable-line
  });
  console.log('reporter: ', reporter);
  return reporter;
};

module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  getComments,
  getLikes,
  sendComment,
  updateLikes,
  getReportData,
  getTotalSkippedClasses,
  getMostReporter,
};
