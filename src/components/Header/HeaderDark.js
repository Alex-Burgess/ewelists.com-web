import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

export default function HeaderWhite(props) {
  const { isAuthenticated, user, mobile } = props;

  return (
    <Header
      links={<HeaderLinks headerColor="dark" isAuthenticated={isAuthenticated} user={user} mobile={mobile}/>}
      fixed
      color="dark"
    />
  );
}

HeaderWhite.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  mobile: PropTypes.bool
};
