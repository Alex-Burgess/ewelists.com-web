import React from 'react';
import { Auth } from "aws-amplify";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";


import styles from "assets/jss/custom/views/authPageStyle.js";
const useStyles = makeStyles(styles);

export default function SocialButtons(props) {
  const classes = useStyles();

  return (
    <Button color="clear" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})} className={classes.buttonSizes}>
      <div className={classes.facebook + " " + classes.icon}>
        <i className="fab fa-facebook" />
      </div> Continue with Facebook
    </Button>
  );
}
