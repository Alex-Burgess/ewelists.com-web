import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// libs
import {imageSize} from 'libs/imageLib.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowDownward from "@material-ui/icons/ArrowDownward";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/views/landingPage/heroStyle.js";
const useStyles = makeStyles(styles);

const image = "/images/landing-cot";

export default function LandingCreate(props) {
  const classes = useStyles();
  const { mobile } = props;

  const scrollToExplore = (id) => {
    if (mobile) {
      window.scrollTo({ top: 620, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 520, behavior: 'smooth' })
    }
  }

  return (
    <div className={classes.section}>
      <div
        className={classes.image}
        style={{
          backgroundImage: "url(" + imageSize(image) + ")",
        }}
      >
        <GridContainer className={classes.createContainer} justify="center">
          <GridItem xs={12} sm={7} md={10} className={classes.centerText}>
            <h1 className={classes.title}>The gift list tool for parents</h1>
            <br />
            <div className={classes.buttonContainer}>
              <Button color="transparent_white" size="lg" href="/signup">
                Create Your List
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

LandingCreate.propTypes = {
  mobile: PropTypes.bool
};
