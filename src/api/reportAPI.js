/**
* @jest-environment jsdom
*/

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const coms = [
  {
    userId: 'Friend 1 Id',
    commentString: 'lol skipping again',
  },
  {
    userId: 'Friend 2 Id',
    commentString: 'Lorem ipsum',
  },
];

// const pathRegex = new RegExp('\/reports\/*'); // eslint-disable-line
// mock.onGet(pathRegex).reply(200, {
//     comments: coms,
// });

mock.onGet('/reports/0').reply(200, {
  comments: coms,
});

const postRegex = new RegExp('\/reportId\/send\/*'); // eslint-disable-line
mock.onPost(postRegex).reply(200, {});

// export async function getReportComments(reportId) {
//     const res = await axios.get(`/reports/${reportId}`);
//     return res.data;
// }

// export async function sendComment(commentString) {
//     const res = await axios.post(`/reportId/send/${commentString}`);
//     coms.push({
//         userId: 'Your Username',
//         commentString,
//     });
//     return res.data;
// }

export async function getReportData(reportId) {
  try {
    const response = await fetch(`http://localhost:8000/report/${reportId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const report = await response.json();
    // console.log(report);
    return report;
  } catch (error) {
    return error;
  }
}

export async function sendComment(reportId, newComment) {
  try {
    const response = await getReportData(reportId);
    Object.values(response)['0'].comments.push(newComment);
    console.log('new comments');
    console.log(Object.values(response)['0'].comments);
    console.log(Object.values(response)['0']);
    return fetch(`http://localhost:8000/report/${reportId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(response),
    }).json();
  } catch (error) {
    return error;
  }
}

// export async function sendComment(reportId, newComment) {
//   let result = await fetch(`http://localhost:8000/report/${reportId}`, {
//     method: 'GET',
//     headers: { 'content-type': 'application/json' },
//   }).then((res) => {
//     res.json();
//     // return res;
//   });
//   result = result.comments.push({ newComment });
//   fetch(`http://localhost:8000/report/${reportId}`, {
//     method: 'PUT',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify(result),
//   })
//     .then((res) => res.json())
//   // return fetch(`http://localhost:8000/report/${reportId}`, {
//   //   method: 'PUT',
//   //   headers: { 'content-type': 'application/json' },
//   //   body: JSON.stringify(result),
//   // }).then((res) => res.json())
//     .catch((err) => {
//       callback({ error: err });
//     });
// }

// comments, {
//   method: 'POST',
//   headers: { 'content-type': 'application/json' },
//   body: JSON.stringify(newComment),
// }).then((res) => {
//   callback(res);
// }).catch((err) => {
//   callback({ error: err });
// });
