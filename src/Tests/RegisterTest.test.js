/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen, fireEvent} from '@testing-library/react';
import { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';
import Register  from "../Components/Register";
import userEvent from '@testing-library/user-event';
import {ToastContainer,toast} from "react-toastify";

export const renderWithToastify = (component) => {
  return (
    render(
      <div>
        <ToastContainer/>
        {component}
      </div>
    )
  );
};

test('check submit button', ()=> {
    const { getByText } = render(<Register />);
    const button = getByText("Sign Up");
    expect(button).toBeTruthy()
});

test('check home button', ()=> {
    const { getByText } = render(<Register />);
    const button = getByText("Already have an account? Sign in");
    expect(button).toBeTruthy()
});


  test("emailInputCheck", () => {
    const { getByPlaceholderText} = render(<Register />);
    const input = getByPlaceholderText("email");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
        target: { value: "gmail" }
      });
    expect(input.value).toBe("gmail");
  });

  test("firstNameInputCheck", () => {
    const { getByPlaceholderText} = render(<Register />);
    const input = getByPlaceholderText("John");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
        target: { value: "Jane" }
      });
    expect(input.value).toBe("Jane");
  });
  test("lastNameInputCheck", () => {
    const { getByPlaceholderText} = render(<Register />);
    const input = getByPlaceholderText("Doe");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
        target: { value: "Prey" }
      });
    expect(input.value).toBe("Prey");
  });
  test("usernameInputCheck", () => {
    const { getByPlaceholderText} = render(<Register />);
    const input = getByPlaceholderText("username");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
        target: { value: "poppy" }
      });
    expect(input.value).toBe("poppy");
  });

  test("passwordInputCheck", () => {
    const { getByPlaceholderText} = render(<Register />);
    const input = getByPlaceholderText("password");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
        target: { value: "seed" }
      });
    expect(input.value).toBe("seed");
  });

  



test('firstName textbox present Register', async () => {
    const { getByPlaceholderText } = await act( async () => render(<Register />));
    
    const inputBox = getByPlaceholderText('John');

    expect(inputBox).toBeInTheDocument();
});
test('lastName textbox present Register', async () => {
    const { getByPlaceholderText } = await act( async () => render(<Register />));
    
    const inputBox = getByPlaceholderText('Doe');

    expect(inputBox).toBeInTheDocument();
});
test('username textbox present Register', async () => {
    const { getByPlaceholderText } = await act( async () => render(<Register />));
    
    const inputBox = getByPlaceholderText('username');

    expect(inputBox).toBeInTheDocument();
});
test('password textbox present Register', async () => {
    const { getByPlaceholderText } = await act( async () => render(<Register />));
    
    const inputBox = getByPlaceholderText('password');

    expect(inputBox).toBeInTheDocument();
});
test('email textbox present Register', async () => {
    const { getByPlaceholderText } = await act( async () => render(<Register />));
    
    const inputBox = getByPlaceholderText('email');

    expect(inputBox).toBeInTheDocument();
});

test("registerInvalidUsername", async() => {
  const { getByPlaceholderText, getByTestId, getByText} = render(<Register />);
  const input = getByPlaceholderText("username");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, {
      target: { value: "" }
    });
  const submitButton = getByTestId("submitButton");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);  
});

test("registerInvalidEmail", async() => {
  const { getByPlaceholderText, getByTestId, getByText} = render(<Register />);
  const input = getByPlaceholderText("email");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, {
      target: { value: "" }
    });
  const submitButton = getByTestId("submitButton");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  
});
test("registerInvalidfirstName", async() => {
  const { getByPlaceholderText, getByTestId, getByText} = render(<Register />);
  const input = getByPlaceholderText("John");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, {
      target: { value: "" }
    });
  const submitButton = getByTestId("submitButton");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  
});

test("registerInvalidlastName", async() => {
  const { getByPlaceholderText, getByTestId, getByText} = render(<Register />);
  const input = getByPlaceholderText("Doe");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, {
      target: { value: "" }
    });
  const submitButton = getByTestId("submitButton");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  
});


