import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/articlePages/listArticleStyle.js";
const useStyles = makeStyles(styles);

export default function SectionHeading(props) {
  const { name, text } = props;
  const classes = useStyles();

  return (
    <h3 id={name} className={classes.sectionTitle}>
      {text}
    </h3>
  );
}

SectionHeading.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
};
