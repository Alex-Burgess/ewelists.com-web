import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TravelGear from './TravelGear';

test('Renders TravelGear page.', () => {
  const tree = renderer
    .create(
      <Router>
        <TravelGear />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
