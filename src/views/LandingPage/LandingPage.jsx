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
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import Extension from "@material-ui/icons/Extension";
import ChildFriendly from "@material-ui/icons/ChildFriendly";
import WatchLater from "@material-ui/icons/WatchLater";
// core components
import FooterDark from "custom/Footer/FooterDark.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderFixed from "custom/Header/HeaderFixed.jsx";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.jsx";

// Sections for this page
import Create from "./Sections/Create.jsx";
import Product from "./Sections/Product.jsx";
import Ideas from "./Sections/Ideas.jsx";
import YourLists from "./Sections/YourLists.jsx";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? this.renderAuthed() : this.renderUnAuthed()}
      </div>
    );
  }

  renderAuthed() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <HeaderFixed isAuthenticated={true} />
        <div className={classes.main}>
          <YourLists />
        </div>
      </div>
    );
  }

  renderUnAuthed() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <HeaderFixed isAuthenticated={false} />
        <div className={classes.main}>
          <Create />
          <Product />
          <Ideas />
        </div>
        <FooterDark />
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(landingPageStyle)(LandingPage);
