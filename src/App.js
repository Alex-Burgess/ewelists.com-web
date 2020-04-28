import React, { Fragment, useState, useEffect } from 'react';
import qs from "qs";
import { Auth, Hub } from "aws-amplify";
import { useHistory, useLocation } from "react-router-dom";
import Routes from "./Routes";
import ScrollToTop from "custom/Scroll/ScrollToTop.js";
import Title from "custom/Title/Title.js"

function App(props) {
  const history = useHistory();
  const location = useLocation();

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
      const substring2 = "PreSignUp failed with error User exists with different google email address"
      const error_message = qs.parse(location.search, { ignoreQueryPrefix: true }).error_description;

      if (error_message) {
        console.log("Message: " + error_message);

        if (error_message.indexOf(substring2) !== -1) {
          console.log("Google social login failure, recommend username and password login.");

          history.push({
            pathname: '/login',
            search: '?error=GoogleDomainError',
          })
          return false
        }

        if (error_message.indexOf(substring) !== -1) {
          const results = parseErrorMessage(error_message)

          var account = results['account'];
          if (account === 'LoginWithAmazon') {
            account = 'Amazon'
          }

          history.push({
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
          default:
            break;
        }
      });

      getSession();
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

    console.log("Retrieved user details: " + JSON.stringify(user));
    setUser(user);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
  }

  return (
    !isAuthenticating &&
    <Fragment>
      <ScrollToTop />
      <Title title={title} environment={process.env.REACT_APP_STAGE}/>
      <Routes appProps={{isAuthenticated, userHasAuthenticated, user, mobile, setTitle, handleLogout}} />
    </Fragment>
  );
}

export default App;
