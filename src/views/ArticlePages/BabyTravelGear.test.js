import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BabyTravelGear from './BabyTravelGear';

test.skip('Renders TravelGear page.', () => {
  const tree = renderer
    .create(
      <Router>
        <BabyTravelGear />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
