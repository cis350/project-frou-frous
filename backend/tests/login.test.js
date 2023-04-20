const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../model/chatDB');

const app = require('../server'); // or wherever your server file is located
const { deleteTestDataFromDB } = require('./testUtils');

let mongo;

describe('POST /user enpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  /**
     * We need to make the request to the endpoint
     * before running any test.
     * We need to connecto the DB for all the DB checks
     * If beforeAll is undefined
     * inside .eslintrc.js, add 'jest' to the 'env' key
     */
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();

    // send the request to the API and collect the response
    response = await request(app).post('/user')
      .send('id=testuser&firstName=Sam&email=a@upenn.edu&lastName=Smith&password=sam&friends=[]&friendsReq=[]');
  });

  /**
 * After running the tests, we need to remove any test data from the DB
 * We need to close the mongodb connection
 */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await deleteTestDataFromDB(db, 'testuser');
      await mongo.close(); // the test  file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
  });

  /**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new user is in the returned data', () => {
    // expect the id of the new student to not be undefined
    expect(JSON.parse(response.text).data.id).not.toBe(undefined);
  });

  test('The new user is in the database', async () => {
    const insertedUser = await db.collection('User').findOne({ _id: 'testuser' });
    expect(insertedUser.firstName).toEqual('Sam');
  });

  test('missing a field (email) 404', async () => {
    const res = await request(app).post('/user/')
      .send('_id=testuser&email=cis');
    expect(res.status).toEqual(404);
  });
});

// TEST Get ENDPOINT
describe('GET user(s) endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;

  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    await deleteTestDataFromDB(db, 'teststudent');
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Get a student endpoint status code and data', async () => {
    const resp = await request(app).get('/user/jess');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const userdata = JSON.parse(resp.text);
    expect(userdata).toBeDefined();
    expect(userdata.data[0].firstName).toEqual('jess');
  });

  test('user not in db status code 404', async () => {
    const resp = await request(app).get('/user/z');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});
