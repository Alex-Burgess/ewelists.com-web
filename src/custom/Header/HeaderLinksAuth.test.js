import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HeaderLinksAuth from './HeaderLinksAuth';

test('Renders HeaderLinksAuth component, when user is not authenticated.', () => {
  const tree = renderer
    .create(
      <Router>
        <HeaderLinksAuth dropdownHoverColor="info" />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
