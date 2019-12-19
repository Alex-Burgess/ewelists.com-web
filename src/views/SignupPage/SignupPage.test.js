import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Auth } from "aws-amplify";
import SignupPage from './SignupPage';

// TODO - fix snapshot test for signup form.  Issue seems to be with popout code.
// describe('Signup Page Snapshots', () => {
//   test('Renders empty form of signup page', () => {
//     const tree = TestRenderer
//       .create(<Router><SignupPage /></Router>)
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

describe('Test Signup Form', () => {
  const wrapper = mount(
    <Router>
      <SignupPage />
    </Router>
  );

  it('Should have 1 form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Should have 3 inputs', () => {
    expect(wrapper.find('CustomInput').length).toEqual(3);
  });

  it('Should have name input', () => {
    expect(wrapper.find('CustomInput[id="name"]').length).toEqual(1);
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
    wrapper.find('input[id="name"]').simulate('change', {
      target: {
        value: 'Test User',
      },
    });

    wrapper.update();
    let submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
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

describe('Test Signup form submit', () => {
  const wrapper = mount(
    <Router>
      <SignupPage />
    </Router>
  );

  wrapper.find('input[id="name"]').simulate('change', {
    target: {
      value: 'Test User',
    },
  });

  wrapper.find('input[id="email"]').simulate('change', {
    target: {
      value: 'test.user@gmail.com',
    },
  });

  let form = wrapper.find('form');

  it('should error when password contains no lower case letters', () => {
    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: '12345678',
      },
    });

    wrapper.update();
    form.simulate('submit');
    expect(wrapper.find('#signupError').text()).toEqual('Password does not contain any lower case letters.');
  });


  it('should error when password contains no upper case letters', () => {
    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: 'abcdefgh',
      },
    });

    wrapper.update();
    form.simulate('submit');
    expect(wrapper.find('#signupError').text()).toEqual('Password does not contain any upper case letters.');
  });

  it('should error when password contains no numbers', () => {
    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: 'abcdefgH',
      },
    });

    wrapper.update();
    form.simulate('submit');
    expect(wrapper.find('#signupError').text()).toEqual('Password does not contain any numbers.');
  });

  it('should error when password contains no special characters', () => {
    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: 'abcdefH1',
      },
    });

    wrapper.update();
    form.simulate('submit');
    expect(wrapper.find('#signupError').text()).toEqual('Password does not contain any symbols.');
  });

  it('should error if user already signed up', async () => {
    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: 'abcde$H1',
      },
    });

    Auth.signUp = jest.fn().mockImplementation(() => {
      throw new Error("An account with the given email already exists.");
    });

    wrapper.update();
    await act(async () => {
      form.simulate('submit');
    });

    wrapper.update();
    expect(wrapper.find('#signupError').text()).toEqual('An account with the given email already exists.');
  });

  it('should succeed when password contains all necessary types', async () => {
    wrapper.find('input[id="password"]').simulate('change', {
      target: {
        value: 'abcde$H1',
      },
    });

    Auth.signUp = jest.fn().mockImplementation(() => {
      return true
    });

    wrapper.update();
    await act(async () => {
      form.simulate('submit');
    });

    wrapper.update();
    expect(wrapper.find('#confirmationMessage').text()).toEqual('Please check your email for the code.');
  });
});
