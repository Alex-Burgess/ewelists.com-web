import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import SentMessage from './SentMessage';

describe('Tests for SentMessage section.', () => {
  test('Renders message for name', () => {
    const tree = TestRenderer
      .create(<SentMessage name="Test User"/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
