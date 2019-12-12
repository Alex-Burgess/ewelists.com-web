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
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
// core components
import HeaderTransparent from "custom/Header/HeaderTransparent.jsx";
import FooterTransparent from "custom/Footer/FooterTransparent.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import errorPageCustomStyle from "assets/jss/custom/views/errorPageCustomStyle.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

class ErrorPage extends React.Component {
  returnChecked() {
    return true;
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <HeaderTransparent isAuthenticated={this.props.isAuthenticated} />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.contentCenter}>
            <GridContainer>
              <GridItem md={12}>
                <h1 className={classes.title}>Page not found</h1>
                <h2 className={classes.subTitle}>The page you are looking for does not exist.</h2>
                <a href="/">Click to go back to the home page.</a>
              </GridItem>
            </GridContainer>
          </div>
        </div>

        <FooterTransparent />
      </div>
    );
  }
}

ErrorPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(errorPageCustomStyle)(ErrorPage);
