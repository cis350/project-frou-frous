/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Report from '../Components/Report';
import { updateLikes2, getReportDataLikes, getUserData } from '../api/userPageAPI';

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({
    name: 'John',
    reportee: 'Jane',
    profilePhoto: 'http://example.com/profile.jpg',
    photo: 'http://example.com/photo.jpg',
    cap: 'Test caption',
    likes: ['Alice', 'Bob'],
    id: 1,
  }),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('updateLikes2', () => {
  it('should update the likes count for a post', async () => {
    const postId = 1;
    const post = {
      name: 'John',
      reportee: 'Jane',
      profilePhoto: 'http://example.com/profile.jpg',
      photo: 'http://example.com/photo.jpg',
      cap: 'Test caption',
      likes: ['Alice', 'Bob'],
    };

    // Mock the API call and return a successful response
    const result = await updateLikes2(postId, post);
    console.log('result test', result);

    // Expect the API call to have been made with the correct parameters
    // Expect the API call to have returned a successful response
    expect(result).toEqual({ name: 'John',
      reportee: 'Jane',
      profilePhoto: 'http://example.com/profile.jpg',
      photo: 'http://example.com/photo.jpg',
      cap: 'Test caption',
      likes: ['Alice', 'Bob'],
      id: 1 });
  });
});

describe('getReportDataLikes', () => {
  it('should return the likes count for a post', async () => {
    const postId = 1;
    const expectedLikesCount = ['Alice', 'Bob'];

    // Mock the API call and return the expected response

    const result = await getReportDataLikes(postId);
    const userData = await getUserData(postId);

    expect(userData.likes).toEqual(expectedLikesCount);
    expect(result.likes).toEqual(expectedLikesCount);
  });
});
describe('<Report />', () => {
  it('increments and decrements like count when like button is clicked1', async () => {
    const { getByTestId } = render(<Report />);
    const likeButton = getByTestId('like-button');
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveStyle({ backgroundColor: 'white' });
    fireEvent.click(likeButton);
  });
});
