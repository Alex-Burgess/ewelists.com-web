import * as React from 'react';
import renderer from 'react-test-renderer';
import FooterTransparent from './FooterTransparent';

test('Renders FooterTransparent component.', () => {
  const tree = renderer
    .create(
      <FooterTransparent />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
