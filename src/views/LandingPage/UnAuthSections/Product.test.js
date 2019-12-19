import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Product from './Product';

describe('Tests for Product section.', () => {
  test('Renders product section', () => {
    const tree = TestRenderer
      .create(<Product />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
