import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "custom/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "custom/Header/HeaderLinksAuth.jsx";

import headerTransparentStyle from "assets/jss/material-kit-pro-react/components/headerStyle.jsx";
// import headerTransparentStyle from "assets/jss/custom/components/headerTransparentStyle.jsx";

function HeaderTransparent(props) {
  const { classes, isAuthenticated } = props;

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
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

export default withStyles(headerTransparentStyle)(HeaderTransparent);
