import * as Sentry from "@sentry/browser";
import config from "config";

// const isLocal = process.env.NODE_ENV === "test";
const isLocal = false;

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
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export function onError(error) {
  let errorInfo = {};

  if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
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
