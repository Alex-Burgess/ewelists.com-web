import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChristmasIdeasForToddlers from './ChristmasIdeasForToddlers';

test('Renders ChristmasIdeasForToddlers page.', () => {
  const tree = renderer
    .create(
      <Router>
        <ChristmasIdeasForToddlers />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
