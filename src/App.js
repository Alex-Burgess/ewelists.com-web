import React from 'react';
import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import { Helmet } from 'react-helmet';

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
          console.log("There was an event: " + event)
          switch (event) {
            case "signIn":
              console.log("User was signed in");
              this.setState({ user: data });
              this.userHasAuthenticated(true);
              this.getAttributes();
              break;
            case "signOut":
              console.log("User was sign out");
              this.setState({ user: null });
              break;
            default:
              console.log("Unexpected auth event: " + event);
              console.log("Unexpected auth event data: " + data);
              if ((data.message === "Cannot read property 'accessToken' of undefined") || (data.message === "undefined is not an object (evaluating 'a.accessToken')")) {
                console.log("There was an unexpected signin or signup event, redirecting to login page.");
                this.props.history.push("/login");
              }
              this.setState({ user: null });
              break;
          }
        });

    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
      console.log("User was authenticated");
    }
    catch(e) {
      if (e !== 'No current user') {
        // alert(e);
        console.log(e);
      }
    }

    if (this.state.isAuthenticated) {
      try {
        this.getAttributes();
      }
      catch(e) {
        if (e !== 'No current user') {
          // alert(e);
          console.log(e);
        }
      }
    }

    this.setState({ isAuthenticating: false });
  }

  getAttributes = async () => {
    console.log("Getting email address");
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    console.log("User id (sub): " + attributes['sub'] + " User email: " + attributes['email']);
    this.setState({
      email: attributes['email'],
      sub: attributes['sub']
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
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      userEmail: this.state.email,
      userSub: this.state.sub
    };

    return (
      !this.state.isAuthenticating &&
      <div>
        <Helmet>
          <title>{this.setTitle()}</title>
        </Helmet>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
