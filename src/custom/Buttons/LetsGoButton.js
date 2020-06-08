import React from 'react';
import { Auth } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";


import styles from "assets/jss/custom/views/authPageStyle.js";
const useStyles = makeStyles(styles);

export default function LetsGoButton(props) {
  const classes = useStyles();

  return (
      <Button color="info" onClick={() => Auth.federatedSignIn({provider: 'Google'})} className={classes.buttonSizes}>
        Get Started
      </Button>
  );
}


LetsGoButton.propTypes = {
  account: PropTypes.oneOf([
    "Google",
    "Facebook"
  ]),
};
