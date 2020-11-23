import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { Cookies } from "react-cookie-consent";
import config from "config";

//
// Check for test Cookie
//
let test_flag = false;

if (Cookies.get('Test') === 'true') {
  test_flag = true;
}

// const advancedMatching = { em: 'some@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const advancedMatching = {}; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};

ReactPixel.init(config.fbPixel, advancedMatching, options);
ReactPixel.revokeConsent();

export function initGA() {
  ReactGA.initialize(config.ga);
  ReactPixel.grantConsent();
}


export function onView(path) {
  if (! test_flag) {
    ReactGA.pageview(path);
    ReactPixel.pageView();
  }
}


export function trackEvent(category, action, data){
  if (! test_flag) {
    const event = category + '-' + action;
    ReactPixel.trackCustom(event, data);
    ReactGA.event({
      category: category,
      action: action
    });
  }
}
