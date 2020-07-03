import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderWhite from "components/Header/HeaderWhite.js";
import Footer from "components/Footer/FooterGrey.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Small from "components/Typography/Small.js";
import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/views/aboutPageStyle.js";
const useStyles = makeStyles(styles);

const fiveHatsImg = config.imagePrefix + "/images/about-mascot.svg";

export default function AboutPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <HeaderWhite isAuthenticated={props.isAuthenticated} user={props.user} mobile={props.mobile} />
      <div className={classes.container}>
        <GridContainer justify="center2">
          <GridItem xs={12} sm={12} md={7}>
            <h2 className={classes.title}>About Ewelists
              <br />
              <Small>
                It all started with 5 hats...
              </Small>
            </h2>
            <div>
              <p className={classes.paragraph}>
                The arrival of our son brought about a gift giving frenzy and we were completely overwhelmed by the
                generosity of our friends and family. As the first Christmas approached we diligently responded to
                requests for gift ideas and sent our list to each person that asked. Our son received 5 woolly hats that
                year. One for every outfit? Yes. Necessary? Probably not!
              </p>
              <p className={classes.paragraph}>
                And so the idea for ewelists was born, "you list" the gift your little ones needs and share it with family
                and friends. Our goal is simple, to help parents share the gifts they need and make the joy of gifting fun
                and easy.
              </p>
            </div>
            <h2 className={classes.quote}>
              <Small>
                Add products from any store.
              </Small>
            </h2>
            <div>
              <p className={classes.paragraph}>
                Ewelists helps parents get the gifts they need for their little ones. You can create a list with products
                from any store and allow your fiends and family to chose the gift they would like to give. Managing your
                list is easy and everyone will be able to see what has already been bought.
              </p>
              <p className={classes.paragraph}>
                We understand that there are so many choices these days on what to buy. We love well designed products
                that give value for money and we hope to inspire you with our guides and lists of favourite products.
              </p>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <div className={classes.imgContainer}>
              <img src={fiveHatsImg} alt="..." />
            </div>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.flexer} />
      <Footer />
    </div>
  );
}