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
  let chatId; // eslint-disable-line
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const users = [
      {
        _id: 'testUser1', password: 'testUser1', email: 'testUser1@gmail.com', firstName: 'testUser1', friendReqs: [], friends: ['testUser2'], lastName: 'ling', pfp: 'https://i.pinimg.com/originals/f2/57/f8/f257f8fbb1a4dc409119291200d8a209.jpg',
      },
      {
        _id: 'testUser2', password: 'testUser2', email: 'testUser1@gmail.com', firstName: 'testUser2', friendReqs: [], friends: ['testUser1'], lastName: 'ling', pfp: 'https://i.pinimg.com/originals/f2/57/f8/f257f8fbb1a4dc409119291200d8a209.jpg',
      },
    ];
    db.collection('User').insertMany(users);
    const resp = await request(app).get('/chat/getChatId/testUser1/testUser2');
    chatId = JSON.parse(resp.text).data;
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await db.collection('ChatMessages').deleteMany({ chatId });
      await db.collection('User').deleteMany({ $or: [{ _id: 'testUser1' }, { _id: 'testUser2' }] });
      await db.collection('ChatIds').deleteOne({ _id: new ObjectId(chatId) });
      await mongo.close();
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  //   test('Get user endpoint status code and data', async () => {
  //     const resp = await request(app).get('/user/testUser1');
  //     expect(resp.status).toEqual(200);
  //     expect(resp.type).toBe('application/json');
  //     const userdata = JSON.parse(resp.text);
  //     expect(userdata).toBeDefined();
  //     expect(userdata.data[0].firstName).toEqual('testUser1');
  //   });

  test('404 error send chat message', async () => {
    const resp = await request(app).post('/chat/sendMessage');
    expect(resp.status).toEqual(404);
  });

  test('200 send chat message', async () => {
    const resp = await request(app).post('/chat/sendMessage').send(`sender=testUser1&message=hello&chatId=${chatId}`);
    expect(resp.status).toEqual(201);
  });

  test('200 get messages', async () => {
    const resp = await request(app).get(`/chat/user/testUser2/testUser1/${chatId}`);
    expect(resp.status).toEqual(201);
    const { data } = JSON.parse(resp.text);
    expect(data.length).toEqual(1);
    const respAdd = await request(app).post('/chat/sendMessage').send(`sender=testUser1&message=hello&chatId=${chatId}`);
    expect(respAdd.status).toEqual(201);
    const respNew = await request(app).get(`/chat/user/testUser2/testUser1/${chatId}`);
    const dataSend = JSON.parse(respNew.text).data;
    expect(dataSend.length).toEqual(2);
  });

  test('200 get chat ID', async () => {
    const resp = await request(app).get('/chat/getChatId/testUser1/testUser2');
    const { data } = JSON.parse(resp.text);
    expect(resp.status).toEqual(201);
    console.log('RESP DATA', data);
    expect(data).toEqual(chatId);
  });

  test('200 get chat ID', async () => {
    const resp = await request(app).get('/chat/getFriends/testUser1');
    const { data } = JSON.parse(resp.text);
    expect(resp.status).toEqual(201);
    expect(data.length).toEqual(1);
  });
});
