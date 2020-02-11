import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import FooterTransparent from "custom/Footer/FooterTransparent.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/resetPasswordPageStyle.js";
const useStyles = makeStyles(styles);

const image = config.imagePrefix + "/images/sheep-with-shoes.jpg";

export default function SuccessMessage(props) {
  const classes = useStyles();

  return (
    <div>
      <HeaderTransparent isAuthenticated={false} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Password Reset Complete</h2>
                <CardBody className={classes.textCenter}>
                  <div id="successMessage" className={classes.details}>
                    <p>Your password has been reset.</p>
                    <p>
                      <a href="/login" className={classes.link}>Login with your new credentials</a>
                    </p>
                  </div>

                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <FooterTransparent />
      </div>
    </div>
  );
}
