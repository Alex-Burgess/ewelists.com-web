import React from 'react';
// libs
import {imageSize} from 'libs/imageLib.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/heroStyle.js";
const useStyles = makeStyles(styles);

const image = "landing-cot";

export default function Hero(props) {
  const classes = useStyles();

  return (
    <div className={classes.section} data-cy="section-hero">
      <div
        className={classes.image}
        style={{
          backgroundImage: "url(" + imageSize(image) + ")",
        }}
      >
        <GridContainer className={classes.createContainer} justify="center">
          <GridItem xs={12} sm={7} md={10} className={classes.centerText}>
            <h1 className={classes.title}>The Gift List Tool For Parents</h1>
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
