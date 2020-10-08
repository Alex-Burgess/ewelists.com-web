import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

export default function SectionHeadings(props) {
  const { headings } = props;

  const scrollToId = (e, target) => {
    e.preventDefault();

    var elementHeightInWindow = document.getElementById(target).getBoundingClientRect().top;
    var viewPortOffset = document.documentElement.scrollTop;
    var scrollHeight = elementHeightInWindow + viewPortOffset - 85;

    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }

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
