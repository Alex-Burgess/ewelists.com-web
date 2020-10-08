import React, { useState } from 'react';
// libs
import { debugError } from "libs/errorLib";
import { updateReservationQuantity, cancelReservation } from "libs/apiLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import ErrorText from "components/Typography/Error.js";

import styles from "assets/jss/material-kit-pro-react/views/reservedPageStyle.js";
const useStyles = makeStyles(styles);

function Manage(props) {
  const classes = useStyles();
  const {
    resvId,
    reservedQuantity,
    productQuantity,
    productReserved,
    productPurchased,
    name,
    email,
    setUnreserved,
    setReserved,
    setConfirmed,
    setCancelled,
    setReservedQuantity,
    setProductReserved
  } = props;

  const [error, setError] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUnreserving, setIsUnreserving] = useState(false);
  const [showUpdated, setShowUpdated] = useState(false);
  const [newQuantity, setNewQuantity] = useState(reservedQuantity);
  const [newProductReserved, setNewProductReserved] = useState(productReserved);

  const remainingQuantity = productQuantity - newProductReserved - productPurchased;


  const updateProduct = async () => {
    setError('');
    setIsUpdating(true);
    if (reservedQuantity === newQuantity) {
      return false;
    }

    try {
      await updateReservationQuantity(resvId, email, name, newQuantity);
    } catch (e) {
      setError('Oops! There was an issue updating the quantity of this gift, please contact us.');
      setIsUpdating(false);
      return false
    }

    setReservedQuantity(newQuantity);
    setProductReserved(newProductReserved);

    // Show updated in button
    setIsUpdating(false);
    setShowUpdated(true);

    setTimeout(() => {
      setShowUpdated(false);
    }, 3000);

    return true
  }

  const increaseQuantity = () => {
    debugError("Quantity: " + newQuantity);
    debugError("Remaining: " + remainingQuantity);
    if (remainingQuantity > 0) {
      setNewQuantity(newQuantity + 1);
      setNewProductReserved(newProductReserved + 1)
    }
  }

  const decreaseQuantity = () => {
    if (newQuantity > 1) {
      setNewQuantity(newQuantity - 1);
      setNewProductReserved(newProductReserved - 1)
    }
  }


  const unReserveProduct = async () => {
    setError('');
    setIsUnreserving(true);

    try {
      await cancelReservation(resvId, email, name);
    } catch (e) {
      if (e.response.data.error === 'Product was already purchased.') {
        setReserved(false);
        setConfirmed(true);
      } else if (e.response.data.error === 'Product is not reserved by user.'){
        setReserved(false);
        setCancelled(true);
      } else {
        setError('Oops! There was an issue unreserving this gift, please contact us.');
      }

      setIsUnreserving(false);
      return false
    }

    setIsUnreserving(false);
    setReserved(false);
    setUnreserved(true);
  }

  const renderUnreserve = () => {
    return (
      <GridContainer>
        <GridItem md={9} sm={9} xs={12} >
          <p className={classes.shortText + " " + classes.extraMargin}>
            Changed your mind?
          </p>
        </GridItem>
        <GridItem md={3} sm={3} xs={12} className={classes.buttonWrapper}>
          <Button color="primary2" className={classes.customButton} disabled={isUnreserving} onClick={() => unReserveProduct()} data-cy="button-unreserve">
            Unreserve
          </Button>
        </GridItem>
      </GridContainer>
    )
  }

  const renderEditQuantity = () => {
    return (
      <GridContainer className={classes.editRow}>
        <GridItem md={6} sm={6} xs={12} >
          <p className={classes.shortText + " " + classes.extraMargin}>
            Change how many you have reserved?
          </p>
        </GridItem>
        <GridItem md={3} sm={3} xs={6} className={classes.buttonWrapper}>
          <InputLabel className={classes.label}>
            <Button color="primary" size="sm" simple onClick={() => decreaseQuantity()} data-cy="button-decrease-quantity">
              <Remove />
            </Button>
            {` `}{newQuantity}{` `}
            <Button color="primary" size="sm" simple onClick={() => increaseQuantity()} data-cy="button-increase-quantity">
              <Add />
            </Button>
          </InputLabel>
        </GridItem>
        <GridItem md={3} sm={3} xs={6} className={classes.buttonWrapper}>
          <Button color="primary2" className={classes.customButton} disabled={isUpdating} onClick={() => updateProduct()} data-cy="button-update-product">
            <span className={classes.shareText}>
              { showUpdated
                ? 'Updated!'
                : 'Update'
              }
            </span>
          </Button>
        </GridItem>
      </GridContainer>
    )
  }

  return (
    <div className={classes.section}>
      <h3 className={classes.title + " " + classes.sectionHeading}><Update className={classes.icon}/>Manage Reservation</h3>
      <p className={classes.longText}>
        Don't worry if you don't want to buy right now, or need to make changes to this reservation.  We sent you a
        confirmation email with a link to update this at a later date.
      </p>
      {productQuantity > 1
        ? renderEditQuantity()
        : null
      }
      {renderUnreserve()}
      {error
        ? <div className={classes.error}>
            <ErrorText>
              <p>{error}</p>
            </ErrorText>
          </div>
        : null
      }
      <hr />
    </div>
  );
}

Manage.propTypes = {
  resvId: PropTypes.string,
  reservedQuantity: PropTypes.number,
  productQuantity: PropTypes.number,
  productReserved: PropTypes.number,
  productPurchased: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  setUnreserved: PropTypes.func,
  setReserved: PropTypes.func,
  setConfirmed: PropTypes.func,
  setCancelled: PropTypes.func,
  setReservedQuantity: PropTypes.func,
  setProductReserved: PropTypes.func
};

export default Manage;
