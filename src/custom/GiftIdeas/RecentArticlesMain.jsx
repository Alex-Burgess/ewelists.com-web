import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Info from "components/Typography/Info.jsx";
import Danger from "components/Typography/Danger.jsx";

import articlesStyle from "assets/jss/material-kit-pro-react/custom/recentArticlesMainStyle.jsx";

class RecentArticlesMain extends React.Component {
  renderLeftImg(classes, title, url, img, description_short, beginning_content) {
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

  renderRightImg(classes, title, url, img, description_short, beginning_content) {
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

  render() {
    const { classes, articles } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer>
          <GridItem xs={12} sm={10} md={10} className={classes.mlAuto + " " + classes.mrAuto}>
            {
              articles.map ((article, i) =>
                <div>
                  {article.img_position_left
                    ? this.renderLeftImg(
                        classes,
                        article.title,
                        article.url,
                        article.img,
                        article.description_short,
                        article.beginning_content
                      )
                    : this.renderRightImg(
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
}

RecentArticlesMain.propTypes = {
  classes: PropTypes.object.isRequired,
  articles: PropTypes.array,
};

export default withStyles(articlesStyle)(RecentArticlesMain);
