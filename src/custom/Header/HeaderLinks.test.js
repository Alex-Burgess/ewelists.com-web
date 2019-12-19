import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HeaderLinks from './HeaderLinks';

test('Renders HeaderLinks component, when user is not authenticated.', () => {
  const tree = renderer
    .create(
      <Router>
        <HeaderLinks dropdownHoverColor="info" />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
