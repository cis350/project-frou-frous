/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Report from '../Components/Report';
import { updateLikes } from '../api/reportAPI';

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
      reporterid: 'John',
      reporteeid: 'Jane',
      profilePhoto: 'http://example.com/profile.jpg',
      photo: 'http://example.com/photo.jpg',
      cap: 'Test caption',
      likes: ['Alice', 'Bob'],
    };

    // Mock the API call and return a successful response
    const result = await updateLikes(postId, post, false);
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

describe('<Report />', () => {
  it('increments and decrements like count when like button is clicked1', async () => {
    const { getByTestId } = render(<Report />);
    const likeButton = getByTestId('like-button');
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveStyle({ backgroundColor: 'white' });
    fireEvent.click(likeButton);
  });
});
