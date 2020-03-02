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
