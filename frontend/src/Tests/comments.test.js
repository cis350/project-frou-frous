/**
 * @jest-environment jsdom
 */

import { getReportData, sendComment } from '../api/reportAPI';

jest.mock('../api/reportAPI.js');

getReportData.mockResolvedValue({
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
});

test('numCommentsCorrect', async () => {
  const data = await getReportData(1);
  expect(data.comments.length).toBe(3);
});

test('updateCommentsCorrect', async () => {
  const testComment = { commenterid: 'testUserId', content: 'testComment' };
  await sendComment(1, testComment);
  getReportData.mockResolvedValue({
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
      {
        commenterid: 'testUserId',
        content: 'testComment',
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
  });
  const data = await getReportData(1);
  const data2 = data.comments;
  expect(data2.length).toBe(4);
  expect(JSON.stringify(data2[3])).toBe(JSON.stringify(testComment));
});
