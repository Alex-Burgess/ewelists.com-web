import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FooterDark from "components/Footer/FooterDark.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// Custom components
import RecentArticles from "components/Articles/RecentArticles.js";
import HeaderTransparent from "components/Header/HeaderTransparent.js";
import details from 'views/ArticlePages/PageDetails/PageDetails.json'

import styles from "assets/jss/material-kit-pro-react/views/ideasStyle.js";
const useStyles = makeStyles(styles);

export default function Ideas(props) {
  const classes = useStyles();

  const getRecentArticles = () => {
      return Object.keys(details);
  }

  return (
    <div>
      <HeaderTransparent isAuthenticated={props.isAuthenticated} user={props.user} />
      <Parallax className={classes.parallaxSize}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
              <h2 className={classes.title}>
                Gift List Ideas
              </h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.main}>
        <div className={classes.container}>
          <RecentArticles
            articles={
              getRecentArticles()
            }
          />
        </div>
      </div>
      <div className={classes.spacer}>
      </div>
      <FooterDark />
    </div>
  );
}
