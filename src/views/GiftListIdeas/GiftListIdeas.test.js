import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import GiftListIdeas from './GiftListIdeas';

test('Renders GiftListIdeas page.', () => {
  const tree = renderer
    .create(
      <Router>
        <GiftListIdeas />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
