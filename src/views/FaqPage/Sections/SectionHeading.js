import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/faqPageStyle.js";
const useStyles = makeStyles(styles);

export default function SectionHeading(props) {
  const { id, heading } = props;
  const classes = useStyles();

  return (
    <h2 id={id} className={classes.sectionHeading}>
      {heading}
    </h2>
  );
}

SectionHeading.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
};
