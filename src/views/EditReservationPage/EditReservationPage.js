import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "custom/Header/HeaderFixed.js";
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
  const userId = props.user.sub;

  const [product, setProduct] = useState({});
  const [reservedQuantity, setReservedQuantity] = useState(0);

  // We don't need user details as user will be required to sign in.
  // TODO make sure user is signed in and if not forward to login page.

  // Flow:
  // 1. Call api to unencrypt parameters
  // 2. If user has account, check they have auth session, if not, forward to login page with message.
  // const exists = true;
  const productId = '12345678-blog-e002-1234-abcdefghijkl';
  const productType = 'products'
  // const productType = 'notfound'

  // 3. If user does not have account, the parameters will also contain information about user.
  // Unreserve call should have the state it requires.  name and email props below will need to be updated to be common.
  // const exists = false;
  // const productId = '12345678-blog-e002-1234-abcdefghijkl';
  // const productType = 'products'
  // const productType = 'notfound'
  // email = 'test.user@gmail.com'
  // name = 'Test User'



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
      const response = await getList(listId);
      const quantity = response.reserved[productId][userId]['quantity'];
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
      <Header isAuthenticated={props.isAuthenticated} user={props.user} mobile={props.mobile}/>
      <div className={classes.main}>
        <div className={classes.container}>
          <h2 className={classes.title + " " + classes.textCenter}> Edit Reservation</h2>
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
