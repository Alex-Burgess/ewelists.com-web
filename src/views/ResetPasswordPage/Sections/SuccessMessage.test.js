import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import SuccessMessage from './SuccessMessage';

describe('Reset Password Success Message Snapshots', () => {
  test('Renders success message', () => {
    const tree = TestRenderer
      .create(<Router><SuccessMessage /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
