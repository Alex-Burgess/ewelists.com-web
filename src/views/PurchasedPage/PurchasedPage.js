import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { API } from "aws-amplify";
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

import styles from "assets/jss/custom/views/purchasedPage/purchasedPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const product = props.location.state.product;
  const reserveQuantity = props.location.state.reserveQuantity;

  return (
    <div>
      <HeaderMobileBar user={props.user} name='Purchase Confirmation' url={"/lists/" + listId} />
      <div className={classes.main}>
        <div className={classes.container}>
          <SnackbarContent
            message={<span><b>Thanks Person, </b> for confirming you purchased this gift.</span>}
            color="success"
            icon={Check}
          />
          <ProductDetails
            product={product}
            reserveQuantity={reserveQuantity}
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
