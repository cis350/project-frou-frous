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
const { ObjectId } = require('mongodb');

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

/**
 * CREATE a new student (HTTP POST /student)
 * https://app.swaggerhub.com/apis/ericfouh/StudentsRoster_App/1.0.0#/students/addStudent
 * @param {newMessafe}   the new message object
 * @returns the id of the new student
 */
const addMessage = async (newMessage) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('ChatMessages').insertOne(newMessage);
  return result.insertedId;
};

const getMessages = async (user1, user2, chatId) => {
  const db = await getDB();
  const results = await db.collection('ChatMessages').find({$and: [
    { sender: { $in: [user1, user2] } },
    { chatId },
  ] })
    .sort({ timestamp: 1 }).toArray();
  return results;
};

const getChatId = async (user1, user2) => {
  const db = await getDB();
  const chatId = await db.collection('ChatIds').findOne({
    $and: [
      { user1: { $in: [user1, user2] } },
      { user2: { $in: [user1, user2] } },
    ],
  });
  if (!chatId) {
    const resInsert = await db.collection('ChatIds').insertOne({ user1, user2 });
    return resInsert.insertedId;
  }
  return chatId._id; // eslint-disable-line
};

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  addMessage,
  getMessages,
  getChatId,
  // getStudents,
  // getStudent,
  // updateStudent,
  // deleteStudent,
};
