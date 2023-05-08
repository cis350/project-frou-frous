/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';

import ChatPeopleComponent from '../Components/ChatPeopleComponent';
import ChatUserComponent from '../Components/ChatUserComponent';

test('test that button present', async () => {
  // render the component
  const { getByRole } = await act(async () => render(<ChatUserComponent />));
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
