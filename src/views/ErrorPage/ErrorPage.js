import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderFixed from "components/Header/HeaderFixed.js";
import Footer from "components/Footer/FooterGrey.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-pro-react/views/errorPageStyle.js";
const useStyles = makeStyles(styles);

export default function ErrorPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <HeaderFixed isAuthenticated={props.isAuthenticated} user={props.user} mobile={props.mobile} />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={7}>
            <h1 className={classes.title}>Oops!</h1>
            <h2 className={classes.subTitle}>We can't seem to find the page you're looking for.</h2>
            <div>
              You could head back to the
              <Link to="/"> home page</Link>
              , or if this keeps happening,
              <Link to="/contact"> drop us a line </Link>
               so we can quickly fix it.
            </div>

          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.flexer} />
      <Footer />
    </div>
  );
}
