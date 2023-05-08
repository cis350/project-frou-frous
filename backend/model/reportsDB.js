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

const getLastReporter = async (user) => {
  const db = await getDB();
  const reports = await db.collection('Reports').find(
    { reporteeid: user },
    { _id: 0, reporterid: 1 },
  ).sort(
    { date: -1 },
  ).limit(1)
    .toArray();

  let reporter;
  if (reports[0]) {
    reporter = reports[0].reporterid;
  } else {
    reporter = 'NA';
  }
  return reporter;
};

const getMostReporter = async (user) => {
  const db = await getDB();
  const reports = await db.collection('Reports').aggregate([
    { $match: { reporteeid: user } },
    { $group: { _id: '$reporterid', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]).toArray();
  let id;
  if (reports[0]) {
    id = reports[0]._id; // eslint-disable-line
  } else {
    id = 'NA';
  }
  return id;
};

const getTotalReports = async (user) => {
  const db = await getDB();
  const reports = await db.collection('Reports').countDocuments(
    { reporteeid: user },
  );
  return reports;
};

const getTotalClasses = async (user) => {
  const db = await getDB();
  const result = await db.collection('User').findOne({ _id: user });
  let total = 0;
  if (result.d0) {
    total += result.d0.length;
  }
  if (result.d1) {
    total += result.d1.length;
  }
  if (result.d2) {
    total += result.d2.length;
  }
  if (result.d3) {
    total += result.d3.length;
  }
  if (result.d4) {
    total += result.d4.length;
  }
  return total;
};

const getWeeklyReports = async (user) => {
  const db = await getDB();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoTime = weekAgo.getTime();
  const reports = await db.collection('Reports').countDocuments({
    reporteeid: user,
    date: { $gt: weekAgoTime },
  });

  return reports;
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
  getLastReporter,
  getMostReporter,
  getTotalReports,
  getTotalClasses,
  getWeeklyReports,
};
