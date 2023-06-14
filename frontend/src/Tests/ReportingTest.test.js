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