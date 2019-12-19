import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HeaderTransparent from './HeaderTransparent';

test('Renders HeaderTransparent component, when user is not authenticated.', () => {
  const tree = renderer
    .create(
      <Router>
        <HeaderTransparent isAuthenticated={false} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders HeaderFixed component, when user is authenticated.', () => {
  const tree = renderer
    .create(
      <Router>
        <HeaderTransparent isAuthenticated={true} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
