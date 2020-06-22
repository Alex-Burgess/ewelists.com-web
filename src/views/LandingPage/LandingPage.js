import React, { useState, useEffect } from 'react';
import qs from "qs";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import FooterDark from "components/Footer/FooterDark.js";
import HeaderFixed from "components/Header/HeaderFixed.js";
// Sections for this page
import Create from "./UnAuthSections/Create.js";
import Product from "./UnAuthSections/Product.js";
import Ideas from "./UnAuthSections/Ideas.js";
import YourLists from "./AuthSections/YourLists.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/landingPageStyle.js";
const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();

  const [create, setCreate] = useState(false);

  useEffect( () => {
    function checkUrlParams() {
      const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

      switch (params['po']) {
        case "create":
          setCreate(true);
          break;
        default:
          break;
      }
    };

    checkUrlParams();
  }, [props.location.search]);

  const renderAuthed = () => {
    return (
      <div>
      <div className={classes.page}>
        <HeaderFixed isAuthenticated={true} user={props.user} mobile={props.mobile}/>
        <div className={classes.main}>
          <YourLists showCreate={create} setCreate={setCreate} setTabTitle={props.setTabTitle}/>
        </div>
        <div className={classes.flexer} />
      </div>
      <FooterDark />
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
