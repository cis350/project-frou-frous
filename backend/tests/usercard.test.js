const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../model/reportsDB');

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
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('last reporter', async () => {
    const resp = await request(app).get('/Reports/lastreporter/andrew');
    expect(resp.status).toEqual(200);
    const data = JSON.parse(resp.text);
    expect(data).toBe('erik');
  });

  test('total weekly reports', async () => {
    const resp = await request(app).get('/Reports/reportsweekly/andrew');
    expect(resp.status).toEqual(200);
    const data = JSON.parse(resp.text);
    expect(data).toBe(0);
  });

  test('total reports', async () => {
    const resp = await request(app).get('/Reports/reports/andrew');
    expect(resp.status).toEqual(200);
    const data = JSON.parse(resp.text);
    expect(data).toBe(1);
  });

  test('most frequent reporter', async () => {
    const resp = await request(app).get('/Reports/mostreporter/andrew');
    expect(resp.status).toEqual(200);
    const data = JSON.parse(resp.text);
    expect(data).toBe('erik');
  });
});
