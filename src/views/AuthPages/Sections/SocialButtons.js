import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GoogleAuthButton from "custom/Buttons/GoogleAuthButton.js"
import FacebookAuthButton from "custom/Buttons/FacebookAuthButton.js"

import styles from "assets/jss/custom/views/authPageStyle.js";
const useStyles = makeStyles(styles);

export default function SocialButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <GoogleAuthButton />
      <FacebookAuthButton />
      <div className={classes.seperatorLine}>
        <div className={classes.seperatorText}>OR</div>
      </div>
    </div>
  );
}
