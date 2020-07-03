import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import Blue from "components/Typography/Blue.js";

import config from 'config.js';

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
      <div className={classes.benefit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Blue>
              <h2>
                Feel confident that everything is organised
              </h2>
            </Blue>
            <p className={classes.description}>
              Ewelists is the perfect tool to organise everything that you need.
              It{"'"}s easy to create a list, add items and track what has been bought so far.
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            {renderImg('newborn-baby-essentials-list')}
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  const renderBenefit2 = () => {
    return (
      <div className={classes.benefit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            {renderImg('newborn-baby-essentials-list')}
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <Blue>
              <h2>
                Get the gifts chosed by you
              </h2>
            </Blue>
            <p className={classes.description}>
              There are no limits to what items you can add to your list. Y
              ou can items from any store, in the color and style to suite your taste.
            </p>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  const renderBenefit3 = () => {
    return (
      <div className={classes.benefit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Blue>
              <h2>
                Make it easy for your friends and family to know what you need
              </h2>
            </Blue>
            <p className={classes.description}>
              Easily share your list with friends and family who make be wondering what gifts to get.
              You can also add specific details such as
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            {renderImg('newborn-baby-essentials-list')}
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
          {renderBenefit1()}
          {renderBenefit2()}
          {renderBenefit3()}
        </GridItem>
      </GridContainer>
    </div>
  );
}
