import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import HeaderMobileBar from "custom/Header/HeaderMobileBar.js";
import Footer from "custom/Footer/FooterGrey.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// custom components
import ProductDetails from "custom/Reserve/ProductDetails.js";
import BackToList from "custom/Reserve/BackToList.js";
import Message from "custom/Reserve/Message.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/purchasedPage/purchasedPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  // const listId = props.match.params.id;
  // const product = props.location.state.product;
  // const reserveQuantity = props.location.state.reserveQuantity;

  const resvId = props.match.params.id;

  const [listId, setListId] = useState('');
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState({});
  const [reservedQuantity, setReservedQuantity] = useState(0);

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

    async function getReservation(resvId) {
      let response;
      try {
        response = await API.get("lists", "/reservation/" + resvId);
      } catch (e) {
        console.log("Reservation ID " + resvId + " does not exist.")
        // props.history.push('/error/' + listId);
        return false
      }

      return response;
    }

    const getPageDetails = async (resvId) => {
      const reservation = await getReservation(resvId);
      setListId(reservation.listId);
      setProductId(reservation.productId);
      setReservedQuantity(reservation.quantity);

      const product_response = await getProduct(reservation.productId, reservation.productType);
      let product = {};

      product['brand'] = product_response.brand;
      product['details'] = product_response.details;
      product['productUrl'] = product_response.productUrl;

      if (reservation.productType === 'products') {
        product['imageUrl'] = product_response.imageUrl;
      } else {
        product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
      }

      setProduct(product)
    }

    getPageDetails(resvId);
  }, [resvId, props.history]);

  return (
    <div>
      <HeaderMobileBar isAuthenticated={props.isAuthenticated} user={props.user} url={"/lists/" + listId} title='Purchase Confirmation' mobile={props.mobile} />
      <div className={classes.main}>
        <div className={classes.container}>
          <h2 className={classes.title + " " + classes.textCenter}> Edit Reservation</h2>
          <SnackbarContent
            message={<span><b>Thanks Person, </b> for confirming you purchased this gift.</span>}
            color="success"
            icon={Check}
          />
          <ProductDetails
            product={product}
            reserveQuantity={reservedQuantity}
          />
          <Message />
          <BackToList
            listId={listId}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
