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
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import createStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/createStyle.jsx";

import sheeptoy from "assets/img/sheep-toy1.jpg";

class LandingCreate extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <h1 className={classes.title}>Create your Baby Gift List</h1>
              <h4 className={classes.description}>
                Ewelists helps new and expecting parents get the gifts they
                need for their new arrival. Create a gift list, which you can
                share with friends and family, for free.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="/create"
                target="_blank"
              >
                Create Your List - It's Free!
              </Button>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <div className={classes.sheepContainer}>
                <img src={sheeptoy} alt="..." />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LandingCreate.propTypes = {
  classes: PropTypes.object
};

export default withStyles(createStyle)(LandingCreate);
