import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import List from "@material-ui/icons/List";
import Perm from "@material-ui/icons/PermIdentity";
import Group from "@material-ui/icons/Group";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/custom/views/landingPage/productStyle.js";
const useStyles = makeStyles(styles);

export default function LandingProduct(props) {
  const classes = useStyles();

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
