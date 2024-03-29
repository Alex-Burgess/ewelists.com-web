import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { trackEvent } from 'libs/analyticsLib';
// @material-ui/icons
import List from "@material-ui/icons/List";
import Perm from "@material-ui/icons/PermIdentity";
import Group from "@material-ui/icons/Group";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import InfoArea from "./InfoArea.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/productStyle.js";
const useStyles = makeStyles(styles);

export default function LandingProduct(props) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2 className={classes.title}>How It Works</h2>
            <h5 className={classes.description}>
              Ewelists helps new and expecting parents get the gifts they need for their little ones. <br />
              Create a gift list, which you can share with friends and family, for free.
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
                iconColor="red"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                className={classes.infoArea}
                title="Add Items"
                description="Add items by copying the link to the product, or alternatively use one of our ready made lists if you're looking for inspiration."
                icon={List}
                iconColor="lightGreen"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <InfoArea
                className={classes.infoArea}
                title="Share"
                description="Share your first ewelist with friends and family."
                icon={Group}
                iconColor="yellowOrange"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.textCenter}>
              <Button size="lg" color="primary" href="/how-it-works" data-cy="button-more-details" onClick={() => { trackEvent('landing', 'button-more-details', null) }}>
                More Details
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
