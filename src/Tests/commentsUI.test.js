/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';

import Comments from '../Components/Comments';
import { getReportData, sendComment } from '../api/reportAPI';

jest.mock('../api/reportAPI.js');

const exampleReport = {
  id: 1,
  comments: [
    {
      commenterid: 't',
      content: 'lol imagine skipping class',
    },
    {
      commenterid: 'e',
      content: 'catch me at starbucks later',
    },
    {
      commenterid: 'weh',
      content: "hey i don't appreciate the callout",
    },
  ],
  reporterid: 'kait',
  reporteeid: 'weh',
  likes: [
    'kait',
    't',
    'e',
  ],
  date: 101010101,
  caption: 'weh spotted',
  img: 'placeholder',
};

getReportData.mockResolvedValue(exampleReport);
sendComment.mockImplementation(
  (id, comment) => exampleReport.comments.push(comment),
  getReportData.mockResolvedValue(exampleReport),
);

test('renders usercomments', async () => {
  const { getByText } = await act(async () => render(<Comments userId="userId" reportId={1} />));
  const comment1 = getByText(/lol imagine skipping class/);
  const comment2 = getByText(/catch me at starbucks later/);
  const comment3 = getByText(/hey i don't appreciate the callout/);
  expect(comment1).toBeInTheDocument();
  expect(comment2).toBeInTheDocument();
  expect(comment3).toBeInTheDocument();
});

test('test form presence', async () => {
  const { getByRole } = await act(async () => render(<Comments userId="userId" reportId={1} />));
  const inputBox = getByRole('textbox');
  expect(inputBox).toBeInTheDocument();
  const inputButton = getByRole('button');
  expect(inputButton).toBeInTheDocument();
});

test('test form submission', async () => {
  await act(async () => render(<Comments userId="userId" reportId={1} />));
  await act(
    async () => fireEvent.change(screen.getByRole('textbox'), { target: { value: 'newMessage' } }),
    fireEvent.click(screen.getByRole('button')),
  );
  expect(getReportData).toHaveBeenCalled();
});
