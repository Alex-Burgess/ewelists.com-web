import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// libs
import { useAppContext } from "libs/contextLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";


import styles from "assets/jss/material-kit-pro-react/views/editListPage/productsStyle.js";
const useStyles = makeStyles(styles);

export default function ClosedProducts(props) {
  const classes = useStyles();
  const { mobile } = useAppContext();
  const { products } = props;

  const renderDesktopProductView = () => {
    return (
      <Table
        tableHead={[
          "",
          "PRODUCT",
          "QTY",
          "RESERVED"
        ]}
        tableData={
          renderProducts()
        }
        tableShopping
        customHeadCellClasses={[
          classes.textCenter,
          classes.textCenter,
          classes.textCenter,

        ]}
        customHeadClassesForCells={[2, 3, 4]}
        customCellClasses={[
          classes.tdName,
          classes.tdNumber + " " + classes.textCenter,
          classes.tdNumber + " " + classes.textCenter,
          classes.tdNumber + " " + classes.textCenter
        ]}
        customClassesForCells={[1, 2, 3, 4]}
      />
    )
  }

  const renderMobileProductView = () => {
    return (
      <Table
        tableHead={[
          "MANAGE ITEMS"
        ]}
        tableData={
          renderMobileProducts()
        }
        tableShopping
        customHeadCellClasses={[
          classes.textCenter
        ]}
        customHeadClassesForCells={[0]}
      />
    )
  }

  const renderProducts = () => {
    const allproducts = Object.entries(products).map(
      ([key, p]) =>
            renderProduct(p['productId'], p['productUrl'], p['imageUrl'], p['brand'], p['details'], p['quantity'], p['reserved'] + p['purchased'])
    )

    return allproducts
  }

  const renderMobileProducts = () => {
    const allproducts = Object.entries(products).map(
      ([key, p]) =>
            renderMobileProduct(p['productId'], p['productUrl'], p['imageUrl'], p['brand'], p['details'], p['quantity'], p['reserved'] + p['purchased'])
    )

    return allproducts
  }

  const renderProduct = (productId, productUrl, imageUrl, brand, details, quantity, reserved) => {
    return (
      [
      <div className={classes.imgContainer} key={1}>
        <img src={imageUrl} alt="..." className={classes.img} />
      </div>,
      <span key={1}>
        {brand}
        <br />
        <small className={classes.tdNameSmall}>
          {details}
        </small>
      </span>,
      <span key={1}>
        {quantity}
      </span>,
      <span key={1}>
        {reserved}
      </span>
      ]
    )
  }

  const renderMobileProduct = (productId, productUrl, imageUrl, brand, details, quantity, reserved) => {
    return (
      [
          <div className={classes.textCenter}>
            <div className={classes.imgContainer} key={1}>
              <img src={imageUrl} alt="..." className={classes.img} />
            </div>
            <h4 className={classes.cardTitle}>
              {brand}
            </h4>
            <br />
            <small className={classes.mobileDescription}>
              {details}
            </small>
            <br />
            <small className={classes.quantities}>
              Quantity: {quantity}
            </small>
            <br />
            <small className={classes.quantities}>
              Reserved: {reserved}
            </small>
          </div>
      ]
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Card plain>
          <CardBody plain>
            {
              mobile
              ? renderMobileProductView()
              : renderDesktopProductView()
            }
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

ClosedProducts.propTypes = {
  products: PropTypes.object
};
