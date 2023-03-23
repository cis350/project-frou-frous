/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddClass from '../Components/AddClass';

test('loads and closes', async () => {
  // ARRANGE
  const { container } = render(<AddClass />);

  // ACT
  await userEvent.click(screen.getByTitle('close'));

  // ASSERT
  expect(container.childElementCount).toEqual(2);
});

test('add class', async () => {
  // ARRANGE
  const { container } = render(<AddClass />);

  // ACT
  await fireEvent.change(screen.getByPlaceholderText('Course Title'), { target: { value: 'CIS 350' } });
  await fireEvent.change(screen.getByPlaceholderText('Course Location'), { target: { value: 'Fagin' } });
  await fireEvent.change(screen.getByTitle('start'), { target: { value: '5:00' } });
  await fireEvent.change(screen.getByTitle('end'), { target: { value: '7:00' } });
  await fireEvent.click(screen.getByLabelText('M'));
  await fireEvent.click(screen.getByTitle('submit'));

  // ASSERT
  expect(container.childElementCount).toEqual(2);
});
