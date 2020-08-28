import React, { useEffect } from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Parallax from "components/Parallax/Parallax.js";
import FooterDark from "components/Footer/FooterDark.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
// Custom components
import HeaderTransparent from "components/Header/HeaderTransparent.js";
import details from 'views/ArticlePages/PageDetails/PageDetails.json'

import styles from "assets/jss/material-kit-pro-react/views/articlePages/listArticleStyle.js";
const useStyles = makeStyles(styles);

export default function ListArticle(props) {
  const classes = useStyles();

  const { name, content, user, isAuthenticated, mobile, tablet } = props;

  const title = details[name].title;
  const subtitle = details[name].description_short;
  const img = details[name].img;

  useEffect( () => {
    props.setTitle(title)
  }, [props, title]);

  return (
    <div>
      <HeaderTransparent isAuthenticated={isAuthenticated} user={user}  mobile={mobile} tablet={tablet}/>
      <Parallax image={img} filter="dark" className={classes.articleBg + " " + classes.darkFilter}>
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
                <div className={classes.button}>
                  <Button color="secondary" href="/signup" data-cy="get-started-button">
                    Create List Button
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <FooterDark />
    </div>
  );
}

ListArticle.propTypes = {
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string,
  content: PropTypes.object,
  mobile: PropTypes.bool,
  tablet: PropTypes.bool
};
