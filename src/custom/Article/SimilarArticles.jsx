import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Info from "components/Typography/Info.jsx";

import articlesStyle from "assets/jss/custom/components/similarArticlesStyle.jsx";

function SimilarArticles(props) {
  const { classes, articles } = props;

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
                  <GridItem xs={12} sm={4} md={4}>
                      <Card blog>
                        <CardHeader image>
                          <a href={article.url}>
                            <img src={require('assets/img/articles/' + article.img)} className={classes.listImage} alt="..." />
                          </a>
                          <div
                            className={classes.coloredShadow}
                            style={{
                              backgroundImage: "url(" + require('assets/img/articles/' + article.img) + ")",
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
  classes: PropTypes.object.isRequired,
  articles: PropTypes.array,
};

export default withStyles(articlesStyle)(SimilarArticles);
