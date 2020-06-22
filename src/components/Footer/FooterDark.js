import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/Buttons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-pro-react/components/footer/footerDarkStyle.js";
const useStyles = makeStyles(styles);

export default function FooterLarge(props) {
  const classes = useStyles();

  return (
    <div>
      <Footer
        theme="dark"
        content={
          <div className={classes.right}>
            &copy; {1900 + new Date().getYear()} ewelists
          </div>
        }
      >
      <div className={classes.footer}>
        <GridContainer>
          <GridItem xs={12} sm={3} md={8}>
            <a href="#pablo">
              <h5>Join Us</h5>
            </a>
            <p>
              Join us and other parents who believe in making parenting simpler.
            </p>
            <ul className={classes.socialButtons}>
              <li>
                <Button justIcon simple href="https://www.facebook.com/ewelists" target="_blank" color="facebook">
                  <i className="fab fa-facebook-square" />
                </Button>
              </li>
              <li>
                <Button justIcon simple href="https://www.instagram.com/ewelists/" target="_blank" color="instagram">
                  <i className="fab fa-instagram" />
                </Button>
              </li>
            </ul>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <h5>About</h5>
            <ul>
              <li>
                <Link to="/list-ideas">Blog</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <h5>Legal</h5>
            <ul>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
          </GridItem>
        </GridContainer>
      </div>
      </Footer>
    </div>
  );
}
