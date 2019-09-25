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
import Header from "components/Header/Header.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.jsx";

// Sections for this page
import LandingCreate from "./Sections/LandingCreate.jsx";
import LandingProduct from "./Sections/LandingProduct.jsx";
import LandingIdeas from "./Sections/LandingIdeas.jsx";
import DashboardLists from "./Sections/DashboardLists.jsx";
import DashboardInvited from "./Sections/DashboardInvited.jsx";

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
        <Header
          color="info"
          brand="ewelists"
          links={<HeaderLinksAuth dropdownHoverColor="info" />}
          fixed
          {...rest}
        />
        <div className={classes.main}>
          <DashboardLists />
          <DashboardInvited />
        </div>
      </div>
    );
  }

  renderUnAuthed() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="info"
          brand="ewelists"
          links={<HeaderLinks dropdownHoverColor="rose" />}
          fixed
          {...rest}
        />
        <div className={classes.main}>
          <LandingCreate />
          <LandingProduct />
          <LandingIdeas />
        </div>
        <FooterLarge />
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(landingPageStyle)(LandingPage);
