const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../model/reportsDB');

const app = require('../server'); // or wherever your server file is located

let mongo;

describe('GET/PUT comments and likes endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db; // eslint-disable-line
  let reportId1; // eslint-disable-line
  let reportId2; // eslint-disable-line
  /**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    await db.collection('Reports').deleteMany({ _id: { $in: ['testReport1', 'testReport2'] } });
    const reports = [
      {
        reporterid: 'testUser1',
        reporteeid: 'testUser2',
        img: 'placeholder',
        date: 1681944512146,
        caption: 'placeholder caption',
        likes: ['Jess', 'Weh', 'Another user'],
        comments: [
          { commenterid: 'Jess', content: 'commentPlaceholder' },
          { commenterid: 'Weh', content: 'another placeholder' },
        ],
      },
      {
        reporterid: 'A',
        reporteeid: 'B',
        img: 'placeholder',
        date: 1681944512146,
        caption: 'placeholder caption',
        likes: ['Jess', 'Weh', 'Another user'],
        comments: [
          { commenterid: 'A', content: 'A commentPlaceholder' },
          { commenterid: 'B', content: 'B comment placeholder' },
        ],
      },
    ];
    const results = await db.collection('Reports').insertMany(reports);
    console.log(results);
    reportId1 = results.insertedIds['0'].toHexString();
    reportId2 = results.insertedIds['1'].toHexString();
    console.log(reportId1);
    console.log(reportId2);
  });

  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    try {
      await db.collection('Reports').deleteMany({ $in: [reportId1, reportId2] });
      await mongo.close();
      return closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('404 error send comment', async () => {
    const resp = await request(app).post('/Reports/sendComment');
    expect(resp.status).toEqual(404);
  });

  test('201 send comment', async () => {
    const resp = await request(app).put(`/Reports/${reportId1}/sendComment`).send({ commenterid: 'testUser1', content: 'hello world' });
    // console.log(resp);
    expect(resp.status).toEqual(201);
  });

  test('200 get report data comments', async () => {
    const resp = await request(app).get(`/Reports/${reportId1}/getReportData`);
    expect(resp.status).toEqual(200);
    const { data } = JSON.parse(resp.text);
    console.log(data);
    expect(data.comments.length).toEqual(3);
    const respAdd = await request(app).put(`/Reports/${reportId1}/sendComment`).send({ commenterid: 'testUser2', content: 'hello world 2' });
    expect(respAdd.status).toEqual(201);
    // console.log(respAdd);
    // const respNew = await request(app).get(`/reports/${reportId}/getReportData`);
    // const { dataSend } = JSON.parse(respNew.text);
    // console.log(dataSend);
    // expect(dataSend.comments.length).toEqual(4);
  });

  test('200 get report data likes', async () => {
    const resp = await request(app).get(`/reports/${reportId1}/getReportData`);
    expect(resp.status).toEqual(200);
    const { data } = JSON.parse(resp.text);
    expect(data.likes.length).toEqual(3);
    // eslint-disable-next-line max-len
    // const respRemove = await request(app).put(`/reports/${reportId}/updateLikes`).send({ userId: 'jess' });
    // expect(respRemove.status).toEqual(201);
    // const respNew = await request(app).get(`/reports/${reportId}`);
    // const dataSend = JSON.parse(respNew.text).data;
    // expect(dataSend.length).toEqual(2);
  });
});
