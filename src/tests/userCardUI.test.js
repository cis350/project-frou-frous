/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import { act } from 'react-test-renderer';
import UserCard from '../Components/UserCard';

test('rendersAllStatBoxes', async () => {
    const {getByText} = await act( async () => render(<UserCard userId = "MockUsername" />));
    expect(screen.getByText(/Total Classes Skipped/)).toBeInTheDocument();
    expect(screen.getByText(/Percent Classes Skipped/)).toBeInTheDocument();
    expect(screen.getByText(/Class Most Often Skipped/)).toBeInTheDocument();
    expect(screen.getByText(/Class Least Often Skipped/)).toBeInTheDocument();
});

test('rendersCorrectAvatar', async () => {
    const { getByTestId } = await act(async () => render(<UserCard userId="MockUsername" />));
    const avatar = getByTestId('PersonIcon');
    expect(avatar).toBeInTheDocument();
});