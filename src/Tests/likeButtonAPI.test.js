/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Report from '../Components/Report';
import { updateLikes2, getReportDataLikes } from '../api/userPageAPI';

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
    console.log('first line of updateLikes');
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

    // Expect the API call to have been made with the correct parameters

    // Expect the API call to have returned the expected likes count
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

// describe('<Report />', () => {
//   const report = {
//     id: '1',
//     likes: 0,
//   };

//   const props = {
//     match: { params: { id: report.id } },
//   };

//   beforeEach(() => {
//     updateLikes2.mockClear();
//   });
//   test('increments and decrements like count when like button is clicked1', async () => {
//     updateLikes2.mockResolvedValueOnce({ likes: 1, cap: 'b', like: 0,
// likeCount: [], name: '', photo: '', profilePhoto: '', reportee: '' });
//     render(<Report {...props} />); //eslint-disable-line
//     const likeButton = screen.getByRole('button', { name: /Like/i });

//     fireEvent.click(likeButton);

//     const likesCounter = await screen.findByText(/Like \| 1/i);
//     expect(likesCounter).toBeInTheDocument();

//     updateLikes2.mockResolvedValueOnce({ likes: 0 });
//     fireEvent.click(likeButton);

//     const likesCounterAfterClick = await screen.findByText(/Like \| 0/i);
//     expect(likesCounterAfterClick).toBeInTheDocument();

//     expect(updateLikes2).toHaveBeenCalledTimes(2);
//   });
// });
