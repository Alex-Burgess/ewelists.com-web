import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
// core components


import styles from "assets/jss/material-kit-pro-react/views/reservedPageStyle.js";
const useStyles = makeStyles(styles);

export default function Message(props) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <h3 className={classes.title + " " + classes.sectionHeading}><Chat className={classes.icon}/> Send Message</h3>
      <p className={classes.shortText}>
        Send a message to Person:
      </p>
      <hr />
    </div>
  );
}
