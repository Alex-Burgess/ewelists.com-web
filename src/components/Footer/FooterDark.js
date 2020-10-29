import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/Buttons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-pro-react/components/footer/footerStyle.js";
const useStyles = makeStyles(styles);

export default function FooterDark(props) {
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
      <div>
        <GridContainer>
          <GridItem xs={12} sm={3} md={8}>
            <h5>Join Us</h5>
            <p>
              Join us and other parents who believe in making parenting simpler.
            </p>
            <ul className={classes.socialButtons}>
              <li>
                <Button justIcon simple href="https://www.facebook.com/ewelists" target="_blank" color="facebook" data-cy="footer-dark-link-facebook">
                  <i className="fab fa-facebook-square" />
                </Button>
              </li>
              <li>
                <Button justIcon simple href="https://www.instagram.com/ewelists/" target="_blank" color="instagram" data-cy="footer-dark-link-instagram">
                  <i className="fab fa-instagram" />
                </Button>
              </li>
            </ul>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <h5>About</h5>
            <ul>
              <li>
                <Link to="/about" data-cy="footer-dark-link-about">About Us</Link>
              </li>
              <li>
                <Link to="/how-it-works" data-cy="footer-dark-link-how">How It Works</Link>
              </li>
              <li>
                <Link to="/contact" data-cy="footer-dark-link-contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/list-ideas" data-cy="footer-dark-link-ideas">Inspiration</Link>
              </li>
            </ul>
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            <h5>Legal</h5>
            <ul>
              <li>
                <Link to="/privacy" data-cy="footer-dark-link-privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" data-cy="footer-dark-link-terms">Terms</Link>
              </li>
              <li>
                <Link to="/cookies" data-cy="footer-dark-link-cookies">Cookies</Link>
              </li>
            </ul>
          </GridItem>
        </GridContainer>
      </div>
      </Footer>
    </div>
  );
}
