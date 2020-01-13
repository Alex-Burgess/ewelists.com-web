import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HeaderLinksAuth from './HeaderLinksAuth';

const user = {
  email: 'test.user@gmail.com',
  name: 'Test User',
  sub: '6c9b0a41-1234-abcd-5678-c51f280c557f'
}

test('Renders HeaderLinksAuth component, when user is not authenticated.', () => {
  const tree = renderer
    .create(
      <Router>
        <HeaderLinksAuth dropdownHoverColor="info" user={user} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
