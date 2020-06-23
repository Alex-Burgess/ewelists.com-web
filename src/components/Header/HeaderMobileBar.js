import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import Header from "components/Header/Header.js";
import HeaderDark from "components/Header/HeaderDark.js";

export default function HeaderMobileBar(props) {
  const { url, title, user, mobile, isAuthenticated } = props;

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
        : <HeaderDark isAuthenticated={isAuthenticated} user={user} mobile={mobile} />
      }
    </div>
  );
}

HeaderMobileBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.object,
  mobile: PropTypes.bool
};
