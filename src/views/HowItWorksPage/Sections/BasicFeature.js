import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Blue from "components/Typography/Blue.js";

import styles from "assets/jss/material-kit-pro-react/views/howItWorksPage/basicFeatureStyle.js";
const useStyles = makeStyles(styles);

export default function SimpleFeature(props) {
  const classes = useStyles();
  const { title, description } = props;

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={11} md={11} lg={11} className={classes.mlAuto + " " + classes.mrAuto}>
          <div className={classes.step}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Blue>
                  <h2 className={classes.title}>
                    {title}
                  </h2>
                </Blue>
                <p className={classes.description}>
                  {description}
                </p>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SimpleFeature.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};
