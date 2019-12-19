import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Ideas from './Ideas';

describe('Tests for Ideas section.', () => {
  test('Renders ideas section', () => {
    const tree = TestRenderer
      .create(<Ideas />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
