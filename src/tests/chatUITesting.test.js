/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';
import ChatPeopleComponent from '../Views/ChatPeopleComponent';
import ChatUserComponent from '../Views/ChatUserComponent';
import userEvent from '@testing-library/user-event';

// test that the UI matches the wireframes
test('renders userLinks', async () => {
  const { getByText } = await act( async () => render(<ChatPeopleComponent/>));
  const linkElement = getByText(/Jane/);
  expect(linkElement).toBeInTheDocument();
});

test('test that button present', async () => {
    // render the component
    const { getByRole } = await act( async () => render(<ChatUserComponent />));
    // find the element by its role
    const inputBox = getByRole('button');
    // assert that the element is in the document
    expect(inputBox).toBeInTheDocument();
});

test('snapshot test people', () => {
    const component = renderer.create(<ChatPeopleComponent />);
    const domTreeJSON = component.toJSON();
    // matcher
    expect(domTreeJSON).toMatchSnapshot();
  });