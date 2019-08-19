import React from 'react';
import { withRouter } from "react-router-dom";
import './App.css';
import Routes from "./Routes";
import { Auth, Hub } from "aws-amplify";


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

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      email: this.state.email
    };

    return (
      <Routes childProps={childProps} />
    );
  }
}

// export default App;
export default withRouter(App);
