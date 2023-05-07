/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddClass from '../Components/AddClass';
import Schedule from '../Components/Schedule';

jest.useFakeTimers();

test('loads and closes', async () => {
  // ARRANGE
  const { container } = render(<AddClass />);

  // ACT
  await userEvent.click(screen.getByTitle('close'));

  // ASSERT
  expect(container.childElementCount).toEqual(2);
});

test('Start input', async () => {
  const { getByTitle } = await act(async () => render(<AddClass />));
  const element = getByTitle('start');
  expect(element).toBeInTheDocument();
});

test('Start Text', async () => {
  const { getByText } = await act(async () => render(<AddClass />));
  const element = getByText(/Start/);
  expect(element).toBeInTheDocument();
});

test('End input', async () => {
  const { getByTitle } = await act(async () => render(<AddClass />));
  const element = getByTitle('end');
  expect(element).toBeInTheDocument();
});

test('End Text', async () => {
  const { getByText } = await act(async () => render(<AddClass />));
  const element = getByText(/End/);
  expect(element).toBeInTheDocument();
});

test('Monday checkbox input', async () => {
  const { getByText } = await act(async () => render(<AddClass />));
  const element = getByText(/M/);
  expect(element).toBeInTheDocument();
});

test('Checkboxes', async () => {
  const { queryAllByRole } = await act(async () => render(<AddClass />));
  const element = queryAllByRole('checkbox');
  expect(element.length).toBeGreaterThan(4);
});

test('Wednesday checkbox input', async () => {
  const { getByText } = await act(async () => render(<AddClass />));
  const element = getByText(/W/);
  expect(element).toBeInTheDocument();
});

test('Friday checkbox input', async () => {
  const { getByText } = await act(async () => render(<AddClass />));
  const element = getByText(/F/);
  expect(element).toBeInTheDocument();
});

test('Add Class button', async () => {
  const { getByTitle } = await act(async () => render(<AddClass />));
  const element = getByTitle('submit');
  expect(element).toBeInTheDocument();
});

test('add class', async () => {
  // ARRANGE
  const { container } = render(<Schedule />);

  // ACT
  await userEvent.click(screen.getByTitle('open'));
  await fireEvent.change(screen.getByPlaceholderText('Course Title'), { target: { value: 'CIS 350' } });
  await fireEvent.change(screen.getByPlaceholderText('Course Location'), { target: { value: 'Fagin' } });
  await fireEvent.change(screen.getByTitle('start'), { target: { value: '5:00' } });
  await fireEvent.change(screen.getByTitle('end'), { target: { value: '7:00' } });
  await fireEvent.click(screen.getByLabelText('M'));

  // ASSERT
  expect(container.childElementCount).toEqual(1);
});

const handleChild = jest.fn();

test('calls setPage when clicking on Timeline button', () => {
  const { getByTitle } = render(<AddClass handleChild={handleChild} />);
  const element = getByTitle('close');
  fireEvent.click(element);
  expect(handleChild).toHaveBeenCalled();
});
