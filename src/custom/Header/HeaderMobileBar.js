import React, { useState, useEffect } from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
// core components
import Header from "components/Header/Header.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";

import styles from "assets/jss/custom/components/headerSettings.js";
const useStyles = makeStyles(styles);

export default function HeaderMobileBar(props) {
  const { url, name } = props;
  const classes = useStyles();

  const [mobile, setMobile] = useState(false);

  useEffect( () => {
    function updateDimensions() {
      if (window.innerWidth < 400){
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  return (
    <div>
      {mobile
        ? <Header
            brand={<a href={url}> <ArrowBackIos className={classes.arrow}/> </a>}
            links={null}
            fixed
            color="info"
            back
            page={
              <div className={classes.titleWrapper}>
                <h4 className={classes.title}>{name}</h4>
              </div>
            }
          />
        : <HeaderFixed isAuthenticated={props.isAuthenticated} user={props.user} />
      }
    </div>
  );
}

HeaderMobileBar.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string
};
