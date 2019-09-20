import React from 'react';
import { withRouter } from "react-router-dom";
import './App.css';
import Routes from "./Routes";
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
        alert(e);
      }
    }

    if (this.state.isAuthenticated) {
      try {
        this.getAttributes();
      }
      catch(e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }
    }

    this.setState({ isAuthenticating: false });
  }

  getAttributes = async () => {
    console.log("Getting email address");
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    console.log("User email: " + attributes['email']);
    this.setState({ email: attributes['email'] });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
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
      email: this.state.email
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

// export default App;
export default withRouter(App);
