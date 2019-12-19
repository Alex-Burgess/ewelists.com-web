import * as React from 'react';
import renderer from 'react-test-renderer';
import CreateButton from './CreateButton';

test('renders amazon button', () => {
  const tree = renderer
    .create(
      <CreateButton
        text="Create a New List"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
