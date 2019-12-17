import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/custom/components/footerTransparentStyle.js";
const useStyles = makeStyles(styles);

export default function FooterTransparent(props) {
  const classes = useStyles();

  return (
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
  );
}
