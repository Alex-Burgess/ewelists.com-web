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

import office2 from "assets/img/examples/office2.jpg";
import blog8 from "assets/img/examples/blog8.jpg";
import cardProject6 from "assets/img/examples/card-project6.jpg";

import sectionPillsStyle from "assets/jss/material-kit-pro-react/views/listIdeasSections/sectionRecentListsStyle.jsx";

function SectionPills({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card
            raised
            background
            style={{ backgroundImage: "url(" + office2 + ")" }}
          >
            <CardBody listsBackground>
              <a href="/lists/nursery" className={classes.link}>
                <h3 className={classes.cardTitle}>
                  The Best Productivity Apps on Market
                </h3>
              </a>
              <p className={classes.category}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button round href="/lists/nursery" color="danger">
                <FormatAlignLeft className={classes.icons} /> Read article
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card
            raised
            background
            style={{ backgroundImage: "url(" + blog8 + ")" }}
          >
            <CardBody listsBackground>
              <a href="/lists/nursery" className={classes.link}>
                <h3 className={classes.cardTitle}>
                  Working on Wallstreet is Not So Easy
                </h3>
              </a>
              <p className={classes.category}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button round href="/lists/nursery" color="primary">
                <FormatAlignLeft className={classes.icons} /> Read article
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card
            raised
            background
            style={{ backgroundImage: "url(" + cardProject6 + ")" }}
          >
            <CardBody listsBackground>
              <a href="/lists/nursery" className={classes.link}>
                <h3 className={classes.cardTitle}>
                  0 to 100.000 Customers in 6 months
                </h3>
              </a>
              <p className={classes.category}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button round href="/lists/nursery" color="warning">
                <FormatAlignLeft className={classes.icons} /> Read case study
              </Button>
            </CardBody>
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
