import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FooterGrey from "custom/Footer/FooterGrey.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// Custom components
import SimilarArticlesMain from "custom/GiftIdeas/SimilarArticlesMain.js";
import RecentArticlesMain from "custom/GiftIdeas/RecentArticlesMain.js";
import HeaderTransparent from "custom/Header/HeaderTransparent.js";

import styles from "assets/jss/custom/components/giftIdeasMainStyle.js";
const useStyles = makeStyles(styles);

export default function GiftIdeasMain(props) {
  const { isAuthenticated, recentArticles, similarArticles } = props;
  const classes = useStyles();

  return (
    <div>
      <HeaderTransparent isAuthenticated={isAuthenticated} />
      <Parallax filter="infoBanner" className={classes.parallaxSize}>
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
          <RecentArticlesMain
            articles={
              recentArticles
            }
          />
          <SimilarArticlesMain
            articles={
              similarArticles
            }
          />
        </div>
      </div>
      <FooterGrey />
    </div>
  );
}

GiftIdeasMain.propTypes = {
  isAuthenticated: PropTypes.bool,
  recentArticles: PropTypes.array,
  similarArticles: PropTypes.array
};
