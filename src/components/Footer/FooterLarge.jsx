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
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import footerLargeStyle from "assets/jss/material-kit-pro-react/components/footerLargeStyle.jsx";

function FooterLarge(props) {
  const { classes } = props;

  return (
    <div>
      <Footer
        theme="dark"
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/contact"
                    className={classes.block}
                  >
                    Contact Us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/#about"
                    className={classes.block}
                  >
                    About us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/privacy"
                    className={classes.block}
                  >
                    Privacy
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/terms"
                    className={classes.block}
                  >
                    Terms
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} ewelists
            </div>
          </div>
        }
      >
      <GridContainer>
        <GridItem xs={12} sm={8} md={8}>
          <h4 id="about">About Us</h4>
          <p>
            Creative Tim is a startup that creates design tools that make
            the web development process faster and easier.{" "}
          </p>
          <p>
            We love the web and care deeply for how users interact with a
            digital product. We power businesses and individuals to create
            better looking web projects around the world.{" "}
          </p>
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <h4>Follow Us</h4>
          <ul className={classes.socialButtons}>
            <li>
              <Button justIcon simple href="https://www.facebook.com/ewelists" target="_blank" color="facebook">
                <i className="fab fa-facebook-square" />
              </Button>
            </li>
            <li>
              <Button justIcon simple href="https://twitter.com/ewelists" target="_blank" color="twitter">
                <i className="fab fa-twitter" />
              </Button>
            </li>
            <li>
              <Button justIcon simple href="https://www.instagram.com/ewelists/" target="_blank" color="instagram">
                <i className="fab fa-instagram" />
              </Button>
            </li>
          </ul>
        </GridItem>
      </GridContainer>
      </Footer>
    </div>
  );
}

FooterLarge.propTypes = {
  classes: PropTypes.object
};

export default withStyles(footerLargeStyle)(FooterLarge);
