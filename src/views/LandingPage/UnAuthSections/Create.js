import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowDownward from "@material-ui/icons/ArrowDownward";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/landingPage/createStyle.js";
const useStyles = makeStyles(styles);

const laptopImg = config.imagePrefix + "/images/laptop-mockup";

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
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={5} md={5}>
            <h1 className={classes.title}>The gift list tool for your new arrivals baby shower, birthday or christmas.</h1>
            <br />
            <div className={classes.buttonContainer}>
              <Button color="danger" size="lg" href="/signup">
                Create Your List - It's Free!
              </Button>
              <Button color="info" size="lg" onClick={() => scrollToExplore()}>
                Explore Ewelists
              </Button>
            </div>
          </GridItem>
          <GridItem xs={12} sm={7} md={7}>
            <div className={classes.imgContainer}>
              <picture>
                <source type="image/webp" srcSet={laptopImg + '.webp'} />
                <source type="image/jpeg" srcSet={laptopImg + '.jpg'} />
                <img src={laptopImg + '.jpg'} alt="..." />
              </picture>
            </div>
            { mobile
              ? <div className={classes.downButton}>
                  <Button justIcon round onClick={() => scrollToExplore()}>
                    <ArrowDownward />
                  </Button>
                </div>
              : null
            }
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

LandingCreate.propTypes = {
  mobile: PropTypes.bool
};
