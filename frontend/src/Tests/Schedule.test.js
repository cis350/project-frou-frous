/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Schedule from '../Components/Schedule';

test('Opens', async () => {
  // ARRANGE
  const { container } = render(<Schedule />);

  // ACT
  await userEvent.click(screen.getByTitle('open'));

  // ASSERT
  expect(container.childElementCount).toEqual(1);
});
