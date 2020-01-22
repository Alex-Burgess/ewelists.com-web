import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Nursery from './Nursery';

test.skip('Renders Nursery page.', () => {
  const tree = renderer
    .create(
      <Router>
        <Nursery />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
