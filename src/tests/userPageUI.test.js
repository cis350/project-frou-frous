/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Report from '../Components/Report';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ url: 'http://localhost:3000' }),
  useLocation: () => ({ pathname: '/user/:userId' }),
}));

test('renders Navigation Bar', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const linkElement = getByText(/Navigation Bar/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Navigation Bar', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const element = getByText(/Chat/);
  expect(element).toBeInTheDocument();
});

test('renders chat button', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const element = getByText(/Chat/);
  expect(element).toBeInTheDocument();
});

test('renders timeline button', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const element = getByText(/Timeline/);
  expect(element).toBeInTheDocument();
});

test('renders report button', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const element = getByText(/Report/);
  expect(element).toBeInTheDocument();
});

test('renders leaderboard button', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const element = getByText(/Leaderboard/);
  expect(element).toBeInTheDocument();
});

test('renders user profile button', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const element = getByText(/User Profile/);
  expect(element).toBeInTheDocument();
});

test('renders logout button', () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <Router>
      <NavBar setPage={setPage} />
    </Router>,
  );
  const element = getByText(/Log out/);
  expect(element).toBeInTheDocument();
});

test('renders comments button', async () => {
  const { getByText } = await act(async () => render(<Report reportId={1} />));
  const element = getByText(/Comments/);
  expect(element).toBeInTheDocument();
});

test('renders view button', async () => {
  const { getByText } = await act(async () => render(<Report reportId={1} />));
  const element = getByText(/View/);
  expect(element).toBeInTheDocument();
});
