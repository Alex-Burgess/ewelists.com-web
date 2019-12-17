import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "custom/Header/HeaderLinks.js";
import HeaderLinksAuth from "custom/Header/HeaderLinksAuth.js";

import styles from "assets/jss/material-kit-pro-react/components/headerStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderTransparent(props) {
  const { isAuthenticated } = props;
  const classes = useStyles();

  return (
    <div>
      {isAuthenticated
        ? <Header
            brand={<img className={classes.logo} src={require("assets/img/logo-white.png")} alt="logo"/>}
            links={<HeaderLinksAuth dropdownHoverColor="info" />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 200,
              color: "info"
            }}
          />
        : <Header
            brand={<img className={classes.logo} src={require("assets/img/logo-white.png")} alt="logo"/>}
            links={<HeaderLinks dropdownHoverColor="info" />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 200,
              color: "info"
            }}
          />
      }
    </div>
  );
}

HeaderTransparent.propTypes = {
  isAuthenticated: PropTypes.bool
};
