import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { API } from "aws-amplify";
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
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/custom/components/reserve/manageStyle.js";
const useStyles = makeStyles(styles);

function Manage(props) {
  const classes = useStyles();
  const { listId, productId, reservedQuantity, productQuantity, productReserved, productPurchased, name, email } = props;

  const [error, setError] = useState('');
  const [showUpdated, setShowUpdated] = useState(false);
  const [newQuantity, setNewQuantity] = useState(reservedQuantity);
  const [newProductReserved, setNewProductReserved] = useState(productReserved);

  const remainingQuantity = productQuantity - newProductReserved - productPurchased;


  const updateProduct = async () => {
    if (reservedQuantity === newQuantity) {
      return false;
    }

    try {
      await API.put("lists", "/" + listId + "/reserve/" +  productId + "/email/" + email,{
        body: {
          "quantity": newQuantity,
          "name": name
        }
      });
    } catch (e) {
      setError('Oops! There was an issue updating the quantity of this gift, please contact us.');
      return false
    }

    props.setReservedQuantity(newQuantity);
    props.setProductReserved(newProductReserved);

    // Show updated in button
    setShowUpdated(true);

    setTimeout(() => {
      setShowUpdated(false);
    }, 3000);

    return true
  }

  const increaseQuantity = () => {
    console.log("Quantity: " + newQuantity);
    console.log("Remaining: " + remainingQuantity);
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

    try {
      await API.del("lists", "/" + listId + "/reserve/" +  productId + "/email/" + email,{
        body: {
          "name": name
        }
      });
    } catch (e) {
      if (e.response.data.error === 'Product was already purchased.') {
        props.setReserved(false);
        props.setConfirmed(true);
      } else if (e.response.data.error === 'Product is not reserved by user.'){
        props.setReserved(false);
        props.setCancelled(true);
      } else {
        console.log('Unexpected error occurred when unreserving product: ' + e);
        setError('Oops! There was an issue unreserving this gift, please contact us.');
      }
      return false
    }

    props.setReserved(false);
    props.setUnreserved(true);
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
          <Button color="primary" className={classes.customButton} onClick={() => unReserveProduct()}>
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
            <Button color="primary" size="sm" simple onClick={() => decreaseQuantity()}>
              <Remove />
            </Button>
            {` `}{newQuantity}{` `}
            <Button color="primary" size="sm" simple onClick={() => increaseQuantity()}>
              <Add />
            </Button>
          </InputLabel>
        </GridItem>
        <GridItem md={3} sm={3} xs={6} className={classes.buttonWrapper}>
          <Button color="primary" className={classes.customButton} onClick={() => updateProduct()}>
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
        ? <div className={classes.error}> {error} </div>
        : null
      }
      <hr />
    </div>
  );
}

Manage.propTypes = {
  listId: PropTypes.string,
  productId: PropTypes.string,
  reservedQuantity: PropTypes.number,
  productQuantity: PropTypes.number,
  productReserved: PropTypes.number,
  productPurchased: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string
};

export default withRouter(Manage);
