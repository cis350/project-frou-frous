/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import UserCard from '../Components/UserCard';

test('rendersAllStatBoxes', async () => {
  const { getByText } = await act(async () => render(<UserCard userId='kait' currentUser='jess' />)); // eslint-disable-line
  const username = getByText(/kait/);
  expect(username).toBeInTheDocument();
  expect(screen.getByText(/Last Reporter:/)).toBeInTheDocument();
  expect(screen.getByText(/Total Reports This Week:/)).toBeInTheDocument();
  expect(screen.getByText(/Percentage Skipped This Week:/)).toBeInTheDocument();
  expect(screen.getByText(/Total Reports Overall:/)).toBeInTheDocument();
  expect(screen.getByText(/Most Freqent Reporter:/)).toBeInTheDocument();
});

test('rendersAvatar', async () => {
  const { getByText } = await act(async () => render(<UserCard userId="jess" currentUser="jess" />));
  const username = getByText(/jess/);
  expect(username).toBeInTheDocument();
});

test('snapshot test', () => {
  const component = renderer.create(<UserCard userId="jess" currentUser="jess" />);
  const domTreeJSON = component.toJSON();
  expect(domTreeJSON).toMatchSnapshot();
});

describe('UserCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('friendStatus', () => {
    it('displays EditProfile when userId is same as currentUser', async () => {
      render(<UserCard userId="erik" currentUser="erik" />);
      await waitFor(() => {
        expect(screen.getByText(/Edit Profile/)).toBeInTheDocument();
        const button = screen.getByText(/Edit Profile/);
        fireEvent.click(button);
        expect(screen.getByText(/Save/)).toBeInTheDocument();
      });
    });

    it('displays AddFriend when userId is same as currentUser', async () => {
      render(<UserCard userId="erik" currentUser="marcel" />);
      await waitFor(() => {
        expect(screen.getByText(/Add Friend/)).toBeInTheDocument();
        const button = screen.getByText(/Add Friend/);
        fireEvent.click(button);
        expect(screen.getByText(/Requested/)).toBeInTheDocument();
        const button2 = screen.getByText(/Requested/);
        fireEvent.click(button2);
        expect(screen.getByText(/Add Friend/)).toBeInTheDocument();
      });
    });
  });
});
