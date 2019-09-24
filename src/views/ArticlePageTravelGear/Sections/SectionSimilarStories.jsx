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
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Info from "components/Typography/Info.jsx";
import Success from "components/Typography/Success.jsx";
import Danger from "components/Typography/Danger.jsx";

import blog8 from "assets/img/examples/blog8.jpg";
import blog7 from "assets/img/examples/blog7.jpg";

import beach from "assets/img/articles/travelgear/bg-beach.jpg";

import sectionSimilarStoriesStyle from "assets/jss/material-kit-pro-react/views/articleSections/sectionSimilarStoriesStyle.jsx";

function SectionSimilarStories({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem md={12}>
            <h2 className={classes.title + " " + classes.textCenter}>
              Similar Lists
            </h2>
            <br />
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <Card blog>
                  <CardHeader image>
                    <a href="/lists/travelgear">
                      <img src={beach} className={classes.listImage} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: "url(" + beach + ")",
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                  <CardBody>
                    <Info>
                      <h6>TRAVEL</h6>
                    </Info>
                    <h4 className={classes.cardTitle}>
                      <a href="/lists/travelgear">
                        Travel Gear List
                      </a>
                    </h4>
                    <p className={classes.description}>
                      Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free.
                      <a href="/lists/travelgear"> Read Article </a>
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card blog>
                  <CardHeader image>
                    <a href="#pablo">
                      <img src={blog8} className={classes.listImage} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: "url(" + blog8 + ")",
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                  <CardBody>
                    <Success>
                      <h6>STARTUPS</h6>
                    </Success>
                    <h4 className={classes.cardTitle}>
                      <a href="#pablo">
                        Lyft launching cross-platform service this week
                      </a>
                    </h4>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a
                      company in transition. It was until recently a traditional
                      boxed software company selling licenses.
                      <a href="#pablo"> Read Article </a>
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card blog>
                  <CardHeader image>
                    <a href="#pablo">
                      <img src={blog7} className={classes.listImage} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: "url(" + blog7 + ")",
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                  <CardBody>
                    <Danger>
                      <h6>
                        <TrendingUp /> ENTERPRISE
                      </h6>
                    </Danger>
                    <h4 className={classes.cardTitle}>
                      <a href="#pablo">
                        6 insights into the French Fashion landscape
                      </a>
                    </h4>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a
                      company in transition. It was until recently a traditional
                      boxed software company selling licenses.
                      <a href="#pablo"> Read Article </a>
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionSimilarStories.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionSimilarStoriesStyle)(SectionSimilarStories);
