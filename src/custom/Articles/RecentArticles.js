import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Info from "components/Typography/Info.js";
import Danger from "components/Typography/Danger.js";
import details from 'views/ArticlePages/PageDetails/PageDetails.json'
import config from 'config.js';

import styles from "assets/jss/custom/components/recentArticlesMainStyle.js";
const useStyles = makeStyles(styles);

export default function RecentArticles(props) {
  const { articles } = props;
  const classes = useStyles();

  const renderImg = (url, img, type) => {
    return (
      <CardHeader image plain>
        <a href={url}>
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
        </a>
      </CardHeader>
    )
  }

  const renderLeftArticle = (title, url, img, description_short, beginning_content) => {
    return (
      <Card plain blog className={classes.card}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            {renderImg(url, img, 'desktop')}
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <Info>
              <h6 className={classes.cardCategory}>
                <a href={url}>
                  {title}
                </a>
              </h6>
            </Info>
            <h3 className={classes.cardTitle}>
              <a href={url}>
                {description_short}
              </a>
            </h3>
            <GridContainer>
              <GridItem xs={12} sm={5} md={12}>
                {renderImg(url, img, 'tablet')}
              </GridItem>
              <GridItem xs={12} sm={7} md={12}>
                <p className={classes.description}>
                  {beginning_content}
                  <a href={url}>
                    {" "}
                    Read More{" "}
                  </a>
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

  const renderRightArticle = (title, url, img, description_short, beginning_content) => {
    return (
      <Card plain blog className={classes.card}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <Danger>
                <h6 className={classes.cardCategory}>
                  <a href={url}>
                    {title}
                  </a>
                </h6>
              </Danger>
              <h3 className={classes.cardTitle}>
                <a href={url}>
                  {description_short}
                </a>
              </h3>
              <GridContainer>
                <GridItem xs={12} sm={7} md={12}>
                  <p className={classes.description}>
                    {beginning_content}
                    <a href={url}>
                      {" "}
                      Read More{" "}
                    </a>
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
    const subtitle = details[id].description_short;
    const url = details[id].url;
    const img = details[id].img;

    const beginning_content = details[id].beginning_content;

    if ( (i / 2) % 1 !== 0 ) {
      return renderLeftArticle(title, url, img, subtitle, beginning_content);
    } else {
      return renderRightArticle(title, url, img, subtitle, beginning_content);
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
