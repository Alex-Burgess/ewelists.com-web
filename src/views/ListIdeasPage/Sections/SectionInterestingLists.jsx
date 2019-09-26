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
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import blog6 from "assets/img/examples/blog6.jpg";

import beach from "assets/img/articles/travelgear/bg-beach.jpg";
import hospitalbag from "assets/img/articles/hospitalbag/bg-packing.jpg";

import sectionInterestingListsStyle from "assets/jss/material-kit-pro-react/views/listIdeasSections/sectionInterestingListsStyle.jsx";

function SectionInterested({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <h3 className={classes.title + " " + classes.textCenter}>
        You may also be interested in
      </h3>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card plain blog>
            <CardHeader image plain>
              <a href="/listideas/travelgear">
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
            <CardBody plain>
              <h4 className={classes.cardTitle}>
                <a href="/listideas/travelgear">
                  Travel Gear
                </a>
              </h4>
              <p className={classes.description}>
                Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free.
                <a href="/listideas/travelgear" className={classes.link}> Read Article </a>
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card plain blog>
            <CardHeader plain image>
              <a href="/listideas/hospitalbag">
                <img src={hospitalbag} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: "url(" + hospitalbag + ")",
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody plain>
              <h4 className={classes.cardTitle}>
                <a href="/listideas/hospitalbag">
                  Hospital Bag
                </a>
              </h4>
              <p className={classes.description}>
                Make sure you're all set with everything you need for the all important hospital bag.
                <a href="/listideas/hospitalbag" className={classes.link}> Read Article </a>
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
          <Card plain blog>
            <CardHeader plain image>
              <a href="/listideas/nursery">
                <img src={blog6} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: "url(" + blog6 + ")",
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody plain>
              <h4 className={classes.cardTitle}>
                <a href="/listideas/nursery">
                  6 insights into the French Fashion landscape
                </a>
              </h4>
              <p className={classes.description}>
                Like so many organizations these days, Autodesk is a company in
                transition. It was until recently a traditional boxed software
                company selling licenses.
                <a href="/listideas/nursery" className={classes.link}> Read Article </a>
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SectionInterested.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionInterestingListsStyle)(SectionInterested);
