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

import articlesStyle from "assets/jss/material-kit-pro-react/custom/similarArticlesMainStyle.jsx";

function SimilarArticlesMain(props) {
  const { classes, articles } = props;

  return (
    <div className={classes.section}>
      <h3 className={classes.sectionTitle + " " + classes.textCenter}>
        You may also be interested in
      </h3>
      <br />
      <GridContainer>
        {
          articles.map ((article, i) =>
            <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
              <Card plain blog>
                <CardHeader image plain>
                  <a href={article.url}>
                    <img src={require('assets/img/articles/' + article.img)} className={classes.listImage} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: "url(assets/img/articles/" + article.img + ")",
                      opacity: "1"
                    }}
                  />
                </CardHeader>
                <CardBody plain>
                  <h4 className={classes.cardTitle}>
                    <a href={article.url}>
                      {article.title}
                    </a>
                  </h4>
                  <p className={classes.description}>
                    {article.description_short}
                    <a href={article.url} className={classes.link}> Read Article </a>
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          )
        }
      </GridContainer>
    </div>
  );
}

SimilarArticlesMain.propTypes = {
  classes: PropTypes.object.isRequired,
  articles: PropTypes.array,
};

export default withStyles(articlesStyle)(SimilarArticlesMain);
