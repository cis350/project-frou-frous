import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

mock.onGet('/friendreports/:userId').reply(200, {
  reportIds: [1, 2, 3],
});

mock.onGet('/reports/:reportId').reply(200, {
  username: 'John',
  picture: 'https://i1.sndcdn.com/artworks-5fyeRojbMeUUbmbT-qqZ5NQ-t500x500.jpg',
});

mock.onGet('/users/:username').reply(200, {
  pfp: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
});

export async function getPfp(username) {
  const res = await axios.get(`/users/${username}`);
  return res.data;
}

export async function getReport(reportId) {
  const res = await axios.get(`/reports/${reportId}`);
  return res.data;
}

export async function getFriendReports(userId) {
  const res = await axios.get(`/friendreports/${userId}`);
  return res.data;
}
