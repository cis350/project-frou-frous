/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportModal from '../Components/ReportModal';
// import { getReportData } from '../api/reportAPI';

test('Opens and checks that class is displayed', async () => {
  // ARRANGE
  render(<ReportModal userId="reportee" />);
  await fireEvent.change(screen.getByPlaceholderText('Caption'), { target: { value: 'Fagin' } });

  // ASSERT
  expect(screen.getByText('Reporting reportee')).toBeInTheDocument();
});

const report = {
  _id: 'testReport2',
  reporterid: 'A',
  reporteeid: 'B',
  img: 'placeholder',
  date: { $numberDouble: '1681944512146.0' },
  caption: 'placeholder caption',
  likes: ['Jess', 'Weh', 'Another user'],
  comments: [{ commenterid: 'A', content: 'A commentPlaceholder' }, { commenterid: 'B', content: 'B comment placeholder' }] };
global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(report),
}));

beforeEach(() => {
  fetch.mockClear();
});

// describe('getReportDataLikes', () => {
//   it('should return the report', async () => {
//     const result = await getReportData('testReport2');
//     console.log(result);

//     expect(result).toEqual(report);
//   });
// });

// describe('sendComment', () => {
//   it('should send a comment', async () => {
//     const result = await sendComment(1, 'testComment');
//     const newComments = report.comments.push('testComment');
//     report.comments = newComments;
//     console.log('RES', result);
//     expect(result).toEqual({
//       profilePhoto: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
//       img: 'https://media.istockphoto.com/id/1207224564/photo/happy-cute-boy-having-picnic-in-the-park.jpg?s=1024x1024&w=is&k=20&c=JKrcNb7iTO4oHyci_IWsGrZCFbdtmdJR7cW3ZI_ilPo=',
//       likes: ['t', 'weh', 'jess'],
//       comments: [
//         { commenterid: 'weh', content: "weh's comment" },
//         { commenterid: 'userId', content: 'test again' },
//         { commenterid: 'yourUserId', content: 'testsetestset' },
//         'testComment',
//       ],
//       date: 8894371293849123,
//       id: 1,
//     });
//   });
// });
