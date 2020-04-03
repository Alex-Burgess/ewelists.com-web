import React, { Fragment, useState, useEffect } from 'react';
import qs from "qs";
import { Auth, Hub } from "aws-amplify";
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import ScrollToTop from "custom/Scroll/ScrollToTop.js";
import Title from "custom/Title/Title.js"

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [title, setTitle] = useState('Ewelists');
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
    async function getSession() {
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
    }

    function parseErrorMessage(error) {
      const details = {};
      const errorArray = error.slice(0, -2).split(" ");

      details['account'] = errorArray[4];
      details['type'] = errorArray[5];

      return details
    }

    function checkForErrorMessage() {
      const substring = "PreSignUp failed with error"
      const error_message = qs.parse(props.location.search, { ignoreQueryPrefix: true }).error_description;

      if (error_message) {
        console.log("Message: " + error_message);

        if (error_message.indexOf(substring) !== -1) {
          const results = parseErrorMessage(error_message)

          var account = results['account'];
          if (account === 'LoginWithAmazon') {
            account = 'Amazon'
          }

          props.history.push({
            pathname: '/',
            search: '?po=login&account=' + account + '&type=' + results['type'],
          })
        }
      }

    }

    async function onLoad() {
      checkForErrorMessage();

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
            props.history.push("/login");
            break;
          default:
            // Catch all for ther cases, e.g. cognitoHostedUI_failure, customState_failure
            break;
        }
      });

      getSession();
      setIsAuthenticating(false);
    }

    onLoad();
  }, [props.history, props.location.search]);

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

  return (
    !isAuthenticating &&
    <Fragment>
      <ScrollToTop />
      <Title title={title} environment={process.env.REACT_APP_STAGE}/>
      <Routes appProps={{isAuthenticated, userHasAuthenticated, user, mobile, setTitle}} />
    </Fragment>
  );
}

export default withRouter(App);
