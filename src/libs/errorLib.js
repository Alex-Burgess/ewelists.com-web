import * as Sentry from "@sentry/browser";
import config from "config";

const test_sentry = process.env.REACT_APP_SENTRY;

let isLocal = false;

if (config.environment === 'test' && test_sentry !== 'true' ) {
  isLocal = true;
}


export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({
    dsn: config.sentry,
    environment: config.environment
  });
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    console.log(error);
    console.log(errorInfo);
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
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
  if (isLocal) {
    console.log("DEBUG:" + error);
  } else {
    return
  }
}
