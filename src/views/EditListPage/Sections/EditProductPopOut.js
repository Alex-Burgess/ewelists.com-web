import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// libs
import { onError, debugError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
// core components
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ErrorText from "components/Typography/Error.js";

import styles from "assets/jss/material-kit-pro-react/views/editListPage/editProductPopOutStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function SectionDetails(props) {
  const classes = useStyles();
  const { open, listId, product } = props;
  const [error, setError] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setError('');
    setIsDeleting(true);

    let productId = product['productId'];
    let type = product['type'];

    const reservedQuantity = product['reserved'] + product['purchased'];

    if (reservedQuantity > 0) {
      debugError("Reserved number: " + reservedQuantity);
      setError('Item has been reserved, so will not be removed from your list. You can edit the quantity if required.');
      setIsDeleting(false);
      return false
    } else {
      debugError("Deleting product (" + productId + ") of type (" + type + ") from list (" + listId + ").");
    }


    try {
      await API.del("lists", "/" + listId + "/product/" +  productId);
    } catch (e) {
      onError('Unexpected error occurred when deleting product from list.');
      setError('Item could not be deleted from your list.');
      setIsDeleting(false);
      return false
    }

    debugError("Deleted product from list: " + productId);

    if (type === 'notfound'){
      // Delete product from table
      try {
        await API.del("notfound", "/" + productId);
      } catch (e) {
        onError('Unexpected error occurred when deleting product.');
        setError('Product could not be deleted.');
        setIsDeleting(false);
        return false
      }

      debugError("Deleted product from notfound table: " + productId);
    }

    setIsDeleting(false);
    props.deleteProductFromState(productId);
    props.handleClose(productId);
  }

  const updateProduct = async () => {
    setIsUpdating(true);
    setError('');

    let productId = product['productId'];
    let quantity = product['quantity'];
    debugError("Updating product (" + productId + ") for list (" + listId + ")");

    if (quantity === newQuantity) {
      setError('There are no updates to this item.');
      setIsUpdating(false);
      return false;
    }

    try {
      await API.put("lists", "/" + listId + "/product/" +  productId, {
        body: { "quantity": newQuantity }
      });
    } catch (e) {
      onError('Unexpected error occurred when updating product on list.');
      setError('Product could not be updated.');
      setIsUpdating(false);
      return false
    }

    product['quantity'] =newQuantity

    setIsUpdating(false);
    props.updateProductToState(product)
    props.handleClose(productId);
  }

  const allButtons = () => {
    return (
      <div>
        <div className={classes.labelQuantity} data-cy="div-quantity">
          <span>
              Quantity:
          </span>
          <Button id="remove" color="primary" size="sm" simple onClick={() => decreaseQuantity()} data-cy="link-quantity-decrease">
            <Remove />
          </Button>
          {` `}{newQuantity}{` `}
          <Button id="add" color="primary" size="sm" simple onClick={() => setNewQuantity(newQuantity + 1)} data-cy="link-quantity-increase">
            <Add />
          </Button>
        </div>
        <Button round type="submit" disabled={isDeleting} onClick={() => deleteProduct()}>
          Delete
        </Button>
        <Button round color="primary" type="submit" disabled={isUpdating} onClick={() => updateProduct()}>
          Update
        </Button>
      </div>
    )
  }

  const editButtons = () => {
    return (
      <div>
        <div className={classes.labelQuantity} data-cy="div-quantity">
          Quantity:
          <Button color="primary" size="sm" simple onClick={() => decreaseQuantity()} data-cy="link-quantity-decrease">
            <Remove />
          </Button>
          {` `}{newQuantity}{` `}
          <Button color="primary" size="sm" simple onClick={() => setNewQuantity(newQuantity + 1)} data-cy="link-quantity-increase">
            <Add />
          </Button>
        </div>
        <Button round color="primary" type="submit" disabled={isUpdating} onClick={() => updateProduct()}>
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
              <a href={product['productUrl']} target="_blank" rel="noopener noreferrer" data-cy="link-product-image">
                <img src={product['imageUrl']} className={classes.productImage} alt=".." />
              </a>
            </div>
            <CardBody plain className={classes.productDetails}>
              <a href={product['productUrl']} target="_blank" rel="noopener noreferrer" data-cy="link-product-brand">
                <h4 className={classes.cardTitle}>{product['brand']}</h4>
              </a>
              <p className={classes.description}>
                {product['details']}
              </p>
              <h6 className={classes.quantity}>
                {product['quantity']} Requested - {product['reserved'] + product['purchased']} Reserved
                { product['reserved'] > 0
                  ? product['reserved'] === 1
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
              {error
                ?
                  <div className={classes.errorContainer + " " + classes.centerText}>
                    <ErrorText>
                      <p>{error}</p>
                    </ErrorText>
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
