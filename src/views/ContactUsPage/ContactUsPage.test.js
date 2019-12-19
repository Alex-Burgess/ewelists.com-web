import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import { act } from 'react-dom/test-utils';
import ContactUsPage from './ContactUsPage';

describe('ContactUs Page Snapshots', () => {
  test('Renders empty form of contact us page', () => {
    const tree = TestRenderer
      .create(<Router><ContactUsPage /></Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Test Input Form', () => {
  const wrapper = mount(
    <Router>
      <ContactUsPage />
    </Router>
  );

  it('Should have 1 form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Should have 3 inputs, name, email and message', () => {
    expect(wrapper.find('CustomInput').length).toEqual(3);
    expect(wrapper.find('CustomInput[id="name"]').length).toEqual(1);
    expect(wrapper.find('CustomInput[id="email"]').length).toEqual(1);
    expect(wrapper.find('CustomInput[id="message"]').length).toEqual(1);
  });

  it('Should have 1 form submit button, which is disabled', () => {
    const submitButton = wrapper.find('form').find('button');
    expect(submitButton.length).toEqual(1);
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);
  });

  it('Submit button should be active when all fields populated', () => {
    wrapper.find('input[id="name"]').simulate('change', {
      target: {
        value: 'Test User',
      },
    });

    wrapper.update();
    var submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('input[id="email"]').simulate('change', {
      target: {
        value: 'test.user@gmail.com',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(true);

    wrapper.find('textarea[id="message"]').simulate('change', {
      target: {
        value: 'A test message.',
      },
    });

    wrapper.update();
    submitButton = wrapper.find('form').find('button');
    // console.log("Button: " + submitButton.debug());
    expect(submitButton.hasClass(/(makeStyles-disabled)-(\d+)/)).toEqual(false);
  });
});


describe('Test Email Sent Result Page', () => {
  const api = require('./contactApi.js');
  api.contactApiPost = jest.fn(() => {
    return {
      "name": 'Mock User',
      "email": 'mock.user@gmail.com',
      "message": 'A test message.',
      "id": 258166
    }
  });

  const wrapper = mount(
    <Router>
      <ContactUsPage />
    </Router>
  );

  it('Should send email and display confirmation message', async () => {
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

    wrapper.find('textarea[id="message"]').simulate('change', {
      target: {
        value: 'Test Message',
      },
    });

    wrapper.update();
    expect(wrapper.find('#formWrapper').length).toEqual(1);

    expect(wrapper.find('#formWrapper').text()).toEqual('Your NameEmail addressYour messageContact us');
    // expect(wrapper.find('#formWrapper').html()).toEqual('Your NameEmail addressYour messageContact us');

    const submitButton = wrapper.find('form').find('button');
    // submitButton.simulate('click');

    await act(async () => {
      submitButton.simulate('click');
    });

    expect(wrapper.find('#formWrapper').text()).toEqual('Thank you for your message Test User.  We will get back to you by email.');
  });
});
