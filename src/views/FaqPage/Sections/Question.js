import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/faqPageStyle.js";
const useStyles = makeStyles(styles);

export default function SectionQuestion(props) {
  const { id, name, text } = props;
  const classes = useStyles();

  return (
    <div>
      <h3 className={classes.heading} id={id}>
        {name}
      </h3>
      <hr className={classes.headingLine}/>
      <p className={classes.paragraph}>
        {text[0]}
      </p>
    </div>
  );
}

SectionQuestion.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.array
};
