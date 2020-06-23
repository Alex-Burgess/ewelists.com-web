import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FooterDark from "components/Footer/FooterDark.js";
import HeaderWhite from "components/Header/HeaderWhite.js";
// Sections for this page
import Create from "./Section/Create.js";
import Product from "./Section/Product.js";
import Ideas from "./Section/Ideas.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/landingPageStyle.js";
const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();

  return (
    <div>
      <HeaderWhite isAuthenticated={false} mobile={props.mobile}/>
      <div className={classes.main}>
        <Create mobile={props.mobile} />
        <Product />
        <Ideas />
      </div>
      <FooterDark />
    </div>
  );
}
