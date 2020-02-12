import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
// core components
import Header from "components/Header/Header.js";

import styles from "assets/jss/custom/components/headerSettings.js";
const useStyles = makeStyles(styles);

export default function HeaderFixed(props) {
  const { url } = props;
  const classes = useStyles();

  return (
    <div>
      <Header
        brand={<a href={url}> <ArrowBackIos className={classes.arrow}/> </a>}
        links={null}
        fixed
        color="info"
        back
        page={
          <div className={classes.titleWrapper}>
            <h4 className={classes.title}>List Settings</h4>
          </div>
        }
      />
    </div>
  );
}

HeaderFixed.propTypes = {
  url: PropTypes.string
};
