/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import Report from '../Components/Report';
import { getReport, getPfp, updateLikes2, getReportDataLikes } from '../api/userPageAPI';

jest.mock('../api/userPageAPI');

describe('Report component', () => {
  const props = {
    postId: 1,
  };

  beforeEach(() => {
    getReport.mockResolvedValueOnce({
      reporterId: 'User1',
      img: 'https://example.com/image.jpg',
      reporteeId: 'User2',
      caption: 'Test Caption',
    });
    getPfp.mockResolvedValueOnce({
      pfp: 'https://example.com/profile.jpg',
    });
    getReportDataLikes.mockResolvedValueOnce({
      likeCount: ['User1'],
    });
    updateLikes2.mockResolvedValueOnce();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders report details and like button', async () => {
    render(<Report {...props} />);
    const likeButton = screen.getByRole('button', { name: /Like/i });

    expect(likeButton).toBeInTheDocument();
  });
});
test('check like buttonn', () => {
  const { getByRole } = render(<Report />);
  const button = getByRole('button', { name: /Like/i });
  expect(button).toBeTruthy();
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
      likeCount: ['Alice', 'Bob'],
      like: 2,
    };

    // Mock the API call and return a successful response
    updateLikes2.mockResolvedValue({ status: 'success' });

    const result = await updateLikes2(postId, post);

    // Expect the API call to have been made with the correct parameters
    expect(updateLikes2).toHaveBeenCalledWith(postId, post);

    // Expect the API call to have returned a successful response
    expect(result).toEqual({ status: 'success' });
  });
});

describe('getReportDataLikes', () => {
  it('should return the likes count for a post', async () => {
    const postId = 1;
    const expectedLikesCount = ['Alice', 'Bob'];

    // Mock the API call and return the expected response
    getReportDataLikes.mockResolvedValue({ likeCount: expectedLikesCount });

    const result = await getReportDataLikes(postId);

    // Expect the API call to have been made with the correct parameters
    expect(getReportDataLikes).toHaveBeenCalledWith(postId);

    // Expect the API call to have returned the expected likes count
    expect(result).toEqual({ likeCount: expectedLikesCount });
  });
});

describe('<Report />', () => {
  const report = {
    id: '1',
    likes: 0,
  };

  const props = {
    match: { params: { id: report.id } },
  };

  beforeEach(() => {
    updateLikes2.mockClear();
  });
  test('increments and decrements like count when like button is clicked1', async () => {
    updateLikes2.mockResolvedValueOnce({ likes: 1, cap: 'b', like: 0, likeCount: [], name: '', photo: '', profilePhoto: '', reportee: '' });
    render(<Report {...props} />);
    const likeButton = screen.getByRole('button', { name: /Like/i });

    fireEvent.click(likeButton);

    const likesCounter = await screen.findByText(/Like \| 1/i);
    expect(likesCounter).toBeInTheDocument();

    updateLikes2.mockResolvedValueOnce({ likes: 0 });
    fireEvent.click(likeButton);

    const likesCounterAfterClick = await screen.findByText(/Like \| 0/i);
    expect(likesCounterAfterClick).toBeInTheDocument();

    expect(updateLikes2).toHaveBeenCalledTimes(2);
  });
});
