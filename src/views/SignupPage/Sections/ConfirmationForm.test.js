import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import { Auth } from "aws-amplify";
import ConfirmationForm from './ConfirmationForm';

describe('Signup Page Snapshots', () => {
  test('Renders empty form of signup page', () => {
    const tree = TestRenderer
      .create(<Router><ConfirmationForm email="mock.user@gmail.com" password="12345678" /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Test Confirmation Form', () => {
  const wrapper = mount(
    <Router>
      <ConfirmationForm email="mock.user@gmail.com" password="12345678" />
    </Router>
  );

  it('Should have 1 inputs', () => {
    expect(wrapper.find('CustomInput').length).toEqual(1);
  });

  it('Should have confirmationCode input', () => {
    expect(wrapper.find('CustomInput[id="confirmationCode"]').length).toEqual(1);
  });

  it('Should have 1 form submit button', () => {
    expect(wrapper.find('form').find('button').length).toEqual(1);
  });

  it('Form submit button should be disabled', () => {
    const submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);
  });

  it('Submit button should be active when all fields populated', () => {
    wrapper.update();
    let submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('input[id="confirmationCode"]').simulate('change', {
      target: {
        value: '123456',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(false);
  });
});

describe('Test Confirmation Form Submit', () => {
  const wrapper = mount(
    <Router>
      <ConfirmationForm email="mock.user@gmail.com" password="12345678" />
    </Router>
  );

  it('should display error if code incorrect', () => {
    wrapper.find('input[id="confirmationCode"]').simulate('change', {
      target: {
        value: '123456',
      },
    });

    wrapper.update();

    Auth.confirmSignUp = jest.fn().mockImplementation(() => {
      throw new Error("Invalid verification code provided, please try again.");
    });

    let form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.find('#confirmationError').text()).toEqual('Invalid verification code provided, please try again.');
  });
});
