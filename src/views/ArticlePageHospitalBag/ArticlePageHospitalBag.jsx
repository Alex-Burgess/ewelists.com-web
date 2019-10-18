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
/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
// sections for this page
import SectionContent from "./Sections/Content.jsx";
import SectionShopList from "./Sections/SectionShopList.jsx";
import SectionSimilarLists from "./Sections/SimilarLists.jsx";

import articlePageStyle from "assets/jss/material-kit-pro-react/views/articlePageStyle.jsx";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Hospital Bag',
      subtitle: "Make sure you're all set with everything you need for the all important hospital bag.",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 200,
            color: "info"
          }}
        />
        <Parallax image={require("assets/img/articles/hospitalbag/bg-packing.jpg")} filter="dark" className={classes.articleBg}>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={10} md={10}>
                  <h1 className={classes.title}>
                    {this.state.title}
                  </h1>
                  <h2 className={classes.subtitle}>
                    {this.state.subtitle}
                  </h2>
                  <div className={classes.content}>
                    <SectionContent />
                  </div>
                </GridItem>
              </GridContainer>
            </div>
            <SectionShopList />
          </div>
        </div>
        <SectionSimilarLists />
        <FooterLarge />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(articlePageStyle)(ArticlePage);
