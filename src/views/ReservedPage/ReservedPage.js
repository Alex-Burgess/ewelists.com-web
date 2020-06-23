import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// libs
import { onError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderMobileBar from "components/Header/HeaderMobileBar.js";
import Footer from "components/Footer/FooterDark.js";
// custom components
import ProductDetails from "./Sections/ProductDetails.js";
import Manage from "./Sections/Manage.js";
import Purchase from "./Sections/Purchase.js";
import BackToList from "./Sections/BackToList.js";
import Unreserved from "./Sections/Unreserved.js";
import Cancelled from "./Sections/Cancelled.js";
import Purchased from "./Sections/Purchased.js";
import Confirmed from "./Sections/Confirmed.js";
import Closed from "./Sections/Closed.js";
import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/views/reservedPageStyle.js";
const useStyles = makeStyles(styles);


export default function EditPage(props) {
  const classes = useStyles();

  const resvId = props.match.params.id;

  // Page scenarios
  const [reserved, setReserved] = useState(false);
  const [unreserved, setUnreserved] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [closed, setClosed] = useState(false);

  const [listId, setListId] = useState('');
  const [listTitle, setListTitle] = useState('');
  const [product, setProduct] = useState({});
  const [reservedQuantity, setReservedQuantity] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productReserved, setProductReserved] = useState(0);
  const [productPurchased, setProductPurchased] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [load, setLoad] = useState(false);

  useEffect( () => {
    async function getProduct(id, type) {
      let response;

      try {
        response = await API.get(type, "/" + id);
      } catch (e) {
        onError("Could not find a product in the " + type + " table for Id: " + id)
      }

      return response;
    }

    async function getList(listId) {
      let response;
      try {
        response = await API.get("lists", "/" + listId + "/shared");
      } catch (e) {
        onError("List ID " + listId + " does not exist for the user.")
        return false
      }

      return response;
    }

    async function getReservation(resvId) {
      let response;
      try {
        response = await API.get("lists", "/reservation/" + resvId);
      } catch (e) {
        onError("Reservation ID " + resvId + " does not exist.")
        return false
      }

      return response;
    }

    const getPageDetails = async (resvId) => {
      // Get reservation details
      const reservation = await getReservation(resvId);

      if (reservation) {
        setEmail(reservation.email);
        setName(reservation.name);
        setListId(reservation.listId);
        setListTitle(reservation.title);
        setReservedQuantity(reservation.quantity);
      } else {
          props.history.push('/error/' + resvId);
          return false
      }

      // Get product details
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

      // Get product quantities
      const list = await getList(reservation.listId);
      if (list) {
        setListTitle(list.list.title);
        const product_quantities = list.products[reservation.productId];
        setProductQuantity(product_quantities['quantity'])
        setProductReserved(product_quantities['reserved'])
        setProductPurchased(product_quantities['purchased'])
      } else {
        reservation['state'] = 'error';
      }


      switch (reservation.state) {
        case "error":
          setClosed(true);
          break;
        case "reserved":
          setReserved(true);
          break;
        case "unreserved":
          setUnreserved(true);
          break;
        case "cancelled":
          setCancelled(true);
          break;
        case "purchased":
          setConfirmed(true);
          break;
        default:
          break;
      }

      setLoad(true);
    }

    getPageDetails(resvId);

  }, [resvId, props.location.state, props.history]);


  return (
    <div>
      <HeaderMobileBar isAuthenticated={props.isAuthenticated} user={props.user} url={"/lists/" + listId} title='Reserved Gift' mobile={props.mobile} />
      <div className={classes.main}>
        <div className={classes.container}>
          {load
            ? <div>
                <h2 className={classes.title + " " + classes.textCenter}> Reservation </h2>
                <ProductDetails
                  product={product}
                  reservedQuantity={reservedQuantity}
                  productQuantity={productQuantity}
                  remainingQuantity={productQuantity - productReserved - productPurchased}
                />
              {reserved
                  ? <div>
                      <Purchase
                        resvId={resvId}
                        listTitle={listTitle}
                        name={name}
                        reservedQuantity={reservedQuantity}
                        product={product}
                        email={email}
                        setPurchased={setPurchased}
                        setReserved={setReserved}
                        setConfirmed={setConfirmed}
                        setCancelled={setCancelled}
                      />
                      <Manage
                        resvId={resvId}
                        product={product}
                        reservedQuantity={reservedQuantity}
                        productQuantity={productQuantity}
                        productReserved={productReserved}
                        productPurchased={productPurchased}
                        name={name}
                        email={email}
                        setUnreserved={setUnreserved}
                        setReserved={setReserved}
                        setConfirmed={setConfirmed}
                        setCancelled={setCancelled}
                        setReservedQuantity={setReservedQuantity}
                        setProductReserved={setProductReserved}
                      />
                    </div>
                  : null
                }
                {purchased
                  ? <Purchased
                      listId={listId}
                      listTitle={listTitle}
                    />
                  : null
                }
                {unreserved
                  ? <Unreserved listId={listId} listTitle={listTitle}/>
                  : null
                }
                {cancelled
                  ? <Cancelled listId={listId} listTitle={listTitle}/>
                  : null
                }
                {confirmed
                  ? <Confirmed listId={listId} listTitle={listTitle}/>
                  : null
                }
                {closed
                  ? <Closed listId={listId} listTitle={listTitle}/>
                  : null
                }
                <BackToList listId={listId}/>
              </div>
            : null
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
