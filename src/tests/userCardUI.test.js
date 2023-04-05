/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import UserCard from '../Components/UserCard';

test('rendersAllStatBoxes', async () => {
  const { getByText } = await act(async () => render(<UserCard userId={12345} />)); // eslint-disable-line
  expect(screen.getByText(/Total Classes Skipped/)).toBeInTheDocument();
  expect(screen.getByText(/Percent Classes Skipped/)).toBeInTheDocument();
  expect(screen.getByText(/Class Most Often Skipped/)).toBeInTheDocument();
  expect(screen.getByText(/Class Least Often Skipped/)).toBeInTheDocument();
});

test('rendersAvatar', async () => {
  const { getByText } = await act(async () => render(<UserCard userId={12345} />));
  const username = getByText(/MockUsername/);
  expect(username).toBeInTheDocument();
});

test('snapshot test', () => {
  const component = renderer.create(<UserCard userId={12345} />);
  const domTreeJSON = component.toJSON();

  expect(domTreeJSON).toMatchSnapshot();
});
