import React from 'react';
import Carousel from "react-slick";
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

import styles from "assets/jss/material-kit-pro-react/views/howItWorksPage/carouselFeatureStyle.js";
const useStyles = makeStyles(styles);

export default function CarouselFeature(props) {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };

  const { title, description, stepOneTitle, imageOne, stepTwoTitle, imageTwo, stepThreeTitle, imageThree } = props;

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={11} md={11} lg={11} className={classes.mlAuto + " " + classes.mrAuto}>
          <div className={classes.benefit}>
            <GridContainer alignItems="center">
              <GridItem xs={12} sm={6} md={6} className={classes.leftText}>
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
                  <Carousel {...settings}>
                    {/* Carousel 1 START */}
                    <div>
                      <div className={classes.stepDetails}>
                        <props.stepOneIcon className={classes.icon} />
                        <h3 className={classes.stepTitle}>{stepOneTitle}</h3>
                      </div>
                      <div className={classes.imageContainer}>
                        <img src={imageUrl(imageOne)} className={classes.image} alt=".." />
                      </div>
                    </div>
                    {/* Carousel 1 END */}
                    {/* Carousel 2 START */}
                    <div>
                      <div className={classes.stepDetails}>
                        <props.stepTwoIcon className={classes.icon} />
                        <h3 className={classes.stepTitle}>{stepTwoTitle}</h3>
                      </div>
                      <div className={classes.imageContainer}>
                        <img src={imageUrl(imageTwo)} className={classes.image} alt=".." />
                      </div>
                    </div>
                    {/* Carousel 2 END */}
                    {/* Carousel 3 START */}
                    <div>
                      <div className={classes.stepDetails}>
                        <props.stepThreeIcon className={classes.icon} />
                        <h3 className={classes.stepTitle}>{stepThreeTitle}</h3>
                      </div>
                      <div className={classes.imageContainer}>
                        <img src={imageUrl(imageThree)} className={classes.image} alt=".." />
                      </div>
                    </div>
                    {/* Carousel 3 END */}
                  </Carousel>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6} md={6} className={classes.rightText}>
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

CarouselFeature.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  stepOneTitle: PropTypes.string,
  imageOne: PropTypes.string,
  stepTwoTitle: PropTypes.string,
  imageTwo: PropTypes.string,
  stepThreeTitle: PropTypes.string,
  imageThree: PropTypes.string
};
