import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BathTime from './BathTime';

test('Renders BathTime page.', () => {
  const tree = renderer
    .create(
      <Router>
        <BathTime />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
