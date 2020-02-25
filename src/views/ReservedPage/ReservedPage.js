import React from 'react';
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

import styles from "assets/jss/custom/views/reservedPage/reservedPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const productId = props.location.state.productId;
  const product = props.location.state.product;
  const reserveQuantity = props.location.state.reserveQuantity;
  const email = props.location.state.email;
  const name = props.location.state.name;
  // const productId = '12345678-blog-e003-1234-abcdefghijkl';


  return (
    <div>
      <HeaderMobileBar user={props.user} name='Reserved Gift' url={"/lists/" + listId} />
      <div className={classes.main}>
        <div className={classes.container}>
          <SnackbarContent
            message={<span><b>Thanks {name}! </b> You have reserved this gift.</span>}
            color="success"
            icon={Check}
          />
          <ProductDetails
            product={product}
            reserveQuantity={reserveQuantity}
          />
          <Purchase
            listId={listId}
            productId={productId}
            product={product}
            reserveQuantity={reserveQuantity}
            name={name}
          />
          <Manage
            listId={listId}
            productId={productId}
            product={product}
            reserveQuantity={reserveQuantity}
            name={name}
            email={email}
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
