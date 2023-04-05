/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
// import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Leaderboard from '../Components/Leaderboard';

// import getLeaders from '../api/leaderboardAPI';

test('snapshot test people', () => {
  const component = renderer.create(<Leaderboard />);
  const domTreeJSON = component.toJSON();
  // matcher
  expect(domTreeJSON).toMatchSnapshot();
});

// test('alt text', async () => {
//   const { getByAltText } = await act(async () => render(<Leaderboard />));
//   const imgElement = getByAltText('leader 1 pfp');
//   expect(imgElement).toBeInTheDocument();
// });

// test('getLeaders api test', () => {
//   function test(resp) {
//     expect(resp.length).toBe(10);
//   }

//   getLeaders(test);
// });
