/**
* @jest-environment jsdom
*/
import React from 'react';
import { render, screen} from '@testing-library/react';
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
     render(<Report {...props} />); // eslint-disable-line
    const likeButton = screen.getByRole('button', { name: /Like/i });

    expect(likeButton).toBeInTheDocument();
  });
});
test('check like buttonn', () => {
  const { getByRole } = render(<Report />);
  const button = getByRole('button', { name: /Like/i });
  expect(button).toBeTruthy();
});
