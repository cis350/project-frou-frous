const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const dbURL = 'mongodb+srv://test:cis3500-2023@cluster0.r0pf1cv.mongodb.net/LectureExample?retryWrites=true&w=majority';

let MongoConnection;
// connection to the db
// eslint-disable-next-line consistent-return
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
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
 * READ all the students (HTTP GET /students)
 * https://app.swaggerhub.com/apis/ericfouh/StudentsRoster_App/1.0.0#/students/getStudents
 * @returns list/array of all the students enrolled in the course
 */
const getReports = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('reports').find({}).toArray();
    // print the results
    console.log(`Students: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return err;
  }
};

const addReport = async (userName) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('reports').insertOne(userName);
  return result.insertedId;
};

// export the functions
module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  getReports,
  addReport,
};
