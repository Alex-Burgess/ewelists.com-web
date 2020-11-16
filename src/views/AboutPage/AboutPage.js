import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// libs
import {imageUrl} from 'libs/imageLib.js';
// core components
import HeaderWhite from "components/Header/HeaderWhite.js";
import Footer from "components/Footer/FooterGrey.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-pro-react/views/aboutPageStyle.js";
const useStyles = makeStyles(styles);

const about = "about-1.svg";

export default function AboutPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <HeaderWhite />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={9} md={9} lg={9}>
            <h1 className={classes.title}>
              About Ewelists
            </h1>
            <h3 className={classes.subtitle}>
              It all started one Christmas with 5 hats...
            </h3>
            <div
              className={classes.image}
              style={{ backgroundImage: "url(" + imageUrl(about) + ")" }}
            />
            <div>
              <h3 className={classes.heading}>
                How things started
              </h3>
              <p className={classes.paragraph}>
                As a couple, we’ve always strived to make life simpler, trying to find ways of doing things more
                efficiently or finding products designed to do just that. We like nice things, it gives us joy in life,
                but we want good value, and we hate to see things go to waste.
              </p>
              <p className={classes.paragraph}>
                When we became parents, we were overwhelmed by how much stuff there was for children, but we were even
                more overwhelmed by the generosity of our friends and family wanting to celebrate with gifts. The thing
                is, we spotted a growing trend. Either our loved ones all had the same wonderful gift idea or quite the
                opposite, and they needed us to give them ideas about what to get.
              </p>
              <p className={classes.paragraph}>
                It was our son’s second Christmas, when he received five woolly hats, that the lightbulb moment struck!
                We knew there had to be a better way, something to help our friends and family know what our son needed
                and liked, but also gave them a choice about what they wanted to gift. We decided to do something about
                it, and so the journey of Ewelists began.
              </p>
            </div>
            <div>
              <h3 className={classes.heading}>
                What we stand for
              </h3>
              <p className={classes.paragraph}>
                We’re passionate about making parenting simpler. We believe well-designed products that do their job are
                worth their weight in gold. But we also know that not every product suits every lifestyle.
              </p>
              <p className={classes.paragraph}>
                We’ve seen first hand the excess of unwanted or unpractical gifts, and we want to do something about it.
                We’re not here to tell you what you must buy, but we do hope to inspire and help you choose the products
                that work for you. 
              </p>
            </div>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.flexer} />
      <Footer />
    </div>
  );
}
