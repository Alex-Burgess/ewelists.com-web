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
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Info from "components/Typography/Info.jsx";
import Danger from "components/Typography/Danger.jsx";

import similarListStyle from "assets/jss/material-kit-pro-react/components/recentListStyle.jsx";

function SimilarList({ ...props }) {
  const { classes, img, img_position_left, url, title, description_short, beginning_content } = props;
  return (
    <div>
    {img_position_left
      ?
        <Card plain blog className={classes.card}>
          <GridContainer>
            <GridItem xs={12} sm={5} md={5}>
              <CardHeader image plain>
                <a href={url}>
                  <img src={img} className={classes.leftImage} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${img})`,
                    opacity: "1"
                  }}
                />
              </CardHeader>
            </GridItem>
            <GridItem xs={12} sm={7} md={7}>
              <Info>
                <h6 className={classes.cardCategory}>
                  <a href={url}>
                    {title}
                  </a>
                </h6>
              </Info>
              <h3 className={classes.cardTitle}>
                <a href={url}>
                  {description_short}
                </a>
              </h3>
              <p className={classes.description1}>
                {beginning_content}
                <a href={url}>
                  {" "}
                  Read More{" "}
                </a>
              </p>
            </GridItem>
            <GridItem xs={12} sm={5} md={5}>
              <CardHeader image plain>
                <a href={url}>
                  <img src={img} className={classes.leftImageMobile} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${img})`,
                    opacity: "1"
                  }}
                />
              </CardHeader>
            </GridItem>
          </GridContainer>
        </Card>
      : <Card plain blog className={classes.card}>
          <GridContainer>
            <GridItem xs={12} sm={7} md={7}>
              <Danger>
                <h6 className={classes.cardCategory}>
                  <a href={img}>
                    {title}
                  </a>
                </h6>
              </Danger>
              <h3 className={classes.cardTitle}>
                <a href={img}>
                  {description_short}
                </a>
              </h3>
              <p className={classes.description1}>
              {beginning_content}
                <a href={img}>
                  {" "}
                  Read More{" "}
                </a>
              </p>
            </GridItem>
            <GridItem xs={12} sm={5} md={5}>
              <CardHeader image plain>
                <a href={img}>
                  <img src={img} className={classes.rightImage} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${img})`,
                    opacity: "1"
                  }}
                />
              </CardHeader>
            </GridItem>
          </GridContainer>
        </Card>
    }
    </div>
  );
}

SimilarList.propTypes = {
  classes: PropTypes.object,
  url: PropTypes.string,
  title: PropTypes.string,
  description_short: PropTypes.string,
  beginning_content: PropTypes.string,
  img_position_left: PropTypes.bool
};

export default withStyles(similarListStyle)(SimilarList);
