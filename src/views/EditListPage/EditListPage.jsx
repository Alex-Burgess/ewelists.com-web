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
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
// sections for this page
import SectionEditDetails from "./Sections/EditDetails.jsx";
import SectionEditList from "./Sections/EditList.jsx";

import articlePageStyle from "assets/jss/material-kit-pro-react/views/viewEditPageStyle.jsx";

class ArticlePage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
        color="info"
        brand="ewelists"
          links={<HeaderLinksAuth dropdownHoverColor="info" />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "info"
          }}
        />
        <div className={classes.main}>
          <SectionEditDetails />
        </div>
        <FooterLarge />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(articlePageStyle)(ArticlePage);