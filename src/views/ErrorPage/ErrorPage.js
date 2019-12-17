import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import FooterTransparent from "custom/Footer/FooterTransparent.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import image from "assets/img/sheep-with-shoes.jpg";

import styles from "assets/jss/custom/views/errorPageCustomStyle.js";
const useStyles = makeStyles(styles);

export default function ErrorPage(props) {
  const classes = useStyles();
  return (
    <div>
      <HeaderTransparent isAuthenticated={props.isAuthenticated} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.contentCenter}>
          <GridContainer>
            <GridItem md={12}>
              <h1 className={classes.title}>Page not found</h1>
              <h2 className={classes.subTitle}>The page you are looking for does not exist.</h2>
              <a href="/">Click to go back to the home page.</a>
            </GridItem>
          </GridContainer>
        </div>
      </div>

      <FooterTransparent />
    </div>
  );
}
