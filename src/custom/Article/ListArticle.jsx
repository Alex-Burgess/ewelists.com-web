import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Parallax from "components/Parallax/Parallax.jsx";
import FooterDark from "custom/Footer/FooterDark.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// Custom components
import SimilarArticles from "custom/Article/SimilarArticles.jsx";
import SectionShopTheStory from "custom/Article/ShopTheStory.jsx";
import HeaderTransparent from "custom/Header/HeaderTransparent.jsx";

import listArticleStyle from "assets/jss/custom/components/listArticleStyle.jsx";

class ListArticle extends React.Component {
  render() {
    const { classes, isAuthenticated, backgroundImg, title, subtitle, storyProducts, similarArticles, content } = this.props;

    return (
      <div>
        <HeaderTransparent isAuthenticated={isAuthenticated} />
        <Parallax image={require('assets/img/articles/' + backgroundImg)} filter="dark" className={classes.articleBg + " " + classes.darkFilter}>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={10} md={10}>
                  <h1 className={classes.title}>
                    {title}
                  </h1>
                  <h2 className={classes.subtitle}>
                    {subtitle}
                  </h2>
                  <div className={classes.content}>
                    {content}
                  </div>
                </GridItem>
              </GridContainer>
            </div>
            <SectionShopTheStory
              products={
                storyProducts
              }
            />
          </div>
        </div>
        <SimilarArticles
          articles={
            similarArticles
          }
        />
        <FooterDark />
      </div>
    );
  }
}

ListArticle.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  backgroundImg: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  storyProducts: PropTypes.array,
  similarArticles: PropTypes.array,
  content: PropTypes.string
};

export default withStyles(listArticleStyle)(ListArticle);
