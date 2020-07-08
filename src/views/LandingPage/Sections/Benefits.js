import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Blue from "components/Typography/Blue.js";
import config from 'config.js';

import landing1 from "assets/img/landing-1.png";
import landing2 from "assets/img/landing-2.png";
import landing3 from "assets/img/landing-3.png";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/benefitsStyle.js";
const useStyles = makeStyles(styles);

export default function Benefits(props) {
  const classes = useStyles();

  const renderImg = (img) => {
    return (
      <CardHeader image plain>
        <picture>
          <source type="image/webp" srcSet={config.imagePrefix + '/images/' + img + '.webp'} />
          <source type="image/jpeg" srcSet={config.imagePrefix + '/images/' + img + '.jpg'} />
          <img src={config.imagePrefix + '/images/' + img + '.jpg'} className={classes.image + " " + classes.imageDesktop} alt="..." />
        </picture>
      </CardHeader>
    )
  }

  const renderBenefit1 = () => {
    return (
      <div
        className={classes.benefit}
      >
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Blue>
              <h2 className={classes.title}>
                Feel confident that everything is organised
              </h2>
            </Blue>
            <p className={classes.description}>
              Ewelists is the perfect tool to organise everything that you need.
              It{"'"}s easy to create a list, add items and track what has been bought.
            </p>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <div
              className={classes.image + " " + classes.image1}
              style={{ backgroundImage: `url(${landing1})` }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  const renderBenefit2 = () => {
    return (
      <div
        className={classes.benefit}
      >
        <GridContainer justify="flex-end">
          <GridItem xs={12} sm={6} md={6}>
            <div
              className={classes.image + " " + classes.image2}
              style={{ backgroundImage: `url(${landing2})` }}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} className={classes.rightText}>
            <Blue>
              <h2 className={classes.title}>
                Get the gifts chosen by you
              </h2>
            </Blue>
            <p className={classes.description}>
              You can add items from any store. So if you have specific styles, brands or a special gift in mind you can add it to your list.
            </p>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <div
              className={classes.image + " " + classes.imageMob2}
              style={{ backgroundImage: `url(${landing2})` }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  const renderBenefit3 = () => {
    return (
      <div
        className={classes.benefit}
      >
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Blue>
              <h2 className={classes.title}>
                Make it easy for family and friends
              </h2>
            </Blue>
            <p className={classes.description}>
              Easily share your list with family or friends, who may be wondering what to get.
              Helping them to know what colour or size you need, will save you the trouble of organising exchanges.
            </p>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${landing3})` }}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={11} md={11} lg={11} className={classes.mlAuto + " " + classes.mrAuto}>
          {renderBenefit1()}
          {renderBenefit2()}
          {renderBenefit3()}
        </GridItem>
      </GridContainer>
    </div>
  );
}
