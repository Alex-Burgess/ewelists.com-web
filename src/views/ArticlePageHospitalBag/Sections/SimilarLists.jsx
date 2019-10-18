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
import SectionSimilarList from "components/SimilarList/SimilarList.jsx";

import beach from "assets/img/articles/travelgear/bg-beach.jpg";
import hospitalbag from "assets/img/articles/hospitalbag/bg-packing.jpg";

import similarListsStyle from "assets/jss/material-kit-pro-react/views/articleSections/similarListsStyle.jsx";

function SectionSimilarLists({ ...props }) {
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
                <SectionSimilarList
                  category="TRAVEL"
                  title="Travel Gear"
                  url="/listideas/travelgear"
                  img={beach}
                  description_short="Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <SectionSimilarList
                  category="NURSERY"
                  title="The Nursery List"
                  url="/listideas/nursery"
                  img={hospitalbag}
                  description_short="What to buy for your baby’s bedroom."
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <SectionSimilarList
                  category="BABY"
                  title="Bath Time"
                  url="/listideas/bathtime"
                  img={hospitalbag}
                  description_short="Everything you need when bathing your baby."
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionSimilarLists.propTypes = {
  classes: PropTypes.object
};

export default withStyles(similarListsStyle)(SectionSimilarLists);
