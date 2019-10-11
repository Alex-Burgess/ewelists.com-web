/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// core components

import sectionTextStyle from "assets/jss/material-kit-pro-react/views/articleSections/sectionTextStyle.jsx";

function SectionText({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <h1 className={classes.title}>
            Travel Gear
          </h1>
          <h2 className={classes.subtitle}>
            Our favourite gear to make travelling with your little ones no fuss!
          </h2>
          <p>
            The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly moving around the city
            hopping on and off public transport, taking with you through the airport, or just keeping in the car as a just in case item.  We highly recommend the
            <a href="https://www.amazon.co.uk/dp/B07FBYHY7L"> Mamas & Papas Acro </a> and <a href="https://www.amazon.co.uk/dp/B07PM6ZD1C"> Micralite ProFold </a>
            compact strollers as their folded size is within cabin luggage dimensions on popular airlines. The
            <a href="https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291"> BABYZEN YOYO+ </a> is another fantastic alternative. With the
            <a href="https://www.johnlewis.com/babyzen-yoyo-newborn-pack/p3907377"> Newborn Pack </a> and other accessories it is the compact stroller that could
            even fulfill all your pushcair needs.
          </p>
          <p>
            The <a href="https://www.amazon.co.uk/dp/B07FBYHY7L"> Babybj&#0246;rn </a> travel cot has to be one of the best designed, for it's simplicity to setup and
            amazing compact packed size.  When you need to get your cot setup fast for the little one to go to sleep, this is the one I'd want to use, it's the quickest
            to setup of any i've used! The <a href="https://www.amazon.co.uk/dp/B07FBYHY7L"> Micralite </a> is a similar design, although it's packed size is a little
            bulkier, but the new born insert and zipped pannel make it more versatile.
          </p>
          <p>
            There are often situations where it's just more practical to use a baby carrier.  The
            <a href="https://www.amazon.co.uk/dp/B07937WXKD"> Babybj&#0246;rn Baby Carrier One Air</a> is another fantastic product from Babybj&#0246;rn that is simple
            and comfortable to use. As your little one outgrows it's first carrier, the <a href="https://www.amazon.co.uk/dp/B0792Y5L7K"> LittleLife Ranger S2 </a> is a
            great way to keep carrying them.  For a back carrier, it's incredibly light, which all helps, whether you're exploring on holiday or walking the dog back home.
          </p>
          <p>
            Whether you're getting away for the weekend, or a couple of weeks on holiday, it's great to know that your little one is always going to be able to
            comfortably and safely enjoy meal time.  For the younger ones, the <a href="https://www.amazon.co.uk/dp/B0019AC8GE"> Phil and Teds Lobster </a> is perfect.
            For those a little bigger, the <a href="https://www.amazon.co.uk/dp/B01M6XGKV1"> Munchkin Booster Seat </a> is super versatile and will get years of use.
          </p>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SectionText.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionTextStyle)(SectionText);