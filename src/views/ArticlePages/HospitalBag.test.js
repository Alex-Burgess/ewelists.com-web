import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HospitalBag from './HospitalBag';

test('Renders HospitalBag page.', () => {
  const tree = renderer
    .create(
      <Router>
        <HospitalBag />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
