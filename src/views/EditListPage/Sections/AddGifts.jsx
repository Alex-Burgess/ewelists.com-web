/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons

// core components

import styles from "assets/jss/material-kit-pro-react/views/editListSections/addGiftsStyle.jsx";


class SectionAddGifts extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          Url search
        </div>
      </div>
    );
  }
}

SectionAddGifts.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SectionAddGifts);
