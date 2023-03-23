/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import UserCard from '../Components/UserCard';
import getUserHistory from '../api/userProfileAPI';

test('rendersAllStatBoxes', async () => {
    const {getByText} = await act( async () => render(<UserCard userId="validId"/>));
    expect(screen.getByText(/Total Classes Skipped/)).toBeInTheDocument();
    expect(screen.getByText(/Percent Classes Skipped/)).toBeInTheDocument();
    expect(screen.getByText(/Class Most Often Skipped/)).toBeInTheDocument();
    expect(screen.getByText(/Class Least Often Skipped/)).toBeInTheDocument();
});

test('rendersAvatar', async () => {
    const { getByTestId } = await act(async () => render(<UserCard userId="validId" />));
    const avatar = getByTestId('PersonIcon');
    expect(avatar).toBeInTheDocument();
});

test('snapshot test', () => {
    const component = renderer.create(<UserCard userId="validId"/>);
    const domTreeJSON = component.toJSON();

    expect(domTreeJSON).toMatchSnapshot();
});