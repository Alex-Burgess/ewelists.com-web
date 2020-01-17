import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChecklistCard from './ChecklistCard';

const items = ['Cool comfy clothing', 'Change of clothes', 'Phone', 'Camera', 'Charger', 'Swimwear for the pool'];

test('Renders renderer component.', () => {

  const tree = renderer
    .create(
      <Router>
        <ChecklistCard
          items={items}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
