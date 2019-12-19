import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Edit from "@material-ui/icons/Edit";
// core components
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Sections
import SectionEdit from "./EditProductPopOut.js";

import styles from "assets/jss/custom/views/editListPage/productsStyle.js";
const useStyles = makeStyles(styles);

export default function SectionProducts(props) {
  const classes = useStyles();
  const { listId, products } = props;

  const [desktop, setDesktop] = useState(true);
  const [editPopouts, setEditPopouts] = useState({});

  useEffect( () => {
    function updateDimensions() {
      if (window.innerWidth < 600){
        setDesktop(false);
      } else {
        setDesktop(true);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  const handleEditClose = (id) => {
    setEditPopouts({
      editPopouts: update(editPopouts, {
        [id]: {$set: false}
      })
    })
  }

  const handleEditClickOpen = (id) => {
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
          "PRODUCT",
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
          classes.tdName,
          classes.tdNumber + " " + classes.textCenter,
          classes.tdNumber + " " + classes.textCenter,
          classes.tdNumber + " " + classes.textCenter,
          classes.textCenter,
        ]}
        customClassesForCells={[1, 2, 3, 4, 5]}
      />
    )
  }

  const renderMobileProductView = () => {
    return (
      <Table
        tableHead={[
          ""
        ]}
        tableData={
          renderMobileProducts()
        }
        tableShopping
      />
    )
  }

  const renderProducts = () => {
    const allproducts = Object.entries(products).map(
      ([key, p]) =>
            renderProduct(p['productId'], p['productUrl'], p['imageUrl'], p['brand'], p['details'], p['quantity'], p['reserved'])
    )

    allproducts[products.length] =
      {
        addnew: true,
        colspan: "3",
        col: {
          colspan: 3,
        }
      }

    return allproducts
  }

  const renderMobileProducts = () => {
    const allproducts = Object.entries(products).map(
      ([key, p]) =>
            renderMobileProduct(p['productId'], p['productUrl'], p['imageUrl'], p['brand'], p['details'], p['quantity'], p['reserved'])
    )

    allproducts[products.length] =
      {
        addnew: true,
        colspan: "3",
        col: {
          colspan: 3,
        }
      }

    return allproducts
  }

  const renderProduct = (productId, productUrl, imageUrl, brand, details, quantity, reserved) => {
    return (
      [
      <div className={classes.imgContainer} key={1}>
        <a href={productUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt="..." className={classes.img} />
        </a>
      </div>,
      <span key={1}>
        <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
          {brand}
        </a>
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
      </span>,
      <span>
        <Tooltip
          id="edit"
          title="Edit item"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button link className={classes.actionButton} onClick={() => handleEditClickOpen(productId)}>
            <Edit />
          </Button>
        </Tooltip>
      </span>
      ]
    )
  }

  const renderMobileProduct = (productId, productUrl, imageUrl, brand, details, quantity, reserved) => {
    return (
      [
          <div className={classes.textCenter}>
            <div className={classes.imgContainer} key={1}>
              <a href={productUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt="..." className={classes.img} />
              </a>
            </div>
            <h4 className={classes.cardTitle}>
              <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
                {brand}
              </a>
            </h4>
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
            <br />
            <Tooltip
              id="edit"
              title="Edit item"
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button link className={classes.actionButton} onClick={() => handleEditClickOpen(productId)}>
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
            handleClose={handleEditClose}
            deleteProductFromState={props.deleteProductFromState}
            updateProductToState={props.updateProductToState}
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
              desktop
              ? renderDesktopProductView()
              : renderMobileProductView()
            }

          </CardBody>
        </Card>
        {renderEditPopOuts()}
      </div>
    </div>
  );
}

SectionProducts.propTypes = {
  classes: PropTypes.object,
  listId: PropTypes.string,
  products: PropTypes.object
};
