import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import FooterGrey from "custom/Footer/FooterGrey.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// Custom components
import SimilarArticlesMain from "custom/GiftIdeas/SimilarArticlesMain.jsx";
import RecentArticlesMain from "custom/GiftIdeas/RecentArticlesMain.jsx";
import HeaderTransparent from "custom/Header/HeaderTransparent.jsx";

import giftIdeasMainStyle from "assets/jss/custom/components/giftIdeasMainStyle.jsx";

class GiftIdeasMain extends React.Component {
  render() {
    const { classes, isAuthenticated, recentArticles, similarArticles } = this.props;

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
}

GiftIdeasMain.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  recentArticles: PropTypes.array,
  similarArticles: PropTypes.array
};

export default withStyles(giftIdeasMainStyle)(GiftIdeasMain);
