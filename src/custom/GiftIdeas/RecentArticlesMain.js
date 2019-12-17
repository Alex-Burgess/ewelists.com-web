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

import styles from "assets/jss/custom/components/recentArticlesMainStyle.js";
const useStyles = makeStyles(styles);

export default function RecentArticlesMain(props) {
  const { articles } = props;
  const classes = useStyles();

  const renderLeftImg = (classes, title, url, img, description_short, beginning_content) => {
    return (
      <Card plain blog className={classes.card}>
        <GridContainer>
          <GridItem xs={12} sm={5} md={5}>
            <CardHeader image plain>
              <a href={url}>
                <img src={require('assets/img/articles/' + img)} className={classes.leftImage} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${require('assets/img/articles/' + img)})`,
                  opacity: "1"
                }}
              />
            </CardHeader>
          </GridItem>
          <GridItem xs={12} sm={7} md={7}>
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
            <p className={classes.description1}>
              {beginning_content}
              <a href={url}>
                {" "}
                Read More{" "}
              </a>
            </p>
          </GridItem>
          <GridItem xs={12} sm={5} md={5}>
            <CardHeader image plain>
              <a href={url}>
                <img src={require('assets/img/articles/' + img)} className={classes.leftImageMobile} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${require('assets/img/articles/' + img)})`,
                  opacity: "1"
                }}
              />
            </CardHeader>
          </GridItem>
        </GridContainer>
      </Card>
    );
  }

  const renderRightImg = (classes, title, url, img, description_short, beginning_content) => {
    return (
      <Card plain blog className={classes.card}>
          <GridContainer>
            <GridItem xs={12} sm={7} md={7}>
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
              <p className={classes.description1}>
              {beginning_content}
                <a href={url}>
                  {" "}
                  Read More{" "}
                </a>
              </p>
            </GridItem>
            <GridItem xs={12} sm={5} md={5}>
              <CardHeader image plain>
                <a href={url}>
                  <img src={require('assets/img/articles/' + img)} className={classes.rightImage} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${require('assets/img/articles/' + img)})`,
                    opacity: "1"
                  }}
                />
              </CardHeader>
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
              <div>
                {article.img_position_left
                  ? renderLeftImg(
                      classes,
                      article.title,
                      article.url,
                      article.img,
                      article.description_short,
                      article.beginning_content
                    )
                  : renderRightImg(
                      classes,
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
