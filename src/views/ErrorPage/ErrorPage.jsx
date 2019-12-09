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
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import errorPageStyle from "assets/jss/material-kit-pro-react/views/errorPageStyles.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

class ErrorPage extends React.Component {
  returnChecked() {
    return true;
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="ewelist"
          links={<HeaderLinks dropdownHoverColor="dark" />}
          {...rest}
        />
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

        <Footer
          className={classes.footer}
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="/"
                      className={classes.block}
                    >
                      &copy; {1900 + new Date().getYear()} ewelists
                    </a>
                  </ListItem>
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
              <div className={classes.rightLinks}>
                <ul>
                  <li>
                    <Button
                      href="https://www.facebook.com/ewelists"
                      target="_blank"
                      justIcon
                      simple
                    >
                      <i className="fab fa-facebook" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://twitter.com/ewelists"
                      target="_blank"
                      justIcon
                      simple
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://www.instagram.com/ewelists/"
                      target="_blank"
                      justIcon
                      simple
                    >
                      <i className="fab fa-instagram" />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

ErrorPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(errorPageStyle)(ErrorPage);
