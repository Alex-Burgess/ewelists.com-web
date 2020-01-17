import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Playlist from "@material-ui/icons/PlaylistAdd";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// custom components
import AddPopOut from "./AddPopOut.js";

import styles from "assets/jss/custom/components/article/productsStyle.js";
const useStyles = makeStyles(styles);

export default function Products(props) {
  const { products, lists, isAuthenticated } = props;
  const classes = useStyles();

  const [productDetails, setProductsDetails] = useState({});
  const [addPopouts, setAddPopouts] = useState({});

  useEffect( () => {
    async function getProduct(id) {
      let response;

      try {
        response = await API.get('products', "/" + id);
      } catch (e) {
        console.log("Could not find a product in the products table for id: " + id);
        return false;
      }

      return response;
    }

    async function getProductDetails(products) {
      let productDetails = {};

      for (var ref in products) {
        const productResponse = await getProduct(products[ref]);
        if (productResponse) {
          productDetails[products[ref]] = productResponse;
        }
      }

      setProductsDetails(
        productDetails
      )
    }

    getProductDetails(products);
  }, [products]);

  const handleEditClose = (id) => {
    setAddPopouts({
      addPopouts: update(addPopouts, {
        [id]: {$set: false}
      })
    })
  }

  const handleAddOpen = (id) => {
    setAddPopouts({
      ...addPopouts,
        [id]: true
    })
  }

  const renderAddPopOuts = () => {
    return Object.entries(productDetails).map(
      ([i, product]) =>
        <AddPopOut
          open={addPopouts[product['productId']]
            ? addPopouts[product['productId']]
            : false }
          lists={lists}
          product={product}
          handleClose={handleEditClose}
          key={i}
        />
    )
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <GridContainer>
            {
              Object.entries(productDetails).map(
                ([i, product]) =>
                  <GridItem xs={12} sm={4} md={4} key={i}>
                    <Card plain product className={classes.customProduct}>
                      <CardHeader noShadow image>
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                          <img src={product.imageUrl} className={classes.productImage} alt=".." />
                        </a>
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                          <h4 className={classes.cardTitle}>{product.brand}</h4>
                        </a>
                        <div className={classes.description}>
                          {product.details}
                        </div>
                      </CardHeader>
                      <CardBody plain>
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                          { product.retailer === 'amazon'
                          ? <Button className={classes.amazonButton}>
                              <i className="fab fa-amazon" /> Buy Now
                            </Button>
                          : <Button color="primary" className={classes.button}>
                              Buy Now
                            </Button>
                          }
                        </a>
                        { isAuthenticated
                        ? <Button color="info" className={classes.button} onClick={() => handleAddOpen(product.productId)}>
                             <Playlist /> Add To List
                           </Button>
                        : <a href="/signup" target="_blank" rel="noopener noreferrer">
                            <Button color="info" className={classes.button}>
                             Sign up to Create List
                           </Button>
                         </a>
                        }
                      </CardBody>
                    </Card>
                  </GridItem>
              )
            }
          </GridContainer>
        </GridItem>
      </GridContainer>
      {renderAddPopOuts()}
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.array,
  lists: PropTypes.object,
  isAuthenticated: PropTypes.bool
};
