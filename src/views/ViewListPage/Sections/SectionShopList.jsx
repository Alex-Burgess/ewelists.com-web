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
import CardBody from "components/Card/CardBody.jsx";

import babybjorncot from "assets/img/articles/travelgear/babybjorn-travelcot.jpg";
import babybjorncarrier from "assets/img/articles/travelgear/babybjorn-carrier.jpg";
import micralitecot from "assets/img/articles/travelgear/micralite-travelcot.jpg";
import yoyo from "assets/img/articles/travelgear/babyzen-yoyo.jpg";
import acro from "assets/img/articles/travelgear/mamasandpapas-acro.jpg";
import profold from "assets/img/articles/travelgear/micralite-profold.jpg";
import ranger from "assets/img/articles/travelgear/littlelife-rangercarrier.jpg";
import lobster from "assets/img/articles/travelgear/philandteds-lobster.jpg";
import munchkinseat from "assets/img/articles/travelgear/munchkin-travelseat.jpg";

import sectionShopListStyle from "assets/jss/material-kit-pro-react/views/articleSections/sectionShopListStyle.jsx";

function SectionShopList({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <h3 className={classes.title}>Shop The Story</h3>

          <GridContainer>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B01H24LM58">
                    <img src={babybjorncot} className={classes.productImage} alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B01H24LM58">
                    <h4 className={classes.cardTitle}>BABYBJ&#0214;RN</h4>
                  </a>
                  <p className={classes.description}>
                    Travel Cot Easy Go, Anthracite, with transport bag
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £219.99</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B07PN49Q4S">
                    <img src={micralitecot} className={classes.productImage} alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B07PN49Q4S">
                    <h4 className={classes.cardTitle}>Micralite</h4>
                  </a>
                  <p className={classes.description}>
                    Travel Cot 3 in 1 Sleep & Go Portable Travel Cot - Carbon/Grey.
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £175</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291">
                    <img src={yoyo} className={classes.productImage}  alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291">
                    <h4 className={classes.cardTitle}>BABYZEN</h4>
                  </a>
                  <p className={classes.description}>
                    YOYO+ Puschair, Black with Aqua
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £389</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B07FBYHY7L">
                    <img src={acro} className={classes.productImage}  alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B07FBYHY7L">
                    <h4 className={classes.cardTitle}>Mamas & Papas</h4>
                  </a>
                  <p className={classes.description}>
                    Acro Compact Buggy, Black
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £189</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B07PM6ZD1C">
                    <img src={profold} className={classes.productImage} alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B07PM6ZD1C">
                    <h4 className={classes.cardTitle}>Micralite</h4>
                  </a>
                  <p className={classes.description}>
                    ProFold Compact Stroller - Carbon
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £175</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B07937WXKD">
                    <img src={babybjorncarrier} className={classes.productImage} alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B07937WXKD">
                    <h4 className={classes.cardTitle}>BABYBJ&#0214;RN</h4>
                  </a>
                  <p className={classes.description}>
                    Baby Carrier One Air, 3D Mesh, Navy Blue
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £159.99</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B0792Y5L7K">
                    <img src={ranger} className={classes.productImage} alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B0792Y5L7K">
                    <h4 className={classes.cardTitle}>LittleLife</h4>
                  </a>
                  <p className={classes.description}>
                    Ranger S2 Child Carrier
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £99.99</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B0019AC8GE">
                    <img src={lobster} className={classes.productImage} alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B0019AC8GE">
                    <h4 className={classes.cardTitle}>Phil and Teds</h4>
                  </a>
                  <p className={classes.description}>
                    Lobster Highchair - Red
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £69.95</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={4} sm={4}>
              <Card plain product>
                <CardHeader noShadow image>
                  <a href="https://www.amazon.co.uk/dp/B01M6XGKV1">
                    <img src={munchkinseat} className={classes.productImage} alt=".." />
                  </a>
                </CardHeader>
                <CardBody plain>
                  <a href="https://www.amazon.co.uk/dp/B01M6XGKV1">
                    <h4 className={classes.cardTitle}>Munchkin</h4>
                  </a>
                  <p className={classes.description}>
                    Portable Travel Child Booster Seat - Blue/Grey
                  </p>
                  <div className={classes.priceContainer}>
                    <span className={classes.price}> £20.90</span>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <br />

        </GridItem>
      </GridContainer>
    </div>
  );
}

SectionShopList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionShopListStyle)(SectionShopList);
