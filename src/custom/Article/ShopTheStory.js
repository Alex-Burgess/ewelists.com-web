import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/custom/components/shopTheStoryStyle.js";
const useStyles = makeStyles(styles);

export default function ShopTheStory(props) {
  const { products } = props;
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <h3 className={classes.title}>Shop The Story</h3>

          <GridContainer>
            {
              products.map (
                (product, i) =>
                  <GridItem md={4} sm={4} key={i}>
                    <Card plain product>
                      <CardHeader noShadow image>
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                          <img src={product.img} className={classes.productImage} alt=".." />
                        </a>
                      </CardHeader>
                      <CardBody plain>
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                          <h4 className={classes.cardTitle}>{product.brand}</h4>
                        </a>
                        <p className={classes.description}>
                          {product.description}
                        </p>
                        <div className={classes.priceContainer}>
                          <span className={classes.price}> {product.price}</span>
                        </div>
                      </CardBody>
                    </Card>
                  </GridItem>
              )
            }
          </GridContainer>
          <br />
        </GridItem>
      </GridContainer>
    </div>
  );
}

ShopTheStory.propTypes = {
  products: PropTypes.array,
};
