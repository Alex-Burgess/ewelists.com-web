import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Auth } from "aws-amplify";
import LoginPage from './LoginPage';

// TODO - Test username and password login successful.  Tricky to do, because redirects.
// Test currently fails because can't mock props.userHasAuthenticated.

// TODO - Test social login buttons.


describe('Login Page Snapshots', () => {
  test('Renders empty form of login page', () => {
    const tree = TestRenderer
      .create(<Router><LoginPage /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('Test Input Form', () => {
  const wrapper = mount(
    <Router>
      <LoginPage />
    </Router>
  );

  it('Should have 1 form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Should have 2 inputs', () => {
    expect(wrapper.find('CustomInput').length).toEqual(2);
  });

  it('Should have email input', () => {
    expect(wrapper.find('CustomInput[id="email"]').length).toEqual(1);
  });

  it('Should have message input', () => {
    expect(wrapper.find('CustomInput[id="password"]').length).toEqual(1);
  });

  it('Should have 1 form submit button', () => {
    expect(wrapper.find('form').find('button').length).toEqual(1);
  });

  it('Form submit button should be disabled', () => {
    const submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);
  });

  it('Submit button should be active when all fields populated', () => {
    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    wrapper.update();
    let submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: '12345678',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(false);
  });
});


describe('Test Username and Password Login', () => {
  const wrapper = mount(
    <Router>
      <LoginPage />
    </Router>
  );

  it('Login should fail with user that does not exist', () => {
    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: '12345678',
      },
    });

    wrapper.update();

    Auth.signIn = jest.fn().mockImplementation(() => {
      throw new Error("User does not exist.");
    });

    let form = wrapper.find('form');
    form.simulate('submit');

    expect(wrapper.find('#loginError').text()).toEqual('User does not exist.');
  });

  it('Login should fail with incorrect password', () => {
    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: '12345678',
      },
    });

    wrapper.update();

    Auth.signIn = jest.fn().mockImplementation(() => {
      throw new Error("Incorrect username or password.");
    });

    let form = wrapper.find('form');
    form.simulate('submit');

    expect(wrapper.find('#loginError').text()).toEqual('Incorrect username or password.');
  });

  // TODO
  // it('should render landing page after login', async () => {
  //   wrapper.find('input[id="email"]').simulate('change', {
  //     target: {
  //       value: 'test.user@gmail.com',
  //     },
  //   });
  //
  //   wrapper.find('input[id="password"]').simulate('change', {
  //     target: {
  //       value: '12345678',
  //     },
  //   });
  //
  //   wrapper.update();
  //
  //   Auth.signIn = jest.fn().mockImplementation(() => {
  //     return true
  //   });
  //
  //   userHasAuthenticated = jest.fn().mockImplementation(() => {
  //     return true
  //   });
  //
  //   let form = wrapper.find('form');
  //   await act(async () => {
  //     form.simulate('submit');
  //   });
  //
  //   // console.log("Wrapper: " + wrapper.debug())
  //   wrapper.update();
  //   expect(wrapper.find('#loginError').text()).toEqual('Incorrect username or password.');
  // });
});

describe('Test forgot your password link', () => {
  const wrapper = mount(
    <Router>
      <LoginPage />
    </Router>
  );

  it('Should have reset password link', () => {
    expect(wrapper.find('form').find('a').length).toEqual(1);
  });

  it('Should have correct reset password path', () => {
    expect(wrapper.find('form').find('a').props().href).toBe('/login/reset');
  });
});
