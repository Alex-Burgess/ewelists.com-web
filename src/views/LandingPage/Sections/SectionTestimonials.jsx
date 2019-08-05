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
import CardAvatar from "components/Card/CardAvatar.jsx";
import Muted from "components/Typography/Muted.jsx";

import testimonialsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/testimonialsStyle.jsx";

import cardProfile1Square from "assets/img/faces/card-profile1-square.jpg";
import cardProfile4Square from "assets/img/faces/card-profile4-square.jpg";
import cardProfile6Square from "assets/img/faces/card-profile6-square.jpg";

function SectionTestimonials({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.testimonials}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem
            xs={12}
            sm={6}
            md={6}
            className={
              classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
            }
          >
            <h2 className={classes.title}>What Clients Say</h2>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <Card testimonial plain>
              <CardAvatar testimonial plain>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={cardProfile1Square} alt="..." />
                </a>
              </CardAvatar>
              <CardBody plain>
                <h4 className={classes.title}>Mike Andrew</h4>
                <Muted>
                  <h6>CEO @ MARKETING DIGITAL LTD.</h6>
                </Muted>
                <h5 className={classes.cardDescription}>
                  {'"'}I speak yell scream directly at the old guard on behalf
                  of the future. I gotta say at that time I’d like to meet
                  Kanye I speak yell scream directly at the old guard on
                  behalf of the future.{'"'}
                </h5>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Card testimonial plain>
              <CardAvatar testimonial plain>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={cardProfile4Square} alt="..." />
                </a>
              </CardAvatar>
              <CardBody plain>
                <h4 className={classes.title}>Tina Thompson</h4>
                <Muted>
                  <h6>MARKETING @ APPLE INC.</h6>
                </Muted>
                <h5 className={classes.cardDescription}>
                  {'"'}I promise I will never let the people down. I want a
                  better life for all!!! Pablo Pablo Pablo Pablo! Thank you
                  Anna for the invite thank you to the whole Vogue team It
                  wasn’t any Kanyes I love Rick Owens’ bed design but the back
                  is too high for the beams and angle of the ceiling{'"'}
                </h5>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Card testimonial plain>
              <CardAvatar testimonial plain>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={cardProfile6Square} alt="..." />
                </a>
              </CardAvatar>
              <CardBody plain>
                <h4 className={classes.title}>Gina West</h4>
                <Muted>
                  <h6>CFO @ APPLE INC.</h6>
                </Muted>
                <h5 className={classes.cardDescription}>
                  {'"'}I{"'"}ve been trying to figure out the bed design for
                  the master bedroom at our Hidden Hills compound... Royère
                  doesn
                  {"'"}t make a Polar bear bed but the Polar bear. This is a
                  very nice testimonial about this company.{'"'}
                </h5>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionTestimonials.propTypes = {
  classes: PropTypes.object
};

export default withStyles(testimonialsStyle)(SectionTestimonials);
