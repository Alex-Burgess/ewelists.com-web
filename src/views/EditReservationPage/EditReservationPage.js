import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderMobileBar from "custom/Header/HeaderMobileBar.js";
import Footer from "custom/Footer/FooterGrey.js";
// custom components
import ProductDetails from "custom/Reserve/ProductDetails.js";
import Manage from "custom/Reserve/Manage.js";
import BackToList from "custom/Reserve/BackToList.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/editReservationPage/editReservationPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const userId = props.userSub;

  const [product, setProduct] = useState({});
  const [reservedQuantity, setReservedQuantity] = useState(0);

  // We don't need user details as user will be required to sign in.
  // TODO make sure user is signed in and if not forward to login page.
  // const exists = true;
  const productId = '12345678-blog-e002-1234-abcdefghijkl';
  const productType = 'products'
  // const productType = 'notfound'


  // TODO - getting inconistent userSub state for some reason.
  // Header bar is also showing as signed out, when actually logged in.
  // If we comment out the section below
  useEffect( () => {
    async function getList(listId) {
      let response;
      try {
        response = await API.get("lists", "/" + listId + "/shared");
      } catch (e) {
        console.log("List ID " + listId + " does not exist for the user.")
        props.history.push('/error/' + listId);
        return false
      }

      return response;
    }

    const getListDetails = async (listId) => {
      console.log("Getting list: " + listId)
      const response = await getList(listId);
      // console.log("Response: " + JSON.stringify(response));
      console.log("Getting quantity. ProductId: " + productId + " userId: " + userId);
      const quantity = response.reserved[productId][userId]['quantity'];
      console.log("Quantity: " + quantity)
      setReservedQuantity(quantity)
    }

    getListDetails(listId);
  }, [listId, userId, props.history]);

  useEffect( () => {
    async function getProduct(id, type) {
      let response;

      try {
        response = await API.get(type, "/" + id);
      } catch (e) {
        console.log("Could not find a product in the " + type + " table for Id: " + id)
      }

      return response;
    }

    const getProductDetails = async (productId, productType) => {
      let product = {};
      const response = await getProduct(productId, productType);

      product['brand'] = response.brand;
      product['details'] = response.details;
      product['productUrl'] = response.productUrl;

      if (productType === 'products') {
        product['imageUrl'] = response.imageUrl;
      } else {
        product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
      }

      setProduct(product)
    }

    getProductDetails(productId, productType);
  }, [productId, productType]);

  return (
    <div>
      <HeaderMobileBar user={props.user} name='Edit Reservation' url={"/lists/" + listId} />
      <div className={classes.main}>
        <div className={classes.container}>
          <h2 className={classes.title + " " + classes.textCenter + " " + classes.mobileHide}> Edit Reservation</h2>
          <ProductDetails
            product={product}
            reserveQuantity={reservedQuantity}
          />
          <Manage
            listId={listId}
            productId={productId}
            product={product}
            reserveQuantity={reservedQuantity}
            name={props.user.name}
            email={props.user.email}
            isAuthenticated={props.isAuthenticated}
          />
          <BackToList
            listId={listId}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
