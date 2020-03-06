import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/custom/views/editListPage/editProductPopOutStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function SectionDetails(props) {
  const classes = useStyles();
  const { open, listId, product } = props;
  const [editError, setEditError] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  const totalReserved = product['reserved'] + product['purchased'];

  useEffect(() => {
    setNewQuantity(product['quantity'])
  }, [product])

  const decreaseQuantity = () => {
    var quantity = newQuantity;

    if (quantity > 1 && quantity > totalReserved ) {
      quantity = quantity - 1;
    }

    setNewQuantity(quantity);
  }

  const closeEditPopOut = () => {
    setNewQuantity(product['quantity']);
    props.handleClose(product['productId']);
  }

  const deleteProduct = async () => {
    let productId = product['productId'];
    let type = product['type'];

    const reservedQuantity = product['reserved'] + product['purchased'];

    if (reservedQuantity > 0) {
      console.log("Reserved number: " + reservedQuantity);
      setEditError('Item has been reserved, so will not be removed from your list. You can edit the quantity if required.');
      return false
    } else {
      console.log("Deleting product (" + productId + ") of type (" + type + ") from list (" + listId + ").");
    }


    try {
      await API.del("lists", "/" + listId + "/product/" +  productId);
    } catch (e) {
      console.log('Unexpected error occurred when adding product to list: ' + e.response.data.error);
      setEditError('Item could not be deleted from your list.');
      return false
    }

    console.log("Deleted product from list: " + productId);

    if (type === 'notfound'){
      // Delete product from table
      try {
        await API.del("notfound", "/" + productId);
      } catch (e) {
        console.log('Unexpected error occurred when deleting product: ' + e.response.data.error);
        setEditError('Product could not be deleted.');
        return false
      }

      console.log("Deleted product from notfound table: " + productId);
    }

    props.deleteProductFromState(productId);
    props.handleClose(productId);
  }

  const updateProduct = async () => {
    let productId = product['productId'];
    let quantity = product['quantity'];
    console.log("Updating product (" + productId + ") for list (" + listId + ")");

    if (quantity === newQuantity) {
      setEditError('There are no updates to this item.');
      return false;
    }

    try {
      await API.put("lists", "/" + listId + "/product/" +  productId, {
        body: { "quantity": newQuantity }
      });
    } catch (e) {
      console.log('Unexpected error occurred when creating product: ' + e);
      setEditError('Product could not be updated.');
      return false
    }

    product['quantity'] =newQuantity

    props.updateProductToState(product)
    props.handleClose(productId);
  }

  const allButtons = () => {
    return (
      <div>
        <InputLabel className={classes.label}>
          Quantity:
          <Button color="primary" size="sm" simple onClick={() => decreaseQuantity()}>
            <Remove />
          </Button>
          {` `}{newQuantity}{` `}
        <Button color="primary" size="sm" simple onClick={() => setNewQuantity(newQuantity + 1)}>
            <Add />
          </Button>
        </InputLabel>
        <Button round type="submit" onClick={() => deleteProduct()}>
          Delete
        </Button>
        <Button round color="primary" type="submit" onClick={() => updateProduct()}>
          Update
        </Button>
      </div>
    )
  }

  const editButtons = () => {
    return (
      <div>
        <InputLabel className={classes.label}>
          Quantity:
          <Button color="primary" size="sm" simple onClick={() => decreaseQuantity()}>
            <Remove />
          </Button>
          {` `}{newQuantity}{` `}
        <Button color="primary" size="sm" simple onClick={() => setNewQuantity(newQuantity + 1)}>
            <Add />
          </Button>
        </InputLabel>
        <Button round color="primary" type="submit" onClick={() => updateProduct()}>
          Update
        </Button>
      </div>
    )
  }

  return (
    <div className={classes.section}>
      {/* NOTICE MODAL START */}
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => closeEditPopOut()}
        aria-labelledby="notice-modal-slide-title"
        aria-describedby="notice-modal-slide-description"
      >
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => closeEditPopOut()}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <Card plain product>
            <div className={classes.productImageContainer}>
              <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                <img src={product['imageUrl']} className={classes.productImage} alt=".." />
              </a>
            </div>
            <CardBody plain className={classes.productDetails}>
              <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                <h4 className={classes.cardTitle}>{product['brand']}</h4>
              </a>
              <p className={classes.description}>
                {product['details']}
              </p>
              <h6 className={classes.quantity}>
                {product['quantity']} Requested - {product['reserved'] + product['purchased']} Reserved
                { product['reserved'] > 0
                  ? product['reserved'] == 1
                    ? <div>
                        (Pending purchase confirmation)
                      </div>
                    : <div>
                        ({product['reserved']} pending purchase confirmation)
                      </div>
                  : null
                }
              </h6>
              <div className={classes.textCenter}>
                {product['reserved'] + product['purchased'] > 0
                  ? <div>
                      <h6 className={classes.quantity}>
                        This gift has been reserved, it is no longer possible to remove it from the list, but you can increase the quantity.
                      </h6>
                      {editButtons()}
                    </div>
                  : allButtons()
                }
              </div>
              {editError
                ?
                  <div className={classes.errorContainer + " " + classes.centerText + " " + classes.error}>
                    {editError}
                  </div>
                : null
              }
            </CardBody>
          </Card>
        </DialogContent>
      </Dialog>
      {/* NOTICE MODAL END */}
    </div>
  );
}

SectionDetails.propTypes = {
  open: PropTypes.bool,
  listId: PropTypes.string,
  product: PropTypes.object
};
