import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Footer from "components/Footer/Footer.js";

import styles from "assets/jss/material-kit-pro-react/components/footer/footerStyle.js";
const useStyles = makeStyles(styles);

export default function FooterGrey(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.spacer} />
      <Footer
        theme="grey"
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/privacy">Privacy</Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/terms">Terms</Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/contact">Support</Link>
                </ListItem>
              </List>
            </div>
            <div className={classes.rightLinks}>
              <a href="/" className={classes.block}>
                &copy; {1900 + new Date().getYear()} ewelists
              </a>
            </div>
          </div>
        }
      />
    </div>
  );
}
