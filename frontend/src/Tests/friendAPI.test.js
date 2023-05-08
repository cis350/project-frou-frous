/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { addFriend, sendFriendRequest, removeFriend, removeFriendReq } from '../api/userPageAPI';

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({
    id: 'jess',
    password: 'jess',
    email: 'jess',
    firstName: 'jess',
    lastName: 'jess',
    friendReqs: [
      'marcel',
      'erik',
    ],
    friends: [
      'e',
      'kait',
    ],
  }),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('updateLikes2', () => {
  it('should add a friend', async () => {
    // Mock the API call and return a successful response
    const result = await addFriend('jess', 'erik');

    // Expect the API call to have returned a successful response
    expect(result).toEqual({
      id: 'jess',
      password: 'jess',
      email: 'jess',
      firstName: 'jess',
      lastName: 'jess',
      friendReqs: [
        'marcel',
        'erik',
      ],
      friends: [
        'e',
        'kait',
      ],
    });
  });

  it('should add a friend', async () => {
    // Mock the API call and return a successful response
    const result = await removeFriend('jess', 'erik');

    // Expect the API call to have returned a successful response
    expect(result).toEqual({
      id: 'jess',
      password: 'jess',
      email: 'jess',
      firstName: 'jess',
      lastName: 'jess',
      friendReqs: [
        'marcel',
        'erik',
      ],
      friends: [
        'e',
        'kait',
      ],
    });
  });
});
