import React, { useState } from 'react';
import update from 'immutability-helper';
import FadeLoader from "react-spinners/FadeLoader";
// libs
import { useAppContext } from "libs/contextLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Edit from "@material-ui/icons/Edit";
import Playlist from "@material-ui/icons/PlaylistAdd";
// core components
import Table from "components/Table/Table.js";
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Sections
import SectionEdit from "./EditProductPopOut.js";

import styles from "assets/jss/material-kit-pro-react/views/editListPage/productsStyle.js";
const useStyles = makeStyles(styles);

export default function SectionProducts(props) {
  const classes = useStyles();
  const { breakpoint } = useAppContext();
  const { listId, products, loading, deleteProductFromState, updateProductToState, switchToAddProduct } = props;

  const [editPopouts, setEditPopouts] = useState({});

  const handleClose = (id) => {
    setEditPopouts({
      editPopouts: update(editPopouts, {
        [id]: {$set: false}
      })
    })
  }

  const handleOpen = (id) => {
    setEditPopouts({
      ...editPopouts,
        [id]: true
    })
  }

  const renderDesktopProductView = () => {
    return (
      <Table
        tableHead={[
          "",
          "GIFTS",
          "QTY",
          "RESERVED",
          ""
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
          classes.tdImage,
          classes.tdName,
          classes.tdNumber + " " + classes.textCenter,
          classes.tdNumber + " " + classes.textCenter,
          classes.textCenter
        ]}
        customClassesForCells={[0, 1, 2, 3, 4]}
        dataCy="table-edit-products"
      />
    )
  }

  const renderMobileProductView = () => {
    return (
      <Table
        tableHead={[
          "MANAGE GIFTS"
        ]}
        tableData={
          renderMobileProducts()
        }
        tableShopping
        customHeadCellClasses={[
          classes.textCenter
        ]}
        customHeadClassesForCells={[0]}
        data-cy="table-edit-products"
      />
    )
  }

  const renderProducts = () => {
    const allproducts = Object.entries(products).map(
        ([key, p]) =>
              renderProduct(p['productId'], p['productUrl'], p['imageUrl'], p['brand'], p['details'], p['quantity'], p['reserved'] + p['purchased'], p['price'])
      );

    return allproducts
  }

  const renderMobileProducts = () => {
    const allproducts = Object.entries(products).map(
      ([key, p]) =>
            renderMobileProduct(p['productId'], p['productUrl'], p['imageUrl'], p['brand'], p['details'], p['quantity'], p['reserved'] + p['purchased'], p['price'])
    )

    return allproducts
  }

  const renderProduct = (productId, productUrl, imageUrl, brand, details, quantity, reserved, price) => {
    return (
      [
      <div className={classes.imgContainer} key={1} id={productId}>
        <button onClick={() => handleOpen(productId)} className={classes.undoButton} data-cy="link-image">
          <img src={imageUrl} alt="..." className={classes.img} />
        </button>
      </div>,
      <span key={1}>
        <button onClick={() => handleOpen(productId)} className={classes.brand} data-cy="link-brand">
          {brand}
        </button>
        <br />
        <small className={classes.tdNameSmall}>
          {details}
        </small>
        {price
          ? <div className={classes.price}>
              £ {price}
            </div>
          : null
        }
      </span>,
      <span key={1}>
        {quantity}
      </span>,
      <span key={1}>
        {reserved}
      </span>,
      <span>
        <Tooltip
          id="edit"
          title="Edit item"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button link className={classes.actionButton} onClick={() => handleOpen(productId)} data-cy="link-edit">
            <Edit />
          </Button>
        </Tooltip>
      </span>
      ]
    )
  }

  const renderMobileProduct = (productId, productUrl, imageUrl, brand, details, quantity, reserved, price) => {
    return (
      [
          <div className={classes.textCenter} id={productId}>
            <div className={classes.imgContainer} key={1}>
              <button onClick={() => handleOpen(productId)} className={classes.undoButton} data-cy="link-image">
                <img src={imageUrl} alt="..." className={classes.img} />
              </button>
            </div>
            <button onClick={() => handleOpen(productId)} className={classes.undoButton} data-cy="link-brand">
              <h4 className={classes.brand}>
                {brand}
              </h4>
            </button>
            <br />
            <small className={classes.mobileDescription}>
              {details}
            </small>
            {price
              ? <div className={classes.price}>
                  £ {price}
                </div>
              : null
            }
            <br />
            <small className={classes.quantities}>
              Quantity: {quantity}
            </small>
            <br />
            <small className={classes.quantities}>
              Reserved: {reserved}
            </small>
            <br />
            <Tooltip
              id="edit"
              title="Edit item"
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button link className={classes.actionButton} onClick={() => handleOpen(productId)} data-cy="link-edit">
                <Edit />
              </Button>
            </Tooltip>
          </div>
      ]
    )
  }

  const renderEditPopOuts = () => {
    return Object.entries(products).map(
      ([key, product]) =>
          <SectionEdit
            open={editPopouts[product['productId']]
              ? editPopouts[product['productId']]
              : false }
            listId={listId}
            product={product}
            handleClose={handleClose}
            deleteProductFromState={deleteProductFromState}
            updateProductToState={updateProductToState}
            key={key}
          />
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Card plain>
          <CardBody plain>
            {
              breakpoint === 'xs' || breakpoint === 'sm'
              ? renderMobileProductView()
              : renderDesktopProductView()
            }
            {loading
              ? <div className={classes.loading}>
                  <FadeLoader
                    size={50}
                    color={"#9a9a9a"}
                    loading={true}
                  />
                </div>
              : null
            }
            <div className={classes.addItemButton}>
              <Button round color="primary" onClick={() => switchToAddProduct(1)} data-cy="button-add-item">
                <Playlist /> Add Item
              </Button>
            </div>

          </CardBody>
        </Card>
        {renderEditPopOuts()}
      </div>
    </div>
  );
}

SectionProducts.propTypes = {
  loading: PropTypes.bool,
  listId: PropTypes.string,
  products: PropTypes.object,
  deleteProductFromState: PropTypes.func,
  updateProductToState: PropTypes.func,
  switchToAddProduct: PropTypes.func
};
