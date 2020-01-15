import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Create from './Create';

describe('Tests for Create section.', () => {
  test('Renders create section', () => {
    const tree = TestRenderer
      .create(<Create />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders create section on mobile device width', () => {
    global.innerWidth = 375;

    const tree = TestRenderer
      .create(<Create />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
