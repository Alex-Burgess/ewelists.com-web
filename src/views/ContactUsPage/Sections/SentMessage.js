import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/custom/views/contactUsCustomStyle.js";
const useStyles = makeStyles(styles);

export default function SentMessage(props) {
  const classes = useStyles();
  const { name } = props;

  return (
    <div className={classes.sent}>
      <p>
        Thank you for your message {name}.  We will get back to you by email.
      </p>
    </div>
  )
}

SentMessage.propTypes = {
  name: PropTypes.string.isRequired
};
