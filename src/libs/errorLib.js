import * as Sentry from "@sentry/browser";
import { Cookies } from "react-cookie-consent";
import config from "config";

//
// Check for logs should be sent to sentry
//
let logToSentry = true;

if (process.env.REACT_APP_SENTRY === 'false' || Cookies.get('Test') === 'true') {
  logToSentry = false;
}


export function initSentry() {
  if (logToSentry) {
    Sentry.init({
      dsn: config.sentry,
      environment: config.environment
    });
  } else {
    return;
  }
}

export function logError(error, errorInfo = null) {
  if (logToSentry) {
    Sentry.withScope((scope) => {
      errorInfo && scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  } else {
    console.log(error);
    console.log(errorInfo);
    return;
  }
}

export function onError(error, id = null) {
  let errorInfo = {};

  // Set user details
  if (id) {
    Sentry.configureScope(function(scope) {
      scope.setUser({"id": id});
    });
  }

  // String errors
  if (typeof error === 'string') {
    error = new Error(error);
  // Auth errors
  } else if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    let message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
    errorInfo.message = error.response.data.error;
  }

  logError(error, errorInfo);
}


export function onAuthError(error, email) {
  let errorInfo = error;
  let message = error.message + "(" + email + ")";
  error = new Error(message);

  Sentry.configureScope(function(scope) {
    scope.setUser({"email": email});
    scope.setLevel('warning');
  });

  logError(error, errorInfo);
}

export function debugError(error) {
  if (logToSentry) {
    return
  } else {
    console.log("DEBUG:" + error);
  }
}
