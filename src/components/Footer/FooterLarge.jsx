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

import face1 from "assets/img/faces/card-profile6-square.jpg";
// import face2 from "assets/img/faces/christian.jpg";
// import face3 from "assets/img/faces/card-profile4-square.jpg";
// import face4 from "assets/img/faces/card-profile1-square.jpg";
// import face5 from "assets/img/faces/marc.jpg";
// import face6 from "assets/img/faces/kendall.jpg";
// import face7 from "assets/img/faces/card-profile5-square.jpg";
// import face8 from "assets/img/faces/card-profile2-square.jpg";


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
          <h5 id="about">About Us</h5>
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
          <h5>Social Feed</h5>
          <div className={classes.socialFeed}>
            <div>
              <i className="fab fa-twitter" />
              <p>How to handle ethical disagreements with your clients.</p>
            </div>
            <div>
              <i className="fab fa-twitter" />
              <p>The tangible benefits of designing at 1x pixel density.</p>
            </div>
            <div>
              <i className="fab fa-facebook-square" />
              <p>
                A collection of 25 stunning sites that you can use for
                inspiration.
              </p>
            </div>
          </div>
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
