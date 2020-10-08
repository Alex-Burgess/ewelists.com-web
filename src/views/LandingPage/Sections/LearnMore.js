import React from 'react';
// libs
import { useAppContext } from "libs/contextLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/learnMoreStyle.js";
const useStyles = makeStyles(styles);

export default function LearnMore(props) {
  const classes = useStyles();
  const { mobile } = useAppContext();

  const scrollPage = () => {
    if (mobile) {
      window.scrollTo({ top: 820, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 790, behavior: 'smooth' })
    }
  }

  return (
    <div className={classes.container} data-cy="section-learn-more">
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8} className={classes.textCenter}>
          <h3 className={classes.subTitle}>
            Share your gift ideas with ewelists.  It's simple to use and it's free!
          </h3>
          <Button color="primary" onClick={() => scrollPage()} data-cy="learn-more-button">
            Learn More
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
