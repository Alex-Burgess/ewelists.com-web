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
import config from 'config.js';

import styles from "assets/jss/custom/components/recentArticlesMainStyle.js";
const useStyles = makeStyles(styles);

export default function RecentArticlesMain(props) {
  const { articles } = props;
  const classes = useStyles();

  const renderImg = (url, img, type) => {
    return (
      <CardHeader image plain>
        <a href={url}>
          {type === 'desktop'
            ? <img src={config.imagePrefix + '/images/' + img} className={classes.image + " " + classes.imageDesktop} alt="..." />
            : type === 'right'
                ? <img src={config.imagePrefix + '/images/' + img} className={classes.image + " " + classes.imageRight} alt="..." />
              : type === 'tablet'
                  ? <img src={config.imagePrefix + '/images/' + img} className={classes.image + " " + classes.imageTablet} alt="..." />
                : <img src={config.imagePrefix + '/images/' + img} className={classes.image + " " + classes.imageMobile} alt="..." />
          }
        </a>
        <div
          className={classes.coloredShadow}
          style={{
            backgroundImage: "url(" + config.imagePrefix + '/images/' + img + ")",
            opacity: "1"
          }}
        />
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

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={10} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
          {
            articles.map ((article, i) =>
              <div key={i}>
                {article.img_position_left
                  ? renderLeftArticle(
                      article.title,
                      article.url,
                      article.img,
                      article.description_short,
                      article.beginning_content
                    )
                  : renderRightArticle(
                      article.title,
                      article.url,
                      article.img,
                      article.description_short,
                      article.beginning_content
                  )
                }
              </div>
            )
          }
        </GridItem>
      </GridContainer>
    </div>
  );
}

RecentArticlesMain.propTypes = {
  articles: PropTypes.array,
};
