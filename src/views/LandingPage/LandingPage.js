import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import FooterDark from "custom/Footer/FooterDark.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";
import FooterGrey from "custom/Footer/FooterGrey.js";
// Sections for this page
import Create from "./UnAuthSections/Create.js";
import Product from "./UnAuthSections/Product.js";
import Ideas from "./UnAuthSections/Ideas.js";
import YourLists from "./AuthSections/YourLists.js";

import styles from "assets/jss/custom/views/landingPage/landingPageStyle.js";
const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();

  const checkForCreateParam = () => {
    const search = props.location.search.substr(1);
    if (search === "create") {
      return true
    }

    return false
  }

  const renderAuthed = () => {
    return (
      <div>
        <div className={classes.page}>
          <HeaderFixed isAuthenticated={true} user={props.user} mobile={props.mobile}/>
          <div className={classes.main}>
            <YourLists showCreate={checkForCreateParam()} />
          </div>
          <div className={classes.flexer}>
          </div>
          <FooterGrey />
        </div>
      </div>
    );
  }

  const renderUnAuthed = () => {
    return (
      <div>
        <HeaderFixed isAuthenticated={false} mobile={props.mobile}/>
        <div className={classes.main}>
          <Create mobile={props.mobile} />
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
