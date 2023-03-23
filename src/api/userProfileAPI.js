import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

mock.onGet('/user/userId').reply(200, {
  username: 'MockUsername',
  pfp: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
  skipHistory: [
    {
      timestamp: 1679326514, // see convertTimestamp in: ChatPeopleComponent.jsx
      class: 'ABC 101',
    },
    {
      timestamp: 1679326514,
      class: 'XYZ 101',
    },
    {
      timestamp: 1679326514,
      class: 'XYZ 101',
    },
    {
      timestamp: 1679326514,
      class: 'ABC 101',
    },
    {
      timestamp: 1679326514,
      class: 'XYZ 101',
    },
  ],
  classes: [
    {
      title: 'ABC 101',
      days: ['Wed', 'Fri'],
      start: 1300,
      end: 1430,
    },
    {
      title: 'XYZ 101',
      days: ['Wed'],
      start: 1500,
      end: 1700,
    },
    {
      title: 'ABC 201',
      days: ['Tue', 'Thu'],
      start: 1300,
      end: 1430,
    },
  ],
});

export async function getUserHistory(userId) { // eslint-disable-line
  const res = await axios.get('/user/userId');
  return res.data;
}
