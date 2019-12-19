import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import FooterDark from "custom/Footer/FooterDark.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";
// Sections for this page
import Create from "./UnAuthSections/Create.js";
import Product from "./UnAuthSections/Product.js";
import Ideas from "./UnAuthSections/Ideas.js";
import YourLists from "./AuthSections/YourLists.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();

  const renderAuthed = () => {
    return (
      <div>
        <HeaderFixed isAuthenticated={true} />
        <div className={classes.main}>
          <YourLists />
        </div>
      </div>
    );
  }

  const renderUnAuthed = () => {
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

  return (
    <div>
      {props.isAuthenticated ? renderAuthed() : renderUnAuthed()}
    </div>
  );
}
