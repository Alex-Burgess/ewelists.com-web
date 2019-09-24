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
import CardHeader from "components/Card/CardHeader.jsx";
import Info from "components/Typography/Info.jsx";
import Danger from "components/Typography/Danger.jsx";

import ideasStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/ideasStyle.jsx";

import beach from "assets/img/articles/travelgear/bg-beach.jpg";
import hospitalbag from "assets/img/articles/hospitalbag/bg-packing.jpg";

class SectionIdeas extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={10}
              md={10}
              className={classes.mlAuto + " " + classes.mrAuto}
            >
              <h2 className={classes.title}>Gift List Ideas</h2>
              <br />
              <Card plain blog className={classes.card}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a href="/lists/travelgear">
                        <img src={beach} className={classes.leftImage} alt="..." />
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
                      <h6 className={classes.cardCategory}>
                        <a href="/lists/travelgear">
                          TRAVEL GEAR
                        </a>
                      </h6>
                    </Info>
                    <h3 className={classes.cardTitle}>
                      <a href="/lists/travelgear">
                        Great items to make travelling with your little ones no fuss!
                      </a>
                    </h3>
                    <p className={classes.description1}>
                      The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly
                      moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car...
                      <a href="/lists/travelgear">
                        {" "}
                        Read More{" "}
                      </a>
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a href="/lists/travelgear">
                        <img src={beach} className={classes.leftImageMobile} alt="..." />
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
                        <a href="/lists/hospitalbag">
                          HOSPITAL BAG
                        </a>
                      </h6>
                    </Danger>
                    <h3 className={classes.cardTitle}>
                      <a href="/lists/hospitalbag">
                        Get set with everything you need for the all important hospital bag.
                      </a>
                    </h3>
                    <p className={classes.description1}>
                    What do you pack in that all important hospital bag, or is it bags? I like to be organised and took great pleasure in compartmentalising my two hospital bags
                    many weeks out from the birth date. My top tips for what to pack in your bag...
                      <a href="/lists/hospitalbag">
                        {" "}
                        Read More{" "}
                      </a>
                    </p>
                  </GridItem>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <a href="/lists/hospitalbag">
                        <img src={hospitalbag} className={classes.rightImage} alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${hospitalbag})`,
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
      </div>
    );
  }
}

SectionIdeas.propTypes = {
  classes: PropTypes.object
};

export default withStyles(ideasStyle)(SectionIdeas);
