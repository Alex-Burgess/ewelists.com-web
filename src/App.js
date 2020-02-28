import React, { Fragment, useState, useEffect } from 'react';
import { Auth, Hub } from "aws-amplify";
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import { Helmet } from 'react-helmet';
import ScrollToTop from "custom/Scroll/ScrollToTop.js";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const [mobile, setMobile] = useState(false);

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

  useEffect(() => {
    async function onLoad() {
      Hub.listen("auth", ({ payload: { event, data } }) => {
            console.log("Auth Event: " + event)
            switch (event) {
              case "signIn":
                getAttributes();
                userHasAuthenticated(true);
                break;
              case "signOut":
                setUser(null);
                break;
              case "signUp":
                console.log("Signup event for: " + data.user.username);
                break;
              case "forgotPassword":
                console.log("Forgot password request for: " + data.user.username);
                break;
              case "signIn_failure":
                if (data.message === "PreSignUp failed with error Sign up process complete for user.") {
                  console.log("Signup actually completed.  Attempt login again.");
                } else if ((data.message === "Cannot read property 'accessToken' of undefined") || (data.message === "undefined is not an object (evaluating 'a.accessToken')")) {
                  console.log("Got generic aws amplify error, redirecting to login page.");
                } else {
                  console.log("Unexpected Data message: " + data.message);
                }

                this.props.history.push("/login");
                break;
              default:
                // Catch all for ther cases, e.g. cognitoHostedUI_failure, customState_failure
                break;
            }
          });

      try {
        await Auth.currentSession();
        console.log("User has current auth session.");
        await getAttributes();

        userHasAuthenticated(true);

      }
      catch(e) {
        if (e !== 'No current user') {
          console.log("Current session could not be retrieved:" + e);
        }
      }

      setIsAuthenticating(false);
    }

    onLoad();
  }, []);

  async function getAttributes() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const user = {
      email: attributes['email'],
      sub: attributes['sub'],
      name: attributes['name']
    }

    console.log("Retrieved user details: " + JSON.stringify(user));
    setUser(user);
  }

  const setTitle = () => {
    var title = 'Ewelists';

    if (process.env.REACT_APP_STAGE === "prod") {
      title = 'Ewelists';
    } else if (process.env.REACT_APP_STAGE === "staging") {
      title = 'Ewelists - Staging';
    } else if (process.env.REACT_APP_STAGE === 'test') {
      title = 'Ewelists - Test';
    } else if (process.env.REACT_APP_STAGE === undefined) {
      title = 'Ewelists - Test';
    }
    return title
  }

  return (
    !isAuthenticating &&
    <Fragment>
      <ScrollToTop />
      <Helmet>
        <title>{setTitle()}</title>
      </Helmet>
      <Routes appProps={{isAuthenticated, userHasAuthenticated, user, mobile}} />
    </Fragment>
  );
}

export default withRouter(App);
