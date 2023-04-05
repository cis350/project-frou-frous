/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render } from '@testing-library/react';
import { act } from 'react-test-renderer';
import Register from '../Components/Register';

test('username textbox present Register', async () => {
  const { getByText } = await act(async () => render(<Register />));

  const inputBox = getByText(/Username/);

  expect(inputBox).toBeInTheDocument();
});

test('password textbox present Register', async () => {
  const { getByText } = await act(async () => render(<Register />));

  const inputBox = getByText(/Password/);

  expect(inputBox).toBeInTheDocument();
});

test('first name textbox present Register', async () => {
  const { getByText } = await act(async () => render(<Register />));

  const inputBox = getByText(/First Name/);

  expect(inputBox).toBeInTheDocument();
});

test('last name textbox present Register', async () => {
  const { getByText } = await act(async () => render(<Register />));

  const inputBox = getByText(/Last Name/);

  expect(inputBox).toBeInTheDocument();
});

test('email textbox present Register', async () => {
  const { getByText } = await act(async () => render(<Register />));

  const inputBox = getByText(/Email/);

  expect(inputBox).toBeInTheDocument();
});
