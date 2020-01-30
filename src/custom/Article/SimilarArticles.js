import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Info from "components/Typography/Info.js";
import config from 'config.js';

import styles from "assets/jss/custom/components/article/similarArticlesStyle.js";
const useStyles = makeStyles(styles);

export default function SimilarArticles(props) {
  const { articles } = props;
  const classes = useStyles();

  return (
    <div className={classes.sectionSimilarLists}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem md={12}>
            <h2 className={classes.title + " " + classes.textCenter}>
              Similar Articles
            </h2>
            <br />
            <GridContainer>
              {
                articles.map ((article, i) =>
                  <GridItem xs={12} sm={4} md={4} key={i}>
                      <Card blog>
                        <CardHeader image>
                          <a href={article.url}>
                            <img src={config.imagePrefix + '/images/' + article.img} className={classes.listImage} alt="..." />
                          </a>
                          <div
                            className={classes.coloredShadow}
                            style={{
                              backgroundImage: "url(" + config.imagePrefix + '/images/' + article.img + ")",
                              opacity: "1"
                            }}
                          />
                        </CardHeader>
                        <CardBody>
                          <Info>
                            <h6>{article.category}</h6>
                          </Info>
                          <h4 className={classes.cardTitle}>
                            <a href={article.url}>
                              {article.title}
                            </a>
                          </h4>
                          <p className={classes.description}>
                            {article.description_short}
                            <a href={article.url}> Read Article </a>
                          </p>
                        </CardBody>
                      </Card>
                  </GridItem>
                )
              }
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SimilarArticles.propTypes = {
  articles: PropTypes.array,
};
