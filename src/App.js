import React, { Fragment } from 'react';
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import { Helmet } from 'react-helmet';
import ScrollToTop from "custom/Scroll/ScrollToTop.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      email: null
    };
  }

  async componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
          console.log("Auth Event: " + event)
          switch (event) {
            case "signIn":
              this.setState({ user: data });
              this.userHasAuthenticated(true);
              this.getAttributes();
              break;
            case "signOut":
              this.setState({ user: null });
              break;
            case "signUp":
              console.log("Signup event for: " + data.user.username);
              break;
            case "forgotPassword":
              console.log("Forgot password request for: " + data.username);
              break;
            case "signIn_failure":
              if (data.message === "PreSignUp failed with error Sign up process complete for user.") {
                console.log("Signup actually completed.  Attempt login again.");
              } else if ((data.message === "Cannot read property 'accessToken' of undefined") || (data.message === "undefined is not an object (evaluating 'a.accessToken')")) {
                console.log("Got generic aws amplify error, redirecting to login page.");
              } else {
                console.log("Unexpected Data message: " + data.message);
              }

              // Redirect back to login page again.
              this.setState({ user: null });
              this.props.history.push("/login");
              break;
            default:
              // Catch all for ther cases, e.g. cognitoHostedUI_failure, customState_failure
              console.log("Default auth event data: " + JSON.stringify(data));
              this.setState({ user: null });
              break;
          }
        });

    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
      console.log("User has current auth session.");
    }
    catch(e) {
      if (e !== 'No current user') {
        console.log("Current session could not be retrieved:" + e);
      }
    }

    if (this.state.isAuthenticated) {
      try {
        this.getAttributes();
      }
      catch(e) {
        if (e !== 'No current user') {
          console.log("Attributes could not be retrieved: " + e);
        }
      }
    }

    this.setState({ isAuthenticating: false });
  }

  getAttributes = async () => {
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    // console.log("User id (sub): " + attributes['sub'] + " User email: " + attributes['email']);
    this.setState({
      email: attributes['email'],
      sub: attributes['sub'],
      name: attributes['name']
    });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  getUserEmail() {
    return this.state.email
  }

  setTitle() {
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

  render() {
    // console.log("User state: " + JSON.stringify(this.state.user));
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userEmail: this.state.email,
      userSub: this.state.sub,
      user: { email: this.state.email, sub: this.state.sub, name: this.state.name }
    };

    return (
      !this.state.isAuthenticating &&
      <Fragment>
        <ScrollToTop />
        <Helmet>
          <title>{this.setTitle()}</title>
        </Helmet>
        <Routes childProps={childProps} />
      </Fragment>
    );
  }
}

export default withRouter(App);
