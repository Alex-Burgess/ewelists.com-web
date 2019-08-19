/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router'
import { Auth } from "aws-amplify";

class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("Logging user out");
    Auth.signOut();

    this.props.userHasAuthenticated(false);

    this.props.history.push("/login");
  }


  render() {
    return null
  }
}

LogoutPage.propTypes = {
  classes: PropTypes.object
};

export default withRouter(LogoutPage);
