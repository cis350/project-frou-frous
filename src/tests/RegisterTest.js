/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';
import { Register } from "./Components/Register";
import userEvent from '@testing-library/user-event';



test('test that button present', async () => {
    // render the component
    const { getByRole } = await act( async () => render(<Register />));
    // find the element by its role
    const submit = getByRole('button');
    // assert that the element is in the document
    expect(submit).toBeInTheDocument();
});


test('username textbox present Register', async () => {
    const { getById  } = await act( async () => render(<Register />));
    
    const inputBox = getById('username');

    expect(inputBox).toBeInTheDocument();
});

test('password textbox present Register', async () => {
    const { getById  } = await act( async () => render(<Register />));
    
    const inputBox = getById('password');

    expect(inputBox).toBeInTheDocument();
});

test('first name textbox present Register', async () => {
    const { getById  } = await act( async () => render(<Register />));
    
    const inputBox = getById('firstName');

    expect(inputBox).toBeInTheDocument();
});

test('last name textbox present Register', async () => {
    const { getById  } = await act( async () => render(<Register />));
    
    const inputBox = getById('lastName');

    expect(inputBox).toBeInTheDocument();
});

test('email textbox present Register', async () => {
    const { getById  } = await act( async () => render(<Register />));
    
    const inputBox = getById('email');

    expect(inputBox).toBeInTheDocument();
});