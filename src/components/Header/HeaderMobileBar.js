import React from 'react';
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
// core components
import Header from "components/Header/Header.js";
import HeaderFixed from "components/Header/HeaderFixed.js";

import styles from "assets/jss/material-kit-pro-react/components/header/headerSettings.js";
const useStyles = makeStyles(styles);

export default function HeaderMobileBar(props) {
  const classes = useStyles();
  const { url, title, user, mobile, isAuthenticated } = props;

  return (
    <div>
      {mobile
        ? <Header
            brand={<Link to={url}> <ArrowBackIos className={classes.arrow}/> </Link>}
            links={null}
            fixed
            color="info"
            back
            page={
              <div className={classes.titleWrapper}>
                <h4 className={classes.title}>{title}</h4>
              </div>
            }
          />
        : <HeaderFixed isAuthenticated={isAuthenticated} user={user} mobile={mobile} />
      }
    </div>
  );
}

HeaderMobileBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.object,
  mobile: PropTypes.bool
};
