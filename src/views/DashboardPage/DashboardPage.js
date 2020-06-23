import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FooterDark from "components/Footer/FooterDark.js";
import HeaderDark from "components/Header/HeaderDark.js";
// Sections for this page
import YourLists from "./Sections/YourLists.js";

import styles from "assets/jss/material-kit-pro-react/views/dashboardPage/dashboardPageStyle.js";
const useStyles = makeStyles(styles);


export default function DashboardPage(props) {
  const classes = useStyles();

  const { create, setCreate } = props;

  return (
    <div>
      <div className={classes.page}>
        <HeaderDark isAuthenticated={true} user={props.user} mobile={props.mobile}/>
        <div className={classes.main}>
          <YourLists showCreate={create} setCreate={setCreate} setTabTitle={props.setTabTitle}/>
        </div>
        <div className={classes.flexer} />
      </div>
      <FooterDark />
    </div>
  );
}

DashboardPage.propTypes = {
  create: PropTypes.bool,
  // setCreate: PropTypes.function
};
