import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Auth } from "aws-amplify";
import NewPasswordForm from './NewPasswordForm';

describe('New Password Form Snapshots', () => {
  test('Renders empty new password form', () => {
    const tree = TestRenderer
      .create(<Router><NewPasswordForm email="mock.user@gmail.com"/></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Test Input Form', () => {
  const wrapper = mount(
    <Router>
      <NewPasswordForm email="mock.user@gmail.com" />
    </Router>
  );

  it('Should have 3 inputs', () => {
    expect(wrapper.find('CustomInput').length).toEqual(3);
  });

  it('Should have code input', () => {
    expect(wrapper.find('CustomInput[id="code"]').length).toEqual(1);
  });

  it('Should have password input', () => {
    expect(wrapper.find('CustomInput[id="password"]').length).toEqual(1);
  });

  it('Should have confirmPassword input', () => {
    expect(wrapper.find('CustomInput[id="confirmPassword"]').length).toEqual(1);
  });

  it('Should have 1 form submit button', () => {
    expect(wrapper.find('form').find('button').length).toEqual(1);
  });

  it('Form submit button should be disabled', () => {
    const submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);
  });

  it('Submit button should be active when all fields populated and passwords match', () => {
    wrapper.find('input[id="code"]').simulate('change', {
      target: {
        value: '123456',
      },
    });

    wrapper.update();
    let submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: 'password',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('input[id="confirmPassword"]').simulate('change', {
      target: {
        value: 'password1',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('input[id="confirmPassword"]').simulate('change', {
      target: {
        value: 'password',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(false);
  });
});


describe('Test submit form', () => {
  const wrapper = mount(
    <Router>
      <NewPasswordForm email="mock.user@gmail.com" />
    </Router>
  );

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

  wrapper.update();

  it('should show invalid code error', () => {
    Auth.forgotPasswordSubmit = jest.fn().mockImplementation(() => {
      throw new Error("Invalid verification code provided, please try again.");
    });

    let form = wrapper.find('form');
    form.simulate('submit');

    expect(wrapper.find('#newPasswordError').text()).toEqual('Invalid verification code provided, please try again.');
  });

  it('should show invalid password error', () => {
    Auth.forgotPasswordSubmit = jest.fn().mockImplementation(() => {
      throw new Error("Password does not conform to policy: Password must have lowercase characters");
    });

    let form = wrapper.find('form');
    form.simulate('submit');

    expect(wrapper.find('#newPasswordError').text()).toEqual('Password does not conform to policy: Password must have lowercase characters');
  });
});
