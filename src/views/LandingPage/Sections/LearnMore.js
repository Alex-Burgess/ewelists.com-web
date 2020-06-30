import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";

import styles from "assets/jss/material-kit-pro-react/views/landingPage/learnMoreStyle.js";
const useStyles = makeStyles(styles);

export default function LearnMore(props) {
  const classes = useStyles();
  const { mobile } = props;

  const scrollToExplore = (id) => {
    if (mobile) {
      window.scrollTo({ top: 670, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 690, behavior: 'smooth' })
    }
  }

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8} className={classes.textCenter}>
          <h3 className={classes.subTitle}>
            Share your gift ideas with ewelists.  It's simple to use and it's free!
          </h3>
          <Button color="primary" onClick={() => scrollToExplore()}>
            Learn More
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}

LearnMore.propTypes = {
  mobile: PropTypes.bool
};
