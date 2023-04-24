// this is a node app, we must use commonJS modules/ require
// the names of the functions come from the operationId field
/**
 * This module implements model queries functions
 * the names of the functions come from the operationId field
 * in the API documentation
 */

// import the mongodb driver
const { MongoClient } = require('mongodb');

// the mongodb server URL
const dbURL = 'mongodb+srv://kait:bvRU17DvKEu38fHb@froufrouscluster.w2cbat4.mongodb.net/';

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
    console.log(err.message);
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

const getLeaders = async () => {
  const db = await getDB();
  const reports = await db.collection('Reports').aggregate([
    { $group: { _id: '$reporteeid', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]).toArray();
  const ids = reports.map((value) => value._id); // eslint-disable-line
  console.log('ids', ids);
  console.log('Reports:', reports);
  const users = await db.collection('User').find({ _id: { $in: ids } }).toArray();
  const results = [];
  reports.forEach((report) => {
    //console.log('report', report);
    const userId = users.find((user) => user._id == report._id); //eslint-disable-line
    //console.log('userId', userId);
    if (userId) {
      results.push({
        user: userId._id, //eslint-disable-line
        skippedClasses: report.count,
        img: userId.pfp,
      });
    }
  });
  // {
  //   "user": "Master Skipper",
  //   "skippedClasses": 50,
  //   "img": "https://th.bing.com/th/id/OIP.LwtFn1J76QdOEiBjvMvKLAHaJu?pid=ImgDet&rs=1"
  // },
  console.log('Results:', results);
  return results;
};

// export the functions
module.exports = {
  getLeaders,
  closeMongoDBConnection,
  connect,
};
