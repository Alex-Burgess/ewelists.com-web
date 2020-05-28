import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { API } from "aws-amplify";
// libs
import { onError, debugError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderScroll from "custom/Header/HeaderScroll.js";
import Parallax from "components/Parallax/Parallax.js";
import FooterDark from "custom/Footer/FooterDark.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// sections for this page
import SectionProducts from "./Sections/Products.js";
import SectionListDetails from "./Sections/ListDetails.js";

import config from 'config.js';
import styles from "assets/jss/custom/views/viewListPage/viewListPageStyle.js";
const useStyles = makeStyles(styles);

export default function ViewList(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const userId = props.user.sub;

  const [loaded, setLoaded] = useState(false);
  const [closed, setClosed] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState({});
  const [reserved, setReserved] = useState({});

  useEffect( () => {
    async function getList() {
      let response;
      try {
        response = await API.get("lists", "/" + listId + "/shared");
      } catch (e) {
        onError("List ID " + listId + " does not exist for the user " + props.user.sub + ". Error: " + e.response.data.error);
        return false
      }

      return response;
    }

    async function getProduct(product) {
      let response;

      try {
        response = await API.get(product.type, "/" + product.productId);
      } catch (e) {
        onError("Could not find a product in the " + product.type + " table for Id: " + product.productId + ". Error: " + e.response.data.error);
      }

      return response;
    }

    function setListState(response) {
      props.setTitle(response.list.title);
      setTitle(response.list.title);
      setDescription(response.list.description);
      setOccasion(response.list.occasion);
      setImageUrl(response.list.imageUrl);
      setReserved(response.reserved);

      if (('eventDate' in response.list) && (response.list.eventDate !== 'None')) {
        setDate(response.list.eventDate);
      } else {
        setDate('');
      }

      if (response.list.state === 'closed') {
          setClosed(response.list.state);
      }
    }

    async function getProductDetails(products) {
      let productDetails = {};

      for (var key in products) {
        let product = products[key];

        const productResponse = await getProduct(product);

        if (productResponse) {
          product['brand'] = productResponse.brand;
          product['details'] = productResponse.details;
          product['productUrl'] = productResponse.productUrl;

          if (product.type === 'products') {
            product['imageUrl'] = productResponse.imageUrl;
          } else {
            product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
          }

        if (productResponse.price) {
          product['price'] = productResponse.price;
        }

        productDetails[key] = product;
      }

      return productDetails;
    }

    const setEditListDetails = async () => {
      const response = await getList();

      if (response) {
          setListState(response);

          let productDetails = await getProductDetails(response.products);
          setProducts(
            productDetails
          )

          setLoaded(true);
      } else {
          props.history.push('/error/' + listId);
      }
    };

    setEditListDetails();
  }, [listId, props, props.history]);

  const updateReservedQuantity = async (reservedQuantity, product) => {
    let productId = product['productId'];
    const new_reserved_quantity = products[productId].reserved + reservedQuantity;
    debugError("Reserved quantity increasing from " + product['reserved'] + " to " + new_reserved_quantity);

    let userReservedObject = {
      [userId] : {
        productId: productId,
        quantity: reservedQuantity,
        userId: userId,
      }
    }

    setReserved(
      update(reserved, {
        [productId]: {$set: userReservedObject}
      })
    )

    setProducts(
      update(products, {
        [productId]: {
          reserved: {$set: new_reserved_quantity}
        }
      })
    )
  }

  const unreserveProduct = async (product) => {
    let productId = product['productId'];
    debugError("Unreserving product (" + productId + ") for user (" + userId + ")");

    let userReservedQuantity = reserved[productId][userId].quantity;
    let productTotalReservedQuantity = products[productId].reserved;
    const reservedQuantity = productTotalReservedQuantity - userReservedQuantity;
    debugError("New product reserved quantity: " + reservedQuantity);

    setReserved(
      update(reserved, {
        [productId]: {$unset: [userId]}
      })
    )

    setProducts(
      update(products, {
        [productId]: {
          reserved: {$set: reservedQuantity}
        }
      })
    )
  }

  const updateUserReservation = async (newUserQuantity, product) => {
    let productId = product['productId'];

    let userOldReservedQuantity = reserved[productId][userId].quantity;
    const quantityChange = newUserQuantity - userOldReservedQuantity
    debugError("Updating product (" + productId + ") reservation for user (" + userId + ") to " + newUserQuantity);

    let productOldReservedQuantity = products[productId].reserved;
    const productNewReservedQuantity = productOldReservedQuantity + quantityChange
    debugError("Updating product (" + productId + ") total reserved to (" + productNewReservedQuantity + ")");

    setReserved(
      update(reserved, {
        [productId]: {
          [userId]: {$merge: {
              quantity: newUserQuantity
            }
          }
        }
      })
    )

    setProducts(
      update(products, {
        [productId]: {
          reserved: {$set: productNewReservedQuantity}
        }
      })
    )
  }

  return (
    <div>
      {loaded
        ? <div>
            <HeaderScroll isAuthenticated={props.isAuthenticated} user={props.user}/>
            <Parallax filter="info" className={classes.articleBg}>
            </Parallax>
            <div className={classes.main}>
              <SectionListDetails
                title={title}
                description={description}
                occasion={occasion}
                date={date}
                imageUrl={imageUrl}
              />
              {closed
                ? <div className={classes.bannerWrapper}>
                    <SnackbarContent
                      message={
                        <span className={classes.message}>
                          This list is now closed.
                        </span>
                      }
                      color="warning"
                      icon="info_outline"
                    />
                  </div>
                : <SectionProducts
                    products={products}
                    reserved={reserved}
                    userId={userId}
                    listId={listId}
                    listTitle={title}
                    user={props.user}
                    updateReservedQuantity={updateReservedQuantity}
                    unreserveProduct={unreserveProduct}
                    updateUserReservation={updateUserReservation}
                  />
              }
            </div>
            <div className={classes.spacer}>
            </div>
            <FooterDark />
          </div>
        : null
      }
    </div>
  );
}
