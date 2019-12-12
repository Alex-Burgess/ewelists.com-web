import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import FooterDark from "components/Footer/FooterDark.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// Custom components
import SimilarArticlesMain from "custom/GiftIdeas/SimilarArticlesMain.jsx";
import RecentArticlesMain from "custom/GiftIdeas/RecentArticlesMain.jsx";

import giftIdeasMainStyle from "assets/jss/material-kit-pro-react/custom/giftIdeasMainStyle.jsx";

class GiftIdeasMain extends React.Component {
  render() {
    const { classes, isAuthenticated, recentArticles, similarArticles } = this.props;

    return (
      <div>
        {isAuthenticated
          ? <Header
              brand="Material Kit PRO React"
              links={<HeaderLinksAuth dropdownHoverColor="info" />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 200,
                color: "info"
              }}
            />
          : <Header
              brand="Material Kit PRO React"
              links={<HeaderLinks dropdownHoverColor="info" />}
              fixed
              color="transparent"
              changeColorOnScroll={{
                height: 200,
                color: "info"
              }}
            />
        }
        <Parallax filter="infoBanner" verySmall>
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
        <FooterDark />
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
