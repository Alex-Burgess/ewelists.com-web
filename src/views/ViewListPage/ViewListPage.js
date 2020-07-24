import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
// libs
import { debugError } from "libs/errorLib";
import { getSharedList, getProducts } from "libs/apiLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderTransparent from "components/Header/HeaderTransparent.js";
import Parallax from "components/Parallax/Parallax.js";
import FooterDark from "components/Footer/FooterDark.js";
// sections for this page
import SectionProducts from "./Sections/Products.js";
import SectionListDetails from "./Sections/ListDetails.js";
import SectionClosed from "./Sections/Closed.js";

import styles from "assets/jss/material-kit-pro-react/views/viewListPage/viewListPageStyle.js";
const useStyles = makeStyles(styles);

export default function ViewList(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const userId = props.user.sub;

  const [listLoaded, setListLoaded] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [closed, setClosed] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState({});
  const [reserved, setReserved] = useState({});

  useEffect( () => {
    function setListState(response) {
      props.setTabTitle(response.list.title);
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

    const getListDetails = async () => {
      try {
          const response = await getSharedList(listId);

          setListState(response);
          setListLoaded(true);
          setProductsLoading(true);

          let productDetails = await getProducts(response.products);
          setProducts(
            productDetails
          )

          setProductsLoading(false);
      } catch (e) {
        props.history.push('/error/' + listId);
      }
    };

    getListDetails();
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
      <HeaderTransparent isAuthenticated={props.isAuthenticated} user={props.user}  mobile={props.mobile} tablet={props.tablet}/>
      <Parallax className={classes.articleBg} />
      <div className={classes.main}>
        {listLoaded
          ? <SectionListDetails
              title={title}
              description={description}
              occasion={occasion}
              date={date}
              imageUrl={imageUrl}
            />
          : null
        }
        { closed
          ? <SectionClosed />
          : <SectionProducts
              loading={productsLoading}
              products={products}
              reserved={reserved}
              userId={userId}
              listId={listId}
              listTitle={title}
              user={props.user}
              isAuthenticated={props.isAuthenticated}
              cookiesAllowed={props.cookiesAllowed}
              updateReservedQuantity={updateReservedQuantity}
              unreserveProduct={unreserveProduct}
              updateUserReservation={updateUserReservation}
            />
        }
      </div>
      <div className={classes.spacer} />
      <FooterDark />
    </div>
  );
}
