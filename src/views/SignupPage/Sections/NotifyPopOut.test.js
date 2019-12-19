import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {mount} from 'enzyme';
import NotifyPopOut from './NotifyPopOut';

describe('Test Facebook Popout', () => {
  const wrapper = mount(
    <Router>
      <NotifyPopOut open={true} socialType="facebook" />
    </Router>
  );

  it('Should have email input', () => {
    expect(wrapper.find('h5').text()).toEqual("If this is your first time signing in with your facebook account, you might find you are redirected to our login page.  If this happens, just click on the facebook icon and you'll be logged in as normal from then on.");
  });
});

describe('Test Amazon Popout', () => {
  const wrapper = mount(
    <Router>
      <NotifyPopOut open={true} socialType="amazon" />
    </Router>
  );

  it('Should have email input', () => {
    expect(wrapper.find('h5').text()).toEqual("If this is your first time signing in with your amazon account, you might find you are redirected to our login page.  If this happens, just click on the amazon icon and you'll be logged in as normal from then on.");
  });
});

describe('Test Google Popout', () => {
  const wrapper = mount(
    <Router>
      <NotifyPopOut open={true} socialType="google" />
    </Router>
  );

  it('Should have email input', () => {
    expect(wrapper.find('h5').text()).toEqual("If this is your first time signing in with your google account, you might find you are redirected to our login page.  If this happens, just click on the google icon and you'll be logged in as normal from then on.");
  });
});
