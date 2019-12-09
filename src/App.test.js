import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Test for App', () => {
  it('email should be null', () => {
    const app = shallow(<App.WrappedComponent />);
    expect(app.state('email')).toEqual(null);
  });

  it('email should contain a value', () => {
    const app = shallow(<App.WrappedComponent />);
    app.setState({ email: 'test.user@gmail.com'});
    expect(app.state('email')).toEqual('test.user@gmail.com');
  });

  // it("userHasAuthenticated should setState on isAuthenticated", () => {
  //   const wrapper = shallow(<App.WrappedComponent />);
  //   wrapper.instance().userHasAuthenticated(true);
  //   expect(wrapper.state('isAuthenticated')).toEqual(true)
  // });
});
