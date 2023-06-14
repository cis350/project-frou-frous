/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Report from '../Components/Report';
import getLeaders from '../api/leaderboardAPI';

const leaders = [
  {
    user: 'Master Skipper',
    skippedClasses: 50,
    img: 'https://th.bing.com/th/id/OIP.LwtFn1J76QdOEiBjvMvKLAHaJu?pid=ImgDet&rs=1',
  },
  {
    user: 'Frou Frou Skip',
    skippedClasses: 49,
    img: 'https://bestprofilepictures.com/wp-content/uploads/2020/07/Cool-Profile-Picture-For-Instagram.jpg',
  },
  {
    user: 'Clever Username Here',
    skippedClasses: 45,
    img: 'https://wallpaperaccess.com/full/2213424.jpg',
  },
  {
    user: 'petrichorredlegolas',
    skippedClasses: 43,
    img: 'https://bestprofilepictures.com/wp-content/uploads/2020/07/Awesome-Profile-Picture-For-Facebook.jpg',
  },
  {
    user: 'camelfish',
    skippedClasses: 40,
    img: 'https://howtoapps.com/wp-content/uploads/2020/01/6d0a65b0-cool-profile-pic-3-800x694.jpg',
  },
  {
    user: 'mavenwatermelonsoda',
    skippedClasses: 30,
    img: 'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Wallpaper-Picture.jpg',
  },
  {
    user: 'pebbleprunecoffeetea',
    skippedClasses: 29,
    img: 'https://wallpaperaccess.com/full/2213512.jpg',
  },
  {
    user: 'oysterrainfallturtle',
    skippedClasses: 25,
    img: 'https://th.bing.com/th/id/OIP.7SdhqriaKA9IvdxTU0lBUQHaHJ?pid=ImgDet&rs=1',
  },
  {
    user: 'rhinoceroscelloprune',
    skippedClasses: 22,
    img: 'https://lh5.googleusercontent.com/proxy/0kRe8__l_l1z6zVRxRy_NzJhsglBUCEfQJcAbiERVbA1Q4QclFbo7d-3u2e0bZCgXsW_orAs0CFLEeLnH34ag0KXQajCwppDszXsnlqX239Y8NQSqbU3i-gCBh2amB_I=w1200-h630-p-k-no-nu',
  },
  {
    user: 'rhinoceroscelloprune',
    skippedClasses: 20,
    img: 'https://th.bing.com/th/id/R.fd47e887548ec0ad0d0f6ae64e0b8b42?rik=kb%2b8Oy2YTkqLaw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-fw4LtaW0aUQ%2fTn2Kz6aRqXI%2fAAAAAAAACuY%2fg61pEcApT-s%2fs1600%2fOQAAAH5wgovnPzB-SWin2R0BQoMCxHfoS25uO18RJ9FShI3SXv1N5nk2FjUF3eGSVlcFde8PQzJy5q5rfpH6JSNpnPEAm1T1ULrfzcfR8dccOdhNtTnsfyykygcC.jpg&ehk=Rg0QxwYrNYeSs%2bzAPUDYmHvcFO65j4%2f93KSL7ieU1tI%3d&risl=&pid=ImgRaw&r=0',
  },
];

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(leaders),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('getLeaders', () => {
  it('should get the leaders', async () => {
    // Mock the API call and return a successful response
    const result = await getLeaders();
    // Expect the API call to have been made with the correct parameters
    // Expect the API call to have returned a successful response
    expect(result).toEqual(leaders);
  });
});
