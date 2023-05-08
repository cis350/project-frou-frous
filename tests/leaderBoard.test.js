const request = require('supertest');
// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../model/leaderboardDB');

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
    const reports = [
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test1',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test2',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test3',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test4',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test5',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test6',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test7',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test8',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test9',
      },
      {
        reporterid: 'leaderBoardTest',
        reporteeid: 'test10',
      },
    ];
    db = mongo.db();
    await db.collection('Reports').insertMany(reports);
  }, 10000);

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await db.collection('Reports').deleteMany({ reporterid: 'leaderBoardTest' });
      await mongo.close();
      return closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('200 get leaders', async () => {
    const resp = await request(app).get('/leaderboard');
    expect(resp.status).toEqual(200);
  });
});
