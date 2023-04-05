/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportModal from '../Components/ReportModal';

test('Opens and checks that class is displayed', async () => {
  // ARRANGE
  render(<ReportModal userId="reportee" />);
  await fireEvent.change(screen.getByPlaceholderText('Caption'), { target: { value: 'Fagin' } });

  // ASSERT
  expect(screen.getByText('Reporting reportee')).toBeInTheDocument();
});
