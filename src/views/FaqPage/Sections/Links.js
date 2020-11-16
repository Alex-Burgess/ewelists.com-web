import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/faqPageStyle.js";
const useStyles = makeStyles(styles);

export default function SectionLinks(props) {
  const classes = useStyles();
  const { headings } = props;

  const scrollToId = (e, target) => {
    e.preventDefault();

    var elementHeightInWindow = document.getElementById(target).getBoundingClientRect().top;
    var viewPortOffset = document.documentElement.scrollTop;
    var scrollHeight = elementHeightInWindow + viewPortOffset - 85;

    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }

  return (
    <ul>
      {headings.map((heading, key) =>
        <li key={key}>
          <a href={"#" + heading.id} onClick={e => scrollToId(e, heading.id)}> {heading.name} </a>
          <ul className={classes.list}>
            {heading.subheadings.map((subheading, key) =>
              <li key={key}>
                <a href={"#" + subheading.id} onClick={e => scrollToId(e, subheading.id)}> {subheading.name} </a>
              </li>
            )}
          </ul>
        </li>
      )}
    </ul>
  );
}

SectionLinks.propTypes = {
  headings: PropTypes.array
};
