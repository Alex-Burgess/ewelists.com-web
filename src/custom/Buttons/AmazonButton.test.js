import * as React from 'react';
import renderer from 'react-test-renderer';
import AmazonButton from './AmazonButton';

test('renders amazon button', () => {
  const tree = renderer
    .create(
      <AmazonButton justIcon round color="amazon">
        <i
          className={"fab fa-amazon"}
        />
      </AmazonButton>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
