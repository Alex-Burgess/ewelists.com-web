import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Auth } from "aws-amplify";
import ResetPasswordPage from './ResetPasswordPage';

describe('Reset Password Page Snapshots', () => {
  test('Renders empty form of login page', () => {
    const tree = TestRenderer
      .create(<Router><ResetPasswordPage /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Test Input Form', () => {
  const wrapper = mount(
    <Router>
      <ResetPasswordPage />
    </Router>
  );

  it('Should have email input', () => {
    expect(wrapper.find('CustomInput[id="email"]').length).toEqual(1);
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
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(false);
  });
});


describe('Test submit form', () => {
  const wrapper = mount(
    <Router>
      <ResetPasswordPage />
    </Router>
  );

  it('should show incorrect user error', () => {
    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    wrapper.update();

    Auth.forgotPassword = jest.fn().mockImplementation(() => {
      throw new Error("Incorrect username.");
    });

    let form = wrapper.find('form');
    form.simulate('submit');

    expect(wrapper.find('#submitError').text()).toEqual('Incorrect username.');
  });

  it('should render new password form', async () => {
    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    wrapper.update();

    Auth.forgotPassword = jest.fn().mockImplementation(() => {
      return true
    });

    let form = wrapper.find('form');
    await act(async () => {
      form.simulate('submit');
    });

    wrapper.update();
    expect(wrapper.find('form').find('#confirmationMessage').text()).toEqual('A confirmation code was sent to your email (test.user@gmail.com).');
  });
});

describe('End to end reset', () => {
  const wrapper = mount(
    <Router>
      <ResetPasswordPage />
    </Router>
  );

  it('should reset password', async () => {
    // Submit reset request for email
    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    Auth.forgotPassword = jest.fn().mockImplementation(() => {
      return true
    });

    let form = wrapper.find('form');
    await act(async () => {
      form.simulate('submit');
    });

    wrapper.update();
    expect(wrapper.find('form').find('#confirmationMessage').text()).toEqual('A confirmation code was sent to your email (test.user@gmail.com).');

    // Submit reset request with new password
    wrapper.find('input[id="code"]').simulate('change', {
      target: {
        value: '123456',
      },
    });

    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: 'password',
      },
    });

    wrapper.find('input[id="confirmPassword"]').simulate('change', {
      target: {
        value: 'password',
      },
    });

    Auth.forgotPasswordSubmit = jest.fn().mockImplementation(() => {
      return true
    });

    let resetForm = wrapper.find('form');
    await act(async () => {
      resetForm.simulate('submit');
    });

    wrapper.update();
    expect(wrapper.find('#successMessage').text()).toEqual('Your password has been reset.Login with your new credentials');
  });
});
