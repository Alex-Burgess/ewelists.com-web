import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import config from "./config";

import "assets/scss/material-kit-pro-react.scss?v=1.7.0";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
        domain: config.cognito.DOMAIN,
        scope: config.cognito.SCOPE,
        redirectSignIn: config.cognito.REDIRECTSIGNIN,
        redirectSignOut: config.cognito.REDIRECTSIGNOUT,
        responseType: config.cognito.RESPONSETYPE,
        options: {
            AdvancedSecurityDataCollectionFlag: false
        }
    }
  },
  API: {
    endpoints: [
      {
        name: "list",
        endpoint: config.apiGateway.LIST,
        region: config.apiGateway.REGION
      }
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
