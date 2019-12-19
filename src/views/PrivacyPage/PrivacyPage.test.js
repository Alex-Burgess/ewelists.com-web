import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import PrivacyPage from './PrivacyPage';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});

test('renders privacy page', () => {
  const tree = renderer
    .create(<Router><PrivacyPage /></Router>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
