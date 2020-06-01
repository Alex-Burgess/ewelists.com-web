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
import CardBody from "components/Card/CardBody.js";
import Info from "components/Typography/Info.js";
import details from 'views/ArticlePages/PageDetails/PageDetails.json'
import config from 'config.js';

import styles from "assets/jss/custom/components/article/similarArticlesStyle.js";
const useStyles = makeStyles(styles);

export default function SimilarArticles(props) {
  const { name } = props;
  const classes = useStyles();

  const renderBlogs = () => {
    const a = Object.keys(details);

    // Remove the current page from the list of possible similar articles.
    var index = a.indexOf(name);
    a.splice(index, 1);

    // Get the first 3 articles
    const articles = a.slice(0, 3);

    return (
      articles.map ((id, i) =>
        <GridItem xs={12} sm={4} md={4} key={i}>
          {renderBlog(id)}
        </GridItem>
      )
    )
  }


  const renderBlog = (id) => {
      const title = details[id].title;
      const category = details[id].category;
      const subtitle = details[id].description_short;
      const url = details[id].url;
      const img = details[id].img;

    return (
      <Card blog>
        <CardHeader image>
          <Link to={url}>
            <picture>
              <source type="image/webp" srcSet={config.imagePrefix + '/images/' + img + '.tile.webp'} />
              <source type="image/jpeg" srcSet={config.imagePrefix + '/images/' + img + '.tile.jpg'} />
              <img src={config.imagePrefix + '/images/' + img + '.tile.jpg'} className={classes.listImage} alt="..." />
            </picture>
          </Link>
        </CardHeader>
        <CardBody>
          <Info>
            <h6>{category}</h6>
          </Info>
          <h4 className={classes.cardTitle}>
            <Link to={url}>
              {title}
            </Link>
          </h4>
          <p className={classes.description}>
            {subtitle}
            <Link to={url}> Read Article </Link>
          </p>
        </CardBody>
      </Card>
    )
  }

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
                renderBlogs()
              }
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SimilarArticles.propTypes = {
  name: PropTypes.string,
};
