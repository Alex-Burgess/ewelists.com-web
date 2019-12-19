import * as React from 'react';
import renderer from 'react-test-renderer';
import FooterGrey from './FooterGrey';

test('Renders FooterGrey component.', () => {
  const tree = renderer
    .create(
      <FooterGrey />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
