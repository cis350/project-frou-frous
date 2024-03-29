/**
* @jest-environment jsdom
*/

import { expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { getUserHistory } from '../api/userPageAPI';

jest.mock('../api/userPageAPI.js');

const mockUser = {
  username: 'MockUsername',
  pfp: 'https://i1.sndcdn.com/artworks-5fyeRojbMeUUbmbT-qqZ5NQ-t500x500.jpg',
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
};

getUserHistory.mockResolvedValue(mockUser);

test('usernameCorrect', async () => {
  const data = await getUserHistory('/user/validId');
  expect(data.username).toBe('MockUsername');
});

test('skipHistoryCorrect', async () => {
  const data = await getUserHistory('/user/validId');
  expect(data.skipHistory.length).toBe(5);
});

test('numClassesCorrect', async () => {
  const data = await getUserHistory('/user/validId');
  expect(data.classes.length).toBe(3);
});

test('getUserHistory', async () => expect(getUserHistory('/user/validId')).resolves.toBe(mockUser));

test('invalidIdTest', async () => {
  const getUserHistoryTest = jest
    .fn()
    .mockRejectedValue(new Error('500'));
  const networkError = new Error('500');
  // jest.fn().mockImplementationOnce(() => Promise.reject('500'));    const goToUrl = jest.fn();
  let error;

  try {
    await getUserHistoryTest('/user/invalidId');
  } catch (err) {
    error = err;
  }

  expect(error).toEqual(networkError);
  expect(getUserHistoryTest).toHaveBeenCalled();
});
