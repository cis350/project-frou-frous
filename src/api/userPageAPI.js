/**
* @jest-environment jsdom
*/

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

mock.onGet('/friendreports').reply(200, {
  reportIds: [1],
});

mock.onGet('/reports').reply(200, {
  username: 'John',
  picture: 'https://i1.sndcdn.com/artworks-5fyeRojbMeUUbmbT-qqZ5NQ-t500x500.jpg',
});

mock.onGet('/users').reply(200, {
  pfp: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
});

export async function getPfp() {
  const res = await axios.get('/users');
  return res.data;
}

export async function getReport() {
  const res = await axios.get('/reports');
  return res.data;
}

export async function getFriendReports() {
  const res = await axios.get('/friendreports');
  return res.data;
}
