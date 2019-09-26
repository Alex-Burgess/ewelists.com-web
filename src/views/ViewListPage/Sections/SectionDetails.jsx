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
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// core components

import sectionDetailsStyle from "assets/jss/material-kit-pro-react/views/viewListSections/sectionDetailsStyle.jsx";

function SectionDetails({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <h1 className={classes.title}>
            Birthday List
          </h1>
          <h3 className={classes.subtitle}>
            Oscar's second birthday is coming up, so we've put a list together of a few things that he needs.
            He's growing out of quite a bit of his everyday clothing, so need to some basics for him to wear at nursery.
            He is also really enjoying some more educational toys, like duplo bricks as well as trains.
          </h3>
          <p>
            Date: 31st October 2019
          </p>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SectionDetails.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionDetailsStyle)(SectionDetails);
