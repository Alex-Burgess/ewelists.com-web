import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FooterDark from "components/Footer/FooterDark.js";
import HeaderWhite from "components/Header/HeaderWhite.js";
// Sections for this page
import Hero from "./Sections/Hero.js";
import Product from "./Sections/Product.js";
import Ideas from "./Sections/Ideas.js";
import LearnMore from "./Sections/LearnMore.js";
import GetStarted from "./Sections/GetStarted.js";
import Benefits from "./Sections/Benefits.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/landingPageStyle.js";
const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();

  return (
    <div>
      <HeaderWhite isAuthenticated={false} mobile={props.mobile} tablet={props.tablet}/>
      <div className={classes.main}>
        <Hero mobile={props.mobile} />
        <LearnMore mobile={props.mobile}/>
        <Benefits />
        <Product />
        <Ideas />
        <GetStarted />
      </div>
      <FooterDark />
    </div>
  );
}
