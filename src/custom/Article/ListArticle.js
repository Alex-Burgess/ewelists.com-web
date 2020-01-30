import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Parallax from "components/Parallax/Parallax.js";
import FooterDark from "custom/Footer/FooterDark.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// Custom components
import SimilarArticles from "custom/Article/SimilarArticles.js";
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import config from 'config.js';

import styles from "assets/jss/custom/components/article/listArticleStyle.js";
const useStyles = makeStyles(styles);

export default function ListArticle(props) {
  const classes = useStyles();

  const { isAuthenticated, backgroundImg, title, subtitle, similarArticles, content, user } = props;

  return (
    <div>
      <HeaderTransparent isAuthenticated={isAuthenticated} user={user} />
      <Parallax image={config.imagePrefix + '/images/' + backgroundImg} filter="dark" className={classes.articleBg + " " + classes.darkFilter}>
      </Parallax>
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={10}>
                <h1 className={classes.title}>
                  {title}
                </h1>
                <h3 className={classes.subtitle}>
                  {subtitle}
                </h3>
                <div className={classes.content}>
                  {content}
                </div>
              </GridItem>
            </GridContainer>
          </div>
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

ListArticle.propTypes = {
  isAuthenticated: PropTypes.bool,
  backgroundImg: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  similarArticles: PropTypes.array,
  content: PropTypes.object
};
