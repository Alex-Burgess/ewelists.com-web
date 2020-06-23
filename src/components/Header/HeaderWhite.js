import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-pro-react/components/header/headerStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderWhite(props) {
  const { isAuthenticated, user, mobile } = props;
  const classes = useStyles();

  return (
    <Header
      brand={<img className={classes.logo} src={require("assets/img/logo-blue.svg")} alt="logo"/>}
      links={<HeaderLinks headerColor="white" isAuthenticated={isAuthenticated} user={user} mobile={mobile}/>}
      fixed
      color="white"
    />
  );
}

HeaderWhite.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  mobile: PropTypes.bool
};
