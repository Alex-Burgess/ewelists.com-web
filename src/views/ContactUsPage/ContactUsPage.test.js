import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import ContactUs from './ContactUsPage';

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

describe('Test for App', () => {
  test('renders contact us page', () => {
    const tree = TestRenderer
      .create(<Router><ContactUs /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test('renders contact us sent email page', () => {
  //   const testRenderer = TestRenderer.create(<Router><ContactUs /></Router>);
  //   // let tree = testRenderer.toJSON();
  //   // expect(tree).toMatchSnapshot();
  //
  //   // const instance = testRenderer.root.instance;
  //   testRenderer.root.instance.setState({submit: true});
  //
  //   testRenderer.update(<Router><ContactUs /></Router>);
  //
  //   console.log(testRenderer.toJSON());
  //
  //   let tree2 = testRenderer.toJSON();
  //   expect(tree2).toMatchSnapshot();
  // });
});
