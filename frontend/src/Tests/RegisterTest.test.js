/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render } from '@testing-library/react';
import { act } from 'react-test-renderer';
import Register from '../Components/Register';
import { validateLogin } from '../api/loginRegisterAPI';

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

const testUser = {
  id: 't',
  password: 't',
  email: 't',
  firstName: 't',
  lastName: 't',
};

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(testUser),
}));

beforeEach(() => {
  fetch.mockClear();
});

describe('validateLogin', () => {
  it('should get the user', async () => {
    // Mock the API call and return a successful response
    const result = await validateLogin('t');

    // Expect the API call to have been made with the correct parameters
    // Expect the API call to have returned a successful response
    expect(result).toEqual(testUser);
  });
});
