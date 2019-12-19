import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HeaderFixed from './HeaderFixed';

test('Renders HeaderFixed component, when user is not authenticated.', () => {
  const tree = renderer
    .create(
      <Router>
        <HeaderFixed isAuthenticated={false} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders HeaderFixed component, when user is authenticated.', () => {
  const tree = renderer
    .create(
      <Router>
        <HeaderFixed isAuthenticated={true} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
