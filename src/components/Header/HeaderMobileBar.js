import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// libs
import { useAppContext } from "libs/contextLib";
// core components
import Header from "components/Header/Header.js";
import HeaderDark from "components/Header/HeaderDark.js";

export default function HeaderMobileBar(props) {
  const { mobile } = useAppContext();

  const { url, title } = props;

  return (
    <div>
      {mobile
        ? <Header
            fixed
            color="dark"
            mobileBar
            title={title}
            url={url}
          />
        : <HeaderDark />
      }
    </div>
  );
}

HeaderMobileBar.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string
};
