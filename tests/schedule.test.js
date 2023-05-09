const request = require('supertest');
// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../model/chatDB');

const app = require('../server'); // or wherever your server file is located

let mongo;

describe('PUT GET schedule endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db; // eslint-disable-line
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
  }, 10000);

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  // eslint-disable-next-line consistent-return
  afterAll(async () => {
    try {
      await db.collection('Reports').updateOne(
        { caption: 'qwerty' },
      );
      await mongo.close();
      return closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Put schedule 201', async () => {
    const resp = await request(app).put('/classes/testuser/0').send({
      name: 'testclass',
      location: 'testlocation',
      start: 0,
      end: 1000,
    });
    expect(resp.status).toEqual(201);
  });
  test('Put schedule 404', async () => {
    const resp = await request(app).post('/classes').send({
      name: 'testclass',
      location: 'testlocation',
      start: 0,
      end: 1000,
    });
    expect(resp.status).toEqual(404);
  });
  test('Get schedule 200', async () => {
    const resp = await request(app).get('/schedule/testuser');
    expect(resp.status).toEqual(200);
  });
});
