import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/Buttons/Button.js";

import styles from "assets/jss/material-kit-pro-react/views/howItWorksPage/heroStyle.js";
const useStyles = makeStyles(styles);

export default function More(props) {
  const classes = useStyles();

  return (
    <div className={classes.container} data-cy="section-learn-more">
      <GridContainer justify="center">
        <GridItem xs={12} sm={7} md={8} className={classes.textCenter + " " + classes.details}>
          <h3 className={classes.title}>
            Receive the gifts that help you
          </h3>
          <h5 className={classes.subTitle}>
            Feel prepared and in control with a wish list for all of life’s occasions
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
}
