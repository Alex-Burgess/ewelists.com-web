import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import sheeptoy from "assets/img/sheep-toy1.jpg";

import styles from "assets/jss/custom/views/landingPage/createStyle.js";
const useStyles = makeStyles(styles);

export default function LandingCreate(props) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <h1 className={classes.title}>Create your Baby Gift List</h1>
            <h4 className={classes.description}>
              Ewelists helps new and expecting parents get the gifts they
              need for their new arrival. Create a gift list, which you can
              share with friends and family, for free.
            </h4>
            <br />
            <Button
              color="danger"
              size="lg"
              href="/signup"
              target="_blank"
            >
              Create Your List - It's Free!
            </Button>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <div className={classes.sheepContainer}>
              <img src={sheeptoy} alt="..." />
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
