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
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Info from "components/Typography/Info.jsx";
import Danger from "components/Typography/Danger.jsx";

import office2 from "assets/img/examples/office2.jpg";
import blog8 from "assets/img/examples/blog8.jpg";
import cardProject6 from "assets/img/examples/card-project6.jpg";

import beach from "assets/img/article/travelgear/bg-beach.jpg";

import sectionPillsStyle from "assets/jss/material-kit-pro-react/views/listIdeasSections/sectionRecentListsStyle.jsx";

function SectionPills({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
          <Card plain blog className={classes.card}>
            <GridContainer>
              <GridItem xs={12} sm={5} md={5}>
                <CardHeader image plain>
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    <img src={beach} className={classes.listImage} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${beach})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </GridItem>
              <GridItem xs={12} sm={7} md={7}>
                <Info>
                  <h6 className={classes.cardCategory}>TRAVEL GEAR LIST</h6>
                </Info>
                <h3 className={classes.cardTitle}>
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    Great items to make travelling with your little ones no fuss!
                  </a>
                </h3>
                <p className={classes.description1}>
                  The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly
                  moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car...
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    {" "}
                    Read More{" "}
                  </a>
                </p>
              </GridItem>
              <GridItem xs={12} sm={5} md={5}>
                <CardHeader image plain>
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    <img src={beach} className={classes.listImageMobile} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${beach})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </GridItem>
            </GridContainer>
          </Card>
          <Card plain blog className={classes.card}>
            <GridContainer>
              <GridItem xs={12} sm={7} md={7}>
                <Danger>
                  <h6 className={classes.cardCategory}>
                    BIRTHING HOSPITAL BAG
                  </h6>
                </Danger>
                <h3 className={classes.cardTitle}>
                  <a href="/lists/hospitalbag" onClick={e => e.preventDefault()}>
                    6 insights into the French Fashion landscape
                  </a>
                </h3>
                <p className={classes.description1}>
                  Like so many organizations these days, Autodesk is a
                  company in transition. It was until recently a traditional
                  boxed software company selling licenses. Today, it’s
                  moving to a subscription model. Yet its own business model
                  disruption is only part of the story — and…
                  <a href="#/lists/hospitalbag" onClick={e => e.preventDefault()}>
                    {" "}
                    Read More{" "}
                  </a>
                </p>
              </GridItem>
              <GridItem xs={12} sm={5} md={5}>
                <CardHeader image plain>
                  <a href="#pablito" onClick={e => e.preventDefault()}>
                    <img src={office2} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${office2})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </GridItem>
            </GridContainer>
          </Card>
          <Card plain blog className={classes.card}>
            <GridContainer>
              <GridItem xs={12} sm={5} md={5}>
                <CardHeader image plain>
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    <img src={beach} className={classes.listImage} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${beach})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </GridItem>
              <GridItem xs={12} sm={7} md={7}>
                <Info>
                  <h6 className={classes.cardCategory}>TRAVEL GEAR LIST</h6>
                </Info>
                <h3 className={classes.cardTitle}>
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    Great items to make travelling with your little ones no fuss!
                  </a>
                </h3>
                <p className={classes.description1}>
                  The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly
                  moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car...
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    {" "}
                    Read More{" "}
                  </a>
                </p>
              </GridItem>
              <GridItem xs={12} sm={5} md={5}>
                <CardHeader image plain>
                  <a href="/lists/travelgear" onClick={e => e.preventDefault()}>
                    <img src={beach} className={classes.listImageMobile} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${beach})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </GridItem>
            </GridContainer>
          </Card>
          <Card plain blog className={classes.card}>
            <GridContainer>
              <GridItem xs={12} sm={7} md={7}>
                <Danger>
                  <h6 className={classes.cardCategory}>
                    BIRTHING HOSPITAL BAG
                  </h6>
                </Danger>
                <h3 className={classes.cardTitle}>
                  <a href="/lists/hospitalbag" onClick={e => e.preventDefault()}>
                    6 insights into the French Fashion landscape
                  </a>
                </h3>
                <p className={classes.description1}>
                  Like so many organizations these days, Autodesk is a
                  company in transition. It was until recently a traditional
                  boxed software company selling licenses. Today, it’s
                  moving to a subscription model. Yet its own business model
                  disruption is only part of the story — and…
                  <a href="#/lists/hospitalbag" onClick={e => e.preventDefault()}>
                    {" "}
                    Read More{" "}
                  </a>
                </p>
              </GridItem>
              <GridItem xs={12} sm={5} md={5}>
                <CardHeader image plain>
                  <a href="#pablito" onClick={e => e.preventDefault()}>
                    <img src={office2} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${office2})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SectionPills.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionPillsStyle)(SectionPills);
