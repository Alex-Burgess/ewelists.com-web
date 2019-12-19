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

import styles from "assets/jss/custom/components/similarArticlesMainStyle.js";
const useStyles = makeStyles(styles);

export default function SimilarArticlesMain(props) {
  const { articles } = props;
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <h3 className={classes.sectionTitle + " " + classes.textCenter}>
        You may also be interested in
      </h3>
      <br />
      <GridContainer>
        {
          articles.map ((article, i) =>
            <GridItem xs={12} sm={4} md={4} lg={4} xl={4} key={i}>
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
  articles: PropTypes.array,
};
