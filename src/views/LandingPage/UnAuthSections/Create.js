import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
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


  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={5} md={5}>
            <h1 className={classes.title}>Create your Baby Gift List</h1>
            <h4 className={classes.description}>
              Ewelists helps new and expecting parents get the gifts they
              need for their new arrival. Create a gift list, which you can
              share with friends and family, for free.
            </h4>
            <br />
            { desktop
              ? null
              : <div className={classes.imgContainer}>
                  <img src={laptop} alt="..." />
                </div>
            }
            <div className={classes.buttonContainer}>
              <Button
                color="danger"
                size="lg"
                href="/signup"
                target="_blank"
              >
                Create Your List - It's Free!
              </Button>
            </div>
          </GridItem>
          <GridItem xs={12} sm={7} md={7}>
            { desktop
              ? <div className={classes.imgContainer}>
                  <img src={laptop} alt="..." />
                </div>
              : null
            }
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
