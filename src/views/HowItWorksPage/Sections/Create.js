import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";

import styles from "assets/jss/material-kit-pro-react/views/howItWorksPage/createStyle.js";
const useStyles = makeStyles(styles);

export default function LandingCreate(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8} className={classes.textCenter}>
          <h3 className={classes.subTitle}>
            Ready to try Ewelists?
          </h3>
          <Button size="lg" color="danger" href="/signup" data-cy="button-get-started">
            Get Started
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
