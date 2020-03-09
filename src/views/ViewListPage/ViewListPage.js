import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import update from 'immutability-helper';
import { API } from "aws-amplify";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderScroll from "custom/Header/HeaderScroll.js";
import Parallax from "components/Parallax/Parallax.js";
import FooterDark from "custom/Footer/FooterDark.js";
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
        console.log("List ID " + listId + " does not exist for the user.")
        props.history.push('/error/' + listId);
        return false
      }

      return response;
    }

    async function getProduct(product) {
      let response;

      try {
        response = await API.get(product.type, "/" + product.productId);
      } catch (e) {
        console.log("Could not find a product in the " + product.type + " table for Id: " + product.productId)
      }

      return response;
    }

    function setListState(response) {
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
    }

    async function getProductDetails(products) {
      let productDetails = {};

      for (var key in products) {
        let product = products[key];

        const productResponse = await getProduct(product);

        product['brand'] = productResponse.brand;
        product['details'] = productResponse.details;
        product['productUrl'] = productResponse.productUrl;

        if (product.type === 'products') {
          product['imageUrl'] = productResponse.imageUrl;
        } else {
          product['imageUrl'] = config.imagePrefix + '/images/product-default.jpg';
        }

        productDetails[key] = product;
      }

      return productDetails;
    }

    const setEditListDetails = async () => {
      const response = await getList();

      setListState(response);

      let productDetails = await getProductDetails(response.products);
      setProducts(
        productDetails
      )
    };

    setEditListDetails();
    setLoaded(true);
  }, [listId, props.history]);

  const updateReservedQuantity = async (reservedQuantity, product) => {
    let productId = product['productId'];
    const new_reserved_quantity = products[productId].reserved + reservedQuantity;
    console.log("Reserved quantity increasing from " + product['reserved'] + " to " + new_reserved_quantity);

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
    console.log("Unreserving product (" + productId + ") for user (" + userId + ")");
    // console.log("reserved state: " + JSON.stringify(this.state.reserved));

    let userReservedQuantity = reserved[productId][userId].quantity;
    let productTotalReservedQuantity = products[productId].reserved;
    const reservedQuantity = productTotalReservedQuantity - userReservedQuantity;
    console.log("New product reserved quantity: " + reservedQuantity)

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
    console.log("Updating product (" + productId + ") reservation for user (" + userId + ") to " + newUserQuantity);

    let productOldReservedQuantity = products[productId].reserved;
    const productNewReservedQuantity = productOldReservedQuantity + quantityChange
    console.log("Updating product (" + productId + ") total reserved to (" + productNewReservedQuantity + ")");

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
            <MetaTags>
              <title>{title}</title>
              <meta name="og:title" content={title} />
            </MetaTags>
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
              <SectionProducts
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
