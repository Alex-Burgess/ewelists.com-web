import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import shopTheStoryStyle from "assets/jss/custom/components/shopTheStoryStyle.jsx";

function ShopTheStory(props) {
  const { classes, products } = props;

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
  classes: PropTypes.object.isRequired,
  products: PropTypes.array,
};

export default withStyles(shopTheStoryStyle)(ShopTheStory);
