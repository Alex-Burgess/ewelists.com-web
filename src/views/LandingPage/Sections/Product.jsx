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
import List from "@material-ui/icons/List";
import Perm from "@material-ui/icons/PermIdentity";
import Group from "@material-ui/icons/Group";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/custom/views/landingPage/productStyle.jsx";

class LandingProduct extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section + " " + classes.sectionGray}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={8}>
              <h2 className={classes.title}>Get organised with Ewelists</h2>
              <h5 className={classes.description}>
                Create your first Ewelist with the things you know you want, or just the essentials.
              </h5>
            </GridItem>
          </GridContainer>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  className={classes.infoArea}
                  title="Sign Up"
                  description="Sign up using one of your social accounts, or alternatively just an email, to create your first list."
                  icon={Perm}
                  iconColor="primary"
                  vertical
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  className={classes.infoArea}
                  title="Add Items"
                  description="Add items by copying the link to the product, or alternatively use one of our ready made lists if you're looking for inspiration."
                  icon={List}
                  iconColor="rose"
                  vertical
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <InfoArea
                  className={classes.infoArea}
                  title="Share"
                  description="Share your first ewelist with friends and family."
                  icon={Group}
                  iconColor="info"
                  vertical
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

LandingProduct.propTypes = {
  classes: PropTypes.object
};

export default withStyles(productStyle)(LandingProduct);
