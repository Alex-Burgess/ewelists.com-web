import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Auth, Hub } from "aws-amplify";
import qs from "qs";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// libs
import { AppContext } from "libs/contextLib";
import { onError, debugError } from "libs/errorLib";
import { initGA, onView } from 'libs/analyticsLib';
// components
import Routes from "./Routes";
import ScrollToTop from "components/Scroll/ScrollToTop.js";
import Title from "components/Title/Title.js"
import ErrorBoundary from "views/ErrorPages/ErrorBoundary.js";

import styles from "assets/jss/material-kit-pro-react/views/appStyle.js";
const useStyles = makeStyles(styles);

export default function App(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [cookiesAllowed, setCookiesAllowed] = useState(false);
  const [tabTitle, setTabTitle] = useState('Ewelists');
  const [user, setUser] = useState({});
  const [breakpoint, setBreakpoint] = useState('');

  // Google Analytics & Facebook Pixel
  if (isAuthenticated || Cookies.get('CookieConsent') === 'true') {
    initGA();
    onView(window.location.pathname + window.location.search);
  }

  history.listen((location) => {
    onView(location.pathname + window.location.search);
    setTabTitle('Ewelists');
  });


  // Cookies
  useEffect( () => {
    if (isAuthenticated || Cookies.get('CookieConsent') === 'true') {
      setCookiesAllowed(true);
    }
  }, [isAuthenticated]);

  // Page size
  useEffect( () => {
    function updateDimensions() {
      // Set breakpoints
      if (window.innerWidth < 576){
        setBreakpoint('xs');
      } else if (window.innerWidth < 768) {
        setBreakpoint('sm');
      } else if (window.innerWidth < 992) {
        setBreakpoint('md');
      } else if (window.innerWidth < 1200) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  // Session Logic
  useEffect(() => {
    async function getSession() {
      try {
        await Auth.currentSession();
        debugError("User has current auth session.");
        await getAttributes();

        userHasAuthenticated(true);
      }
      catch(e) {
        if (e === 'No current user') {
          debugError('No current user');
        } else if (e.message === 'Refresh Token has expired') {
          debugError('Refresh Token has expired.');
        } else if (e.message === 'Cannot retrieve a new session. Please authenticate.') {
          debugError('Cannot retrieve a new session. Please authenticate.');
        } else {
          onError(e);
        }
      }
    }

    function parseErrorMessage(error) {
      const details = {};
      const errorArray = error.slice(0, -2).split(" ");

      details['account'] = errorArray[4];
      details['type'] = errorArray[5];

      return details
    }

    function checkForErrorMessage() {
      const googleSignUpMsg = "PreSignUp failed with error Google";
      const facebookSignUpMsg = "PreSignUp failed with error Facebook";
      const amazonSignUpMsg = "PreSignUp failed with error LoginWithAmazon";
      const googleDomainErrorMsg = "PreSignUp failed with error User exists with different google email address";
      const generalError = "PreSignUp failed with error";

      const error_message = qs.parse(location.search, { ignoreQueryPrefix: true }).error_description;

      if (error_message) {
        if (error_message.indexOf(googleSignUpMsg) !== -1 || error_message.indexOf(facebookSignUpMsg) !== -1 || error_message.indexOf(amazonSignUpMsg) !== -1) {
          const results = parseErrorMessage(error_message)

          var account = results['account'];
          if (account === 'LoginWithAmazon') {
            account = 'Amazon'
          }

          history.push({
            pathname: '/signup-complete',
            search: '?account=' + account + '&type=' + results['type'],
          })
        } else if (error_message.indexOf(googleDomainErrorMsg) !== -1) {
          onError(error_message);

          history.push({
            pathname: '/login',
            search: '?error=GoogleDomainError',
          })
          return false
        } else if (error_message.indexOf(generalError) !== -1) {
          onError(error_message);

          history.push({
            pathname: '/login',
            search: '?error=true'
          })
          return false
        } else {
          onError(error_message);
        }
      }

    }

    async function onLoad() {
      checkForErrorMessage();

      Hub.listen("auth", ({ payload: { event, data } }) => {
        debugError("Auth Event: " + event)
        switch (event) {
          case "signIn":
            getAttributes();
            userHasAuthenticated(true);
            break;
          default:
            break;
        }
      });

      await getSession();
      setIsAuthenticating(false);
    }

    onLoad();
    // ignoring warning about missing getAttributes as dependency
    // eslint-disable-next-line
  }, [history, location]);

  async function getAttributes() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const user = {
      email: attributes['email'],
      sub: attributes['sub'],
      name: attributes['name']
    }

    Cookies.set('name', user.name, { path: '/' });
    Cookies.set('email', user.email, { path: '/' });

    debugError("Retrieved user details: " + JSON.stringify(user));
    setUser(user);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/");
  }

  return (
      !isAuthenticating && (
          <Fragment>
            <ScrollToTop />
            <Title title={tabTitle} environment={process.env.REACT_APP_STAGE}/>
            <ErrorBoundary>
              <AppContext.Provider value={{
                  isAuthenticated,
                  userHasAuthenticated,
                  handleLogout,
                  user,
                  setTabTitle,
                  cookiesAllowed,
                  breakpoint
                }}>
                <Routes />
              </AppContext.Provider>
              {!isAuthenticated
                ? <CookieConsent
                    style={{ background: "#294861" }}
                    buttonStyle={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "600",
                      padding: "10px 15px",
                      backgroundColor: "#F9C74F"
                    }}
                    onAccept={({ acceptedByScrolling }) => {
                      initGA();
                      onView(window.location.pathname + window.location.search);
                    }}
                  >
                    Our website uses cookies to improve your experience and to provide personalised content. By using
                    our site you agree to our use of cookies.
                    <Link to="/cookies" className={classes.link} data-cy="cookie-policy-link"> Learn more</Link>
                    .
                  </CookieConsent>
                : null
              }
            </ErrorBoundary>
          </Fragment>
      )
  );
}
