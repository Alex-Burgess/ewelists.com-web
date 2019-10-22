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
import RecentList from "components/RecentList/RecentList.jsx";

import ideasStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/ideasStyle.jsx";

class LandingIdeas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recentArticles: [
        {title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg', img_position_left: true,
        description_short: "Great items to make travelling with your little ones no fuss!",
        beginning_content: "The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car..."},
        {title: "Nursery List", url: "/listideas/nurserylist", img: 'nurserylist.jpg', img_position_left: false,
        description_short: "All the items you need for your baby’s bedroom",
        beginning_content: "Have you been gushing over the possibilities for the cute little nursery or area you want to create for your baby. The nesting phase is such a special time in the lead up to the arrival of your baby and choosing how to decorate your nursery can bring immense joy..."}
      ]
    };
  }

  renderRecentArticles(classes, articles: Articles[]){
    let allArticles: Articles[] = [];

    return allArticles.concat(articles).map (
      (article, i) =>
        <RecentList
          title={article.title}
          url={article.url}
          img={require('assets/img/articles/' + article.img)}
          img_position_left={article.img_position_left}
          description_short={article.description_short}
          beginning_content={article.beginning_content}
        />
    )
  }

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
              {this.renderRecentArticles(classes, this.state.recentArticles)}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

LandingIdeas.propTypes = {
  classes: PropTypes.object
};

export default withStyles(ideasStyle)(LandingIdeas);
