import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { scrollToId } from "components/Scroll/ScrollToId";

export default function SectionHeadings(props) {
  const { headings } = props;

  return (
    <div>
      Skip to section:
      <ul>
        {headings.map((heading, key) =>
          <li key={key}>
            <a href={"#" + heading.name} onClick={e => scrollToId(e, heading.name)}> {heading.text} </a>
          </li>
        )}
      </ul>
    </div>
  );
}

SectionHeadings.propTypes = {
  headings: PropTypes.array,
};
