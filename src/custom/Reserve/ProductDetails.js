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

import styles from "assets/jss/custom/components/reserve/productDetailsStyle.js";
const useStyles = makeStyles(styles);

export default function ProductDetails(props) {
  const classes = useStyles();

  const { product, reservedQuantity, productQuantity, remainingQuantity } = props;

  return (
    <div className={classes.section}>
        <GridContainer>
          <GridItem md={3} sm={3} xs={5} className={classes.leftGrid} >
            <Card plain product className={classes.imageWrapper}>
              <CardHeader noShadow image>
                <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                  <img src={product['imageUrl']} className={classes.image} alt=".." />
                </a>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem md={7} sm={7} xs={7} className={classes.rightGrid + " " + classes.detailsWrapper}>
            <div>
              <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                <h4 className={classes.brand}>{product['brand']}</h4>
              </a>
              <p className={classes.description}>
                {product['details']}
              </p>
              {productQuantity > 1
                ? <h6 className={classes.quantity}>
                    {remainingQuantity} remaining - You reserved {reservedQuantity}
                  </h6>
                : <h6 className={classes.quantity}>
                    Quantity: {reservedQuantity}
                  </h6>
              }
            </div>
          </GridItem>
        </GridContainer>
      <hr />
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object,
  reservedQuantity: PropTypes.number,
  productQuantity: PropTypes.number,
  remainingQuantity: PropTypes.number
};
