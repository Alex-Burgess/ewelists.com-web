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
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Info from "components/Typography/Info.jsx";

import similarListStyle from "assets/jss/material-kit-pro-react/components/similarListStyle.jsx";

function SimilarList({ ...props }) {
  const { classes, img, url, category, title, description_short } = props;
  return (
    <div>
      <Card blog>
        <CardHeader image>
          <a href={url}>
            <img src={img} className={classes.listImage} alt="..." />
          </a>
          <div
            className={classes.coloredShadow}
            style={{
              backgroundImage: "url(" + img + ")",
              opacity: "1"
            }}
          />
        </CardHeader>
        <CardBody>
          <Info>
            <h6>{category}</h6>
          </Info>
          <h4 className={classes.cardTitle}>
            <a href={url}>
              {title}
            </a>
          </h4>
          <p className={classes.description}>
            {description_short}
            <a href={url}> Read Article </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

SimilarList.propTypes = {
  classes: PropTypes.object,
  url: PropTypes.string,
  title: PropTypes.string,
  description_short: PropTypes.string
};

export default withStyles(similarListStyle)(SimilarList);
