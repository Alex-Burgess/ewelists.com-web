import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Check from "@material-ui/icons/Check";
// core components
import HeaderMobileBar from "custom/Header/HeaderMobileBar.js";
import Footer from "custom/Footer/FooterGrey.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// custom components
import ProductDetails from "custom/Reserve/ProductDetails.js";

import styles from "assets/jss/custom/views/reservedPage/reservedPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const product = props.location.state.product;
  const reserveQuantity = props.location.state.reserveQuantity;
  const name = props.location.state.name;

  return (
    <div>
      <HeaderMobileBar user={props.user} name='Reserved Gift' url={"/lists/" + listId} />
      <div className={classes.main}>
        <div className={classes.container}>
          <SnackbarContent
            message={<span><b>Thanks {name}! </b> This gift was unreserved.</span>}
            color="success"
            icon={Check}
          />
          <ProductDetails
            product={product}
            reserveQuantity={reserveQuantity}
          />
          <a href={"/lists/" + listId} className={classes.mobileHide}>
           <Button color="primary" simple className={classes.backButton}>
             <ArrowBackIos /> Back to list
           </Button>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
