const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../model/chatDB');

const app = require('../server'); // or wherever your server file is located

let mongo;

describe('GET/PUT userfriends endpoint integration test', () => {
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
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await db.collection('User').updateOne(
        { _id: 'andrew' },
        { $set: { pfp: 'https://res.cloudinary.com/dgyhizrvt/image/upload/v1682231514/z10ia8evdilkeqkhmsa9.jpg' } },
      );
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('400 error user', async () => {
    const resp = await request(app).put('/user/changePfp');
    expect(resp.status).toEqual(400);
  });
});
