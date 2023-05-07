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

// /**
//  * READ all the students (HTTP GET /students)
//  * https://app.swaggerhub.com/apis/ericfouh/StudentsRoster_App/1.0.0#/students/getStudents
//  * @returns list/array of all the students enrolled in the course
//  */
// const getStudents = async () => {
//   try {
//     // get the db
//     const db = await getDB();
//     const result = await db.collection('students').find({}).toArray();
//     // print the results
//     console.log(`Students: ${JSON.stringify(result)}`);
//     return result;
//   } catch (err) {
//     console.log(`error: ${err.message}`);
//   }
// };

// getStudents();

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

/**  This is a callback version of a mongodb query
  db.collection('students').insertOne(
    newStudent,
    (err, result) => {
      // if there was an error
      if (err) {
        console.log(`error: ${err.message}`);
      }
      // print the id of the student
      console.log(`New student created with id: ${result.insertedId}`);
      // return the result
      return result.insertedId;
    },
  );
  */
};

const getMessages = async (user1, user2, chatId) => {
  const db = await getDB();
  const results = await db.collection('ChatMessages').find({ $and: [
    { sender: { $in: [user1, user2] } },
    { chatId },
  ] })
    .sort({ timestamp: 1 }).toArray();
  return results;
};

const getUserData = async (user) => {
  const db = await getDB();
  const results = await db.collection('User').find({ _id: user }).toArray();
  return results;
};

const addUser = async (userName) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('User').insertOne({ _id: userName.id,
    password: userName.password,
    firstName: userName.firstName,
    lastName: userName.lastName,
    friends: userName.friends,
    friendReqs: userName.friendReqs,
    email: userName.email,
    pfp: userName.pfp,
  });
  return result;
};

const removeFriend = async (user, friend) => {
  const db = await getDB();
  const userUpdateResult = await db.collection('User').updateOne(
    { _id: user },
    { $pull: { friends: friend } },
  );
  const friendUpdateResult = await db.collection('User').updateOne(
    { _id: friend },
    { $pull: { friends: user } },
  );
  return {
    userUpdateResult,
    friendUpdateResult,
  };
};

const addFriend = async (user, friend) => {
  const db = await getDB();
  const userUpdateResult = await db.collection('User').updateOne(
    { _id: user },
    {
      $pull: { friendReqs: friend },
      $addToSet: { friends: friend },
    },
  );
  const friendUpdateResult = await db.collection('User').updateOne(
    { _id: friend },
    {
      $pull: { friendReqs: user },
      $addToSet: { friends: user },
    },
  );
  return {
    userUpdateResult,
    friendUpdateResult,
  };
};

const removeFriendReq = async (user, friend) => {
  const db = await getDB();
  const userUpdateResult = await db.collection('User').updateOne(
    { _id: user },
    { $pull: { friendReqs: friend } },
  );
  const friendUpdateResult = await db.collection('User').updateOne(
    { _id: friend },
    { $pull: { friendReqs: user } },
  );
  return {
    userUpdateResult,
    friendUpdateResult,
  };
};

const sendFriendReq = async (user, friend) => {
  const db = await getDB();
  const results = await db.collection('User').updateOne(
    { _id: friend },
    { $addToSet: { friendReqs: user } },
  );
  return results;
};

// const updateStudent = async (studentID, newMajor) => {
//   try {
//     // get the db
//     const db = await getDB();
//     const result = await db.collection('students').updateOne(
//       { _id: ObjectId(studentID) },
//       { $set: { major: newMajor } },
//     );
//     return result;
//   } catch (err) {
//     console.log(`error: ${err.message}`);
//   }
// };

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

/* eslint-disable no-unreachable */
const getFriends = async (user) => {
  console.log('getting friends');
  const db = await getDB();
  console.log('user', user);
  const userData = await db.collection('User').findOne({ _id: user });
  console.log('user data', userData);
  if (!userData) {
    return { error: 'User does not exist' };
  }
  console.log('User Data', userData);
  const { friends } = userData;
  if (!friends || friends.length === 0) {
    return [];
  }
  const friendData = await db.collection('User').find({ _id: { $in: friends } }).toArray();
  console.log('Friend Data', friendData);
  const chatIdsData = await db.collection('ChatIds').find({ $or: [{ user1: user }, { user2: user }] }).toArray();
  const chatIds = chatIdsData.map(
    (val) => (val._id.toHexString()), //eslint-disable-line
  );
  console.log('ChatIdsData Data', chatIdsData);
  console.log('ChatIds', chatIds);
  const lastMessages = await db.collection('ChatMessages').find({ chatId: { $in: chatIds } }).sort({ timestamp: -1 }).limit(chatIds.length)
    .toArray();
  // {
  //   message: 'hello hello',
  //   friend: 'John Doe',
  //   friendImage: 'https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg',
  //   timestamp: 1679326514,
  // }
  console.log('lastMessages Data', lastMessages);
  const data = [];
  // console.log('friendData.length', friendData.length);
  for (let i = 0; i < friendData.length; i += 1) {
    let chatId = chatIdsData.find((idData) => (idData.user1 === user //eslint-disable-line
      && idData.user2 === friendData[i]._id) //eslint-disable-line
      || (idData.user2 === user && idData.user1 === friendData[i]._id)); //eslint-disable-line
    console.log('Chat Id', chatId);
    if (chatId) {
      chatId = chatId._id.toHexString(); //eslint-disable-line
      const lastMessageData = lastMessages.find((message) => (message.chatId
      === chatId));
      console.log('lastMessageData', lastMessageData);
      if (lastMessageData) {
        data.push({
          message: lastMessageData.message,
          friend: friendData[i]._id, //eslint-disable-line
          friendImage: friendData[i].pfp,
          timestamp: lastMessageData.timestamp,
        });
      } else {
        data.push({
          message: '',
          friend: friendData[i]._id, //eslint-disable-line
          friendImage: friendData[i].pfp,
          timestamp: -1,
        });
      }
    } else {
      data.push({
        message: '',
        friend: friendData[i]._id, //eslint-disable-line
        friendImage: friendData[i].pfp,
        timestamp: -1,
      });
    }
  }
  console.log('return Data', data);
  return data;
};

const reportUser = async (newReport) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('Reports').insertOne(newReport);
  return result.insertedId;
};

const changePfp = async (user, pfp) => {
  const db = await getDB();
  const result = await db.collection('User').updateOne(
    { _id: user },
    { $set: { pfp } },
  );
  return result;
};

const getSchedule = async (user) => {
  const db = await getDB();
  const result = await db.collection('User').findOne({ _id: user });
  const res = [{ day: 'Monday', classes: result.d0 },
    { day: 'Tuesday', classes: result.d1 },
    { day: 'Wednesday', classes: result.d2 },
    { day: 'Thursday', classes: result.d3 },
    { day: 'Friday', classes: result.d4 }];
  return res;
};

const addClass = async (user, classData, day) => {
  const db = await getDB();
  const result = await db.collection('User').updateOne(
    { _id: user },
    { $addToSet: { [`d${day}`]: classData } },
  );
  return result;
};

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  addMessage,
  getMessages,
  getChatId,
  getFriends,
  reportUser,
  getUserData,
  removeFriend,
  addFriend,
  removeFriendReq,
  sendFriendReq,
  addUser,
  changePfp,
  getSchedule,
  addClass,
};