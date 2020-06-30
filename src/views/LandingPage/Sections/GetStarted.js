import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/getStartedStyle.js";
const useStyles = makeStyles(styles);

export default function LandingCreate(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8} className={classes.textCenter}>
          <h3 className={classes.subTitle}>
            Create your list and get organised today!
          </h3>
          <Button color="secondary" href="/signup">
            Get Started
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}

LandingCreate.propTypes = {
  mobile: PropTypes.bool
};
