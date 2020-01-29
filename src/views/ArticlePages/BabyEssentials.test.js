import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BabyEssentials from './BabyEssentials';

test.skip('Renders BathTime page.', () => {
  const tree = renderer
    .create(
      <Router>
        <BabyEssentials />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
