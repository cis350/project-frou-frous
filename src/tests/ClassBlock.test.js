/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassBlock from '../Components/ClassBlock';

test('Opens and checks that class is displayed', async () => {
  // ARRANGE
  render(<ClassBlock start={660} end={1000} name="Example Class" />);

  // ASSERT
  expect(screen.getByText('Example Class')).toBeInTheDocument();
});
