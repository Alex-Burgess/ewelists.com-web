import { withRouter } from 'react-router'
import { Auth } from "aws-amplify";

function LogoutPage(props) {
  console.log("Logging user out");
  Auth.signOut();
  props.userHasAuthenticated(false);
  props.history.push("/login");

  return null;
}

export default withRouter(LogoutPage);
