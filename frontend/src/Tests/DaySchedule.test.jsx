/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DaySchedule from '../Components/DaySchedule';

test('Opens and checks for proper display', async () => {
  // ARRANGE
  render(<DaySchedule day="Monday" classes={[{ name: 'example', start: 0, end: 10 }]} />);

  // ASSERT
  expect(screen.getByText('Monday')).toBeInTheDocument();
});
