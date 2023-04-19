const request = require('supertest');
const { ObjectId } = require('mongodb');
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
        { _id: 'jess' },
        { $pull: { friendReqs: 'e' } },
      );
      await db.collection('User').updateOne(
        { _id: 'e' },
        { $addToSet: { friendReqs: { $each: ['test1', 'test2', 'test3'] } } },
      );
      await db.collection('User').updateOne(
        { _id: 'e' },
        { $addToSet: { friends: { $each: ['testf1', 'testf2', 'testf3'] } } },
      );
      await db.collection('User').updateOne(
        { _id: 'e' },
        { $pull: { friends: 'test2' } },
      );
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Get user endpoint status code and data', async () => {
    const resp = await request(app).get('/user/jess');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    const userdata = JSON.parse(resp.text);
    expect(userdata).toBeDefined();
    expect(userdata.data[0].firstName).toEqual('jess');
  });

  test('404 error user', async () => {
    const resp = await request(app).get('/user');
    expect(resp.status).toEqual(404);
  });

  test('400 error user', async () => {
    const resp = await request(app).get('/user/nouser');
    expect(resp.status).toEqual(404);
  });

  test('Send friend req', async () => {
    const res = await request(app).put('/user/sendfriendreq/e/jess');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedUser = await db.collection('User').findOne({ _id: 'jess' });
    expect(updatedUser.friendReqs).toContain('e');
  });

  test('404 error sendfriendreq', async () => {
    const resp = await request(app).get('/user/sendfriendreq/e');
    expect(resp.status).toEqual(404);
  });

  test('Remove friend req', async () => {
    const res = await request(app).put('/user/removefriendreq/e/test1');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedUser = await db.collection('User').findOne({ _id: 'e' });
    expect(updatedUser.friendReqs).not.toContain('test1');
  });

  test('404 error removefriendreq', async () => {
    const resp = await request(app).get('/user/removefriendreq/e');
    expect(resp.status).toEqual(404);
  });

  test('Remove friend', async () => {
    const res = await request(app).put('/user/removefriend/e/testf1');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedUser = await db.collection('User').findOne({ _id: 'e' });
    expect(updatedUser.friends).not.toContain('testf1');
  });

  test('404 error remove', async () => {
    const resp = await request(app).get('/user/removefriend/e');
    expect(resp.status).toEqual(404);
  });

  test('Add friend', async () => {
    const res = await request(app).put('/user/addfriend/e/test2');
    expect(res.status).toEqual(200);
    expect(res.type).toBe('application/json');

    // the database was updated
    const updatedUser = await db.collection('User').findOne({ _id: 'e' });
    expect(updatedUser.friends).toContain('test2');
    expect(updatedUser.friendReqs).not.toContain('test2');
  });

  test('404 error addfriend', async () => {
    const resp = await request(app).get('/user/addfriend/e');
    expect(resp.status).toEqual(404);
  });
});
