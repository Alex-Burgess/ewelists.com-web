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
import Purchase from "custom/Reserve/Purchase.js";
import BackToList from "custom/Reserve/BackToList.js";
import Unreserved from "custom/Reserve/Unreserved.js";
import Cancelled from "custom/Reserve/Cancelled.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/reservedPage/reservedPageStyle.js";
const useStyles = makeStyles(styles);


export default function EditPage(props) {
  const classes = useStyles();

  const resvId = props.match.params.id;

  // Page scenarios
  const [reserved, setReserved] = useState(false);
  const [unreserved, setUnreserved] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const [listId, setListId] = useState('');
  const [listTitle, setListTitle] = useState('');
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

      switch (reservation.state) {
        case "reserved":
          setReserved(true);
          break;
        case "unreserved":
          setUnreserved(true);
          break;
        case "cancelled":
          setCancelled(true);
          break;
        default:
          setCancelled(true);
          break;
      }

      setEmail(reservation.email);
      setName(reservation.name);
      setListId(reservation.listId);
      setListTitle(reservation.title);
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

    getPageDetails(resvId);

  }, [resvId, props.location.state]);


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
                  reserveQuantity={reservedQuantity}
                />
              {reserved
                  ? <div>
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
                        setUnreserveConfirmed={setUnreserved}
                        setReservationConfirmed={setReserved}
                      />
                      <BackToList
                        listId={listId}
                      />
                    </div>
                  : null
                }
                {unreserved
                  ? <Unreserved
                      listId={listId}
                      listTitle={listTitle}
                      />
                  : null
                }
                {cancelled
                  ? <Cancelled
                      listId={listId}
                      listTitle={listTitle}
                      />
                  : null
                }
              </div>
            : null
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
