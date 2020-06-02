import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Auth, Hub } from "aws-amplify";
import qs from "qs";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// libs
import { onError, debugError } from "libs/errorLib";
import { initGA, onView } from './libs/googleAnalyticsLib';
// components
import Routes from "./Routes";
import ScrollToTop from "custom/Scroll/ScrollToTop.js";
import Title from "custom/Title/Title.js"
import ErrorBoundary from "views/ErrorBoundary/ErrorBoundary.js";

import styles from "assets/jss/custom/views/appStyle.js";
const useStyles = makeStyles(styles);

export default function App(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [tabTitle, setTabTitle] = useState('Ewelists');
  const [user, setUser] = useState({});

  const [mobile, setMobile] = useState(false);

  // Google Analytics
  if (isAuthenticated || Cookies.get('CookieConsent') === 'true') {
    initGA();
    onView(window.location.pathname + window.location.search);
  }

  history.listen((location) => {
    onView(location.pathname + window.location.search);
    setTabTitle('Ewelists');
  });


  // Page size
  useEffect( () => {
    function updateDimensions() {
      if (window.innerWidth < 400){
        setMobile(true);
      } else {
        setMobile(false);
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
            pathname: '/',
            search: '?po=login&account=' + account + '&type=' + results['type'],
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
  }, [history, location]);

  async function getAttributes() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const user = {
      email: attributes['email'],
      sub: attributes['sub'],
      name: attributes['name']
    }

    debugError("Retrieved user details: " + JSON.stringify(user));
    setUser(user);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
  }

  return (
      !isAuthenticating && (
          <Fragment>
            <ScrollToTop />
            <Title title={tabTitle} environment={process.env.REACT_APP_STAGE}/>
            <ErrorBoundary>
              <Routes appProps={{isAuthenticated, userHasAuthenticated, user, mobile, setTabTitle, handleLogout}} />
              {!isAuthenticated
                ? <CookieConsent
                    style={{ background: "#2B373B" }}
                    buttonStyle={{
                      color: "#FFF",
                      fontSize: "14px",
                      fontWeight: "600",
                      padding: "10px 15px",
                      backgroundColor: "#00acc1"
                    }}
                    onAccept={({ acceptedByScrolling }) => {
                      initGA();
                      onView(window.location.pathname + window.location.search);
                    }}
                  >
                    Our website uses cookies to improve your experience and to provide personalised content. By using
                    our site you agree to our use of cookies
                    <Link to="/cookies" className={classes.link}> Learn more</Link>
                    .
                  </CookieConsent>
                : null
              }
            </ErrorBoundary>
          </Fragment>
      )
  );
}
