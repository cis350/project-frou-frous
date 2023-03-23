/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { getByPlaceholderText, render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';
import Login from "../Components/Login";
import userEvent from '@testing-library/user-event';

// test that the UI matches the wireframes
test('renders userLinks', async () => {
  const { getByText } = await act( async () => render(<Login />));
  const linkElement = getByText(/Register/);
  expect(linkElement).toBeInTheDocument();
});

test('check login buttonn', ()=> {
    const { getByText } = render(<Login />);
    const button = getByText("Login");
    expect(button).toBeTruthy()
});

test('check register button', ()=> {
    const { getByText } = render(<Login />);
    const button = getByText("Register");
    expect(button).toBeTruthy()
});

test('check forgot password buttonn', ()=> {
    const { getByText } = render(<Login />);
    const button = getByText("Forgot Password");
    expect(button).toBeTruthy()
});



test('username textbox present', async () => {
    const { getByPlaceholderText } = await act( async () => render(<Login />));
    
    const inputBox = getByPlaceholderText('username');

    expect(inputBox).toBeInTheDocument();
});

test('password textbox present', async () => {
    const { getByPlaceholderText } = await act( async () => render(<Login />));
    
    const inputBox = getByPlaceholderText('password');

    expect(inputBox).toBeInTheDocument();
});

test("passwordInputCheck", () => {
    const { getByPlaceholderText} = render(<Login />);
    const input = getByPlaceholderText("password");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
        target: { value: "seed" }
      });
    expect(input.value).toBe("seed");
  });

  test("usernameInputCheck", () => {
    const { getByPlaceholderText} = render(<Login />);
    const input = getByPlaceholderText("username");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
        target: { value: "seed" }
      });
    expect(input.value).toBe("seed");
  });
