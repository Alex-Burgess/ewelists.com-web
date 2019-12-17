import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import FooterDark from "custom/Footer/FooterDark.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Sections for this page
import Create from "./Sections/Create.js";
import Product from "./Sections/Product.js";
import Ideas from "./Sections/Ideas.js";
import YourLists from "./Sections/YourLists.js";

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? this.renderAuthed() : this.renderUnAuthed()}
      </div>
    );
  }

  renderAuthed() {
    const { classes } = this.props;
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
    const { classes } = this.props;
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
