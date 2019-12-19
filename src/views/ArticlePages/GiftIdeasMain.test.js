import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import GiftIdeasMain from './GiftIdeasMain';

test('Renders GiftIdeasMain page.', () => {
  const tree = renderer
    .create(
      <Router>
        <GiftIdeasMain />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
