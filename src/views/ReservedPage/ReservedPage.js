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
import Manage from "custom/Reserve/Manage.js";
import Purchase from "custom/Reserve/Purchase.js";
import BackToList from "custom/Reserve/BackToList.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/reservedPage/reservedPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  const resvId = props.match.params.id;

  const [listId, setListId] = useState('');
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState({});
  const [reservedQuantity, setReservedQuantity] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [load, setLoad] = useState(false);

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
      setEmail(reservation.email);
      setName(reservation.name);
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

      setProduct(product);
      setLoad(true);
    }

    if (props.location.state) {
      const state = props.location.state;
      setListId(state.listId);
      setProductId(state.productId);
      setProduct(state.product);
      setReservedQuantity(state.reserveQuantity);
      setEmail(state.email);
      setName(state.name);
      setLoad(true);
    } else {
      getPageDetails(resvId);
    }

  }, [resvId, props.location.state]);


  return (
    <div>
      <HeaderMobileBar isAuthenticated={props.isAuthenticated} user={props.user} url={"/lists/" + listId} title='Reserved Gift' mobile={props.mobile} />
      <div className={classes.main}>
        <div className={classes.container}>
          {load
            ? <div>
                <SnackbarContent
                  message={<span><b>Thanks {name}! </b> You have reserved this gift.</span>}
                  color="success"
                  icon={Check}
                />
                <ProductDetails
                  product={product}
                  reserveQuantity={reservedQuantity}
                />
                <Purchase
                  listId={listId}
                  resvId={resvId}
                  productId={productId}
                  product={product}
                  reserveQuantity={reservedQuantity}
                  name={name}
                />
                <Manage
                  listId={listId}
                  productId={productId}
                  product={product}
                  reserveQuantity={reservedQuantity}
                  name={name}
                  email={email}
                  isAuthenticated={props.isAuthenticated}
                />
                <BackToList
                  listId={listId}
                />
              </div>
            : null
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
