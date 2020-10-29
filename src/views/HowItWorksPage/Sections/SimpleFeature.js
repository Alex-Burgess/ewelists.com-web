import React from 'react';
// libs
import {imageUrl} from 'libs/imageLib.js';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Blue from "components/Typography/Blue.js";

import styles from "assets/jss/material-kit-pro-react/views/howItWorksPage/simpleFeatureStyle.js";
const useStyles = makeStyles(styles);

export default function SimpleFeature(props) {
  const classes = useStyles();
  const { image, title, description, stepTitle } = props;

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={11} md={11} lg={11} className={classes.mlAuto + " " + classes.mrAuto}>
          <div className={classes.step}>
            <GridContainer alignItems="center">
              <GridItem xs={12} sm={6} md={6}>
                <Blue>
                  <h2 className={classes.title}>
                    {title}
                  </h2>
                </Blue>
                <p className={classes.description}>
                  {description}
                </p>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <div className={classes.stepContainer}>
                  <div className={classes.stepDetails}>
                    <props.stepIcon className={classes.icon} />
                    <h3 className={classes.stepTitle}>{stepTitle}</h3>
                  </div>
                  <div className={classes.imageContainer}>
                    <img src={imageUrl(image)} className={classes.image} alt=".." />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SimpleFeature.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  stepTitle: PropTypes.string
};
