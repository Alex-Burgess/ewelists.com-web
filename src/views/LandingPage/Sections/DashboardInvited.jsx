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
import Info from "components/Typography/Info.jsx";

import createStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/dashboardInvitedStyle.jsx";

import oscar1 from "assets/img/examples/oscar-birthday.jpg";
import oscar2 from "assets/img/examples/oscar-christmas.jpg";

class SectionInvited extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>View Shared Lists</h1>
              <br />
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <Card profile>
                    <CardHeader image>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={oscar1} className={classes.listImage} alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${oscar1})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody>
                      <Info>
                        <h6 className={classes.cardCategory}>Oscar's Birthday</h6>
                      </Info>
                      <p className={classes.cardDescription}>
                        Oscar's second birthday wish list.
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card profile>
                    <CardHeader image>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={oscar2} className={classes.listImage} alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${oscar2})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody>
                      <Info>
                        <h6 className={classes.cardCategory}>Oscar's Christmas</h6>
                      </Info>
                      <p className={classes.cardDescription}>
                        Oscar's second Christmas wish list.
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card profile>
                    <CardHeader image>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={oscar1} className={classes.listImage} alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${oscar1})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody>
                      <Info>
                        <h6 className={classes.cardCategory}>Oscar's Birthday</h6>
                      </Info>
                      <p className={classes.cardDescription}>
                        Oscar's second birthday wish list.
                      </p>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Card profile>
                    <CardHeader image>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={oscar2} className={classes.listImage} alt="..." />
                      </a>
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${oscar2})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                    <CardBody>
                      <Info>
                        <h6 className={classes.cardCategory}>Oscar's Christmas</h6>
                      </Info>
                      <p className={classes.cardDescription}>
                        Oscar's second Christmas wish list.
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
}

SectionInvited.propTypes = {
  classes: PropTypes.object
};

export default withStyles(createStyle)(SectionInvited);
