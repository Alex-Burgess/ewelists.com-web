import * as React from 'react';
import renderer from 'react-test-renderer';
import FooterDark from './FooterDark';

test('Renders FootDark component.', () => {
  const tree = renderer
    .create(
      <FooterDark />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
