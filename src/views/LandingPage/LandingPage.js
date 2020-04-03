import React, { useState, useEffect } from 'react';
import qs from "qs";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import FooterDark from "custom/Footer/FooterDark.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";
import FooterGrey from "custom/Footer/FooterGrey.js";
import Login from "custom/Login/Login.js";
// Sections for this page
import Create from "./UnAuthSections/Create.js";
import Product from "./UnAuthSections/Product.js";
import Ideas from "./UnAuthSections/Ideas.js";
import YourLists from "./AuthSections/YourLists.js";

import styles from "assets/jss/custom/views/landingPage/landingPageStyle.js";
const useStyles = makeStyles(styles);


export default function LandingPage(props) {
  const classes = useStyles();

  const [create, setCreate] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [account, setAccount] = useState('');

  useEffect( () => {
    function checkUrlParams() {
      const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

      switch (params['po']) {
        case "create":
          console.log("setting create to true")
          setCreate(true);
          break;
        case "login":
          setLogin(true);
          setLoginType(params['type']);
          setAccount(params['account']);
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
            <YourLists showCreate={create} setCreate={setCreate} />
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
        <Login open={login} account={account} loginType={loginType} setLogin={setLogin}/>
      </div>
    );
  }

  return (
    <div>
      {props.isAuthenticated ? renderAuthed() : renderUnAuthed()}
    </div>
  );
}
