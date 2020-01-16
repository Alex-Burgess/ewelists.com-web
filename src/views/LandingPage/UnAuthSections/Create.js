import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowDownward from "@material-ui/icons/ArrowDownward";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import laptop from "assets/img/laptop-mockup.png";
// import sheeptoy from "assets/img/sheep-toy1.jpg";

import styles from "assets/jss/custom/views/landingPage/createStyle.js";
const useStyles = makeStyles(styles);

export default function LandingCreate(props) {
  const classes = useStyles();

  const [desktop, setDesktop] = useState(true);

  useEffect( () => {
    function updateDimensions() {
      if (window.innerWidth < 600){
        setDesktop(false);
      } else {
        setDesktop(true);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  const scrollToExplore = (id) => {
    if (! desktop) {
      window.scrollTo({ top: 620, behavior: 'smooth' })
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
              <img src={laptop} alt="..." />
            </div>
            { desktop
              ? null
              : <div className={classes.downButton}>
                  <Button justIcon round onClick={() => scrollToExplore()}>
                    <ArrowDownward />
                  </Button>
                </div>
            }
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
