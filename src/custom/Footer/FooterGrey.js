import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Footer from "components/Footer/Footer.js";

import styles from "assets/jss/custom/components/footerGreyStyle.js";
const useStyles = makeStyles(styles);

export default function FooterGrey(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.spacer} />
      <Footer
        className={classes.footer}
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a href="/privacy" className={classes.block}>
                    Privacy
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="/terms" className={classes.block}>
                    Terms
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="/contact"  className={classes.block}>
                    Support
                  </a>
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
