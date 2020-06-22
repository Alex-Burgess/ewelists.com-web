import React from 'react';
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types";

export default function Title(props) {
  const { title, environment } = props;

  const setTitle = (t) => {
    if (environment === "staging") {
      t = 'Staging - ' + t;
    } else if (environment === 'test') {
      t = 'Test - ' + t;
    } else if (environment === undefined) {
      t = 'Test - ' + t;
    }
    return t
  }

  return (
    <MetaTags>
      <title>{setTitle(title)}</title>
      <meta name="og:title" content={title} />
    </MetaTags>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  environment: PropTypes.string
};
