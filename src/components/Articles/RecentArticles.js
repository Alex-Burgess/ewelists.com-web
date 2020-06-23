import React from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Red from "components/Typography/Red.js";
import OrangeRed from "components/Typography/OrangeRed.js";
import YellowOrange from "components/Typography/YellowOrange.js";
import Yellow from "components/Typography/Yellow.js";
import LightGreen from "components/Typography/LightGreen.js";
import Green from "components/Typography/Green.js";
import Blue from "components/Typography/Blue.js";
import details from 'views/ArticlePages/PageDetails/PageDetails.json'
import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/components/articles/recentArticlesStyle.js";
const useStyles = makeStyles(styles);

export default function RecentArticles(props) {
  const { articles } = props;
  const classes = useStyles();

  const renderImg = (url, img, type) => {
    return (
      <CardHeader image plain>
        <Link to={url}>
          <picture>
              <source type="image/webp" srcSet={config.imagePrefix + '/images/' + img + '.tile.webp'} />
              <source type="image/jpeg" srcSet={config.imagePrefix + '/images/' + img + '.tile.jpg'} />
              {type === 'desktop'
                ? <img src={config.imagePrefix + '/images/' + img + '.tile.jpg'} className={classes.image + " " + classes.imageDesktop} alt="..." />
                : type === 'right'
                    ? <img src={config.imagePrefix + '/images/' + img + '.tile.jpg'} className={classes.image + " " + classes.imageRight} alt="..." />
                  : type === 'tablet'
                      ? <img src={config.imagePrefix + '/images/' + img + '.tile.jpg'} className={classes.image + " " + classes.imageTablet} alt="..." />
                      : <img src={config.imagePrefix + '/images/' + img + '.tile.jpg'} className={classes.image + " " + classes.imageMobile} alt="..." />
              }
          </picture>
        </Link>
      </CardHeader>
    )
  }

  const renderTitle = (titleColour, title, url) => {
    switch (titleColour) {
      case "Red":
        return (
          <Red>{titleContent(title, url)}</Red>
        )
      case "OrangeRed":
        return (
          <OrangeRed>{titleContent(title, url)}</OrangeRed>
        )
      case "YellowOrange":
        return (
          <YellowOrange>{titleContent(title, url)}</YellowOrange>
        )
      case "Yellow":
        return (
          <Yellow>{titleContent(title, url)}</Yellow>
        )
      case "LightGreen":
        return (
          <LightGreen>{titleContent(title, url)}</LightGreen>
        )
      case "Green":
        return (
          <Green>{titleContent(title, url)}</Green>
        )
      default:
        return (
          <Blue>{titleContent(title, url)}</Blue>
        )
    }
  }

  const titleContent = (title, url) => {
    return (
      <h6 className={classes.cardCategory}>
        <Link to={url}>
          {title}
        </Link>
      </h6>
    )
  }

  const renderLeftArticle = (title, titleColour, url, img, description_short, beginning_content) => {
    return (
      <Card plain blog className={classes.card}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            {renderImg(url, img, 'desktop')}
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            {renderTitle(titleColour, title, url)}
            <h3 className={classes.cardTitle}>
              <Link to={url}>
                {description_short}
              </Link>
            </h3>
            <GridContainer>
              <GridItem xs={12} sm={5} md={12}>
                {renderImg(url, img, 'tablet')}
              </GridItem>
              <GridItem xs={12} sm={7} md={12}>
                <p className={classes.description}>
                  {beginning_content}
                  <Link to={url}>
                    {" "}
                    Read More{" "}
                  </Link>
                </p>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            {renderImg(url, img, 'mobile')}
          </GridItem>
        </GridContainer>
      </Card>
    );
  }

  const renderRightArticle = (title, titleColour, url, img, description_short, beginning_content) => {
    return (
      <Card plain blog className={classes.card}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              {renderTitle(titleColour, title, url)}
              <h3 className={classes.cardTitle}>
                <Link to={url}>
                  {description_short}
                </Link>
              </h3>
              <GridContainer>
                <GridItem xs={12} sm={7} md={12}>
                  <p className={classes.description}>
                    {beginning_content}
                    <Link to={url}>
                      {" "}
                      Read More{" "}
                    </Link>
                  </p>
                </GridItem>
                <GridItem xs={12} sm={5} md={12}>
                  {renderImg(url, img, 'tablet')}
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              {renderImg(url, img, 'right')}
            </GridItem>
          </GridContainer>
        </Card>
    );
  }

  const renderArticle = (id, i) => {
    const title = details[id].title;
    const titleColour = details[id].titleColour;
    const subtitle = details[id].description_short;
    const url = details[id].url;
    const img = details[id].img;

    const beginning_content = details[id].beginning_content;

    if ( (i / 2) % 1 !== 0 ) {
      return renderLeftArticle(title, titleColour, url, img, subtitle, beginning_content);
    } else {
      return renderRightArticle(title, titleColour, url, img, subtitle, beginning_content);
    }
  }


  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
          {
            articles.map ((id, i) =>
              <div key={i}>
                {
                  renderArticle(id, i)
                }
              </div>
            )
          }
        </GridItem>
      </GridContainer>
    </div>
  );
}

RecentArticles.propTypes = {
  articles: PropTypes.array,
};
