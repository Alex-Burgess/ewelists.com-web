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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/custom/views/viewListPage/reservePopOutStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function ReservePopout(props) {
  const classes = useStyles();
  const { listId, open, product, reservedDetails } = props;

  const [reserveQuantity, setReserveQuantity] = useState(1);
  const [reserveError, setReserveError] = useState('');
  const [updateUserQuantity, setUpdateUserQuantity] = useState(0);
  const [updateProductReserved, setUpdateProductReserved] = useState(0);

  useEffect(() => {
    if (reservedDetails) {
      setUpdateUserQuantity(reservedDetails['quantity']);
      setUpdateProductReserved(product['reserved']);
    }
  }, [product, reservedDetails])

  const closePopout = () => {
    setReserveError('');
    props.closeReservePopout(product['productId']);
  }

  const increaseQuantity = () => {
    var quantity = reserveQuantity;

    const remaining = product['quantity'] - product['reserved'];

    console.log("Remaining: " + remaining + ". User quantity: " + quantity);

    if (quantity < remaining){
      quantity = quantity + 1;
      setReserveQuantity(quantity);
    }
  }

  const decreaseQuantity = () => {
    var quantity = reserveQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    setReserveQuantity(quantity);
  }

  const updateReservedQuantity = () => {
    var userQuantity = updateUserQuantity;
    var productReserved= updateProductReserved;

    console.log("user quantity: " + userQuantity)
    console.log("reserved quantity: " + productReserved)

    if (productReserved < product['quantity']){
      userQuantity = userQuantity + 1;
      productReserved = productReserved + 1;
      setUpdateUserQuantity(userQuantity);
      setUpdateProductReserved(productReserved);
    }
  }

  const decreaseReservedQuantity = () => {
    var userQuantity = updateUserQuantity;
    var productReserved= updateProductReserved;

    if (userQuantity >= 1) {
      userQuantity = userQuantity - 1;
      productReserved = productReserved - 1;
      setUpdateUserQuantity(userQuantity);
      setUpdateProductReserved(productReserved);
    }
  }

  const reserveProduct = async () => {
    setReserveError('');
    let productId = product['productId'];
    console.log("Reserving product (" + productId + ") for list (" + listId + ").  Quantity (" + reserveQuantity + ")");

    try {
      await API.post("lists", "/" + listId + "/reserve/" +  productId, {
        body: { "quantity": reserveQuantity }
      });
    } catch (e) {
      console.log('Unexpected error occurred when reserving product: ' + e);
      setReserveError('Product could not be reserved.');
      return false
    }

    props.updateReservedQuantity(reserveQuantity, product);

    setUpdateUserQuantity(reserveQuantity);
    let productReserved = product['reserved'] + 1;
    setUpdateProductReserved(productReserved);
  }

  const updateReservation = async () => {
    setReserveError('');
    let productId = product['productId'];
    let newQuantity = updateUserQuantity;

    if (newQuantity === 0) {
      console.log("Unreserving product (" + productId + ") for list (" + listId + ") for user.  Quantity (" + updateUserQuantity + ")");
      try {
        await API.del("lists", "/" + listId + "/reserve/" +  productId);
      } catch (e) {
        console.log('Unexpected error occurred when unreserving product: ' + e);
        setReserveError('Product could not be unreserved.');
        return false
      }

      // Update reserved state
      props.unreserveProduct(product);

    } else {
      console.log("Updating number of product (" + productId + ") for list (" + listId + ") reserved by user.  Quantity (" + updateUserQuantity + ")");

      try {
        await API.put("lists", "/" + listId + "/reserve/" +  productId, {
          body: { "quantity": newQuantity }
        });
      } catch (e) {
        console.log('Unexpected error occurred when updating product reservation item: ' + e);
        setReserveError('Product could not be updated.');
        return false
      }

      // Update reserved state
      props.updateUserReservation(newQuantity, product);
    }
  }

  return (
    <div className={classes.section}>
      {/* NOTICE MODAL START */}
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSignup + " " + classes.reservePopout
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => closePopout()}
        aria-labelledby="notice-modal-slide-title"
        aria-describedby="notice-modal-slide-description"
      >
        <Card plain className={classes.modalSignupCard + " " + classes.reserveCard}>
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer className={classes.reserveContainer}>
              <GridItem md={12} sm={12} xs={12}>
                <Button
                  simple
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  onClick={() => closePopout()}
                >
                  {" "}
                  <Close className={classes.modalClose} />
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer className={classes.reserveContainer}>
              <GridItem md={6} sm={6} xs={12}>
                <Card plain product className={classes.productCard}>
                  <CardHeader noShadow image>
                    <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                      <img src={product['imageUrl']} className={classes.productImage} alt=".." />
                    </a>
                  </CardHeader>
                  <CardBody plain className={classes.productDetails}>
                    <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                      <h4 className={classes.cardTitle}>{product['brand']}</h4>
                    </a>
                    <p className={classes.description}>
                      {product['details']}
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem md={6} sm={6} xs={12}>
                <h3 className={classes.title + " " + classes.stepOne}>Step 1: Reserve Item</h3>
                <div className={classes.mobileCenter}>
                  <div className={classes.quantity}>
                    <InputLabel className={classes.label}>
                      Remaining items: {product['quantity'] - product['reserved']}
                    </InputLabel>
                    <InputLabel className={classes.label}>
                      Reserved by you: {reservedDetails ? reservedDetails['quantity'] : 0 }
                    </InputLabel>
                    {reservedDetails
                      ? <div>
                          <InputLabel className={classes.extraPadding}>
                            Update how many you have reserved below:
                          </InputLabel>
                          <div className={classes.labelQuantity}>
                            <span>
                                Quantity:
                            </span>
                            <span>
                              <Button id="reserve" color="primary" size="sm" simple onClick={() => decreaseReservedQuantity()}>
                                <Remove />
                              </Button>
                              {updateUserQuantity}
                              <Button id="add" color="primary" size="sm" simple onClick={() => updateReservedQuantity()}>
                                <Add />
                              </Button>
                            </span>
                          </div>
                        </div>
                      : <div>
                          <div className={classes.labelQuantity}>
                            <span>
                                Quantity:
                            </span>
                            <span>
                              <Button id="reserve" color="primary" size="sm" simple onClick={() => decreaseQuantity()}>
                                <Remove />
                              </Button>
                              {reserveQuantity}
                              <Button id="add" color="primary" size="sm" simple onClick={() => increaseQuantity()}>
                                <Add />
                              </Button>
                            </span>
                          </div>
                        </div>
                    }


                  </div>
                  {reservedDetails
                    ? <div>
                        <Button default color="primary" className={classes.reserveButton} onClick={() => updateReservation()}>
                          Update
                        </Button>
                      </div>
                    : product['reserved'] < product['quantity']
                      ? <Button default color="primary" className={classes.reserveButton} onClick={() => reserveProduct()}>
                          Reserve Gift
                        </Button>
                      : <Button default className={classes.reserveButton} disabled>
                          Reserved
                        </Button>
                  }
                  {reserveError
                    ?
                      <div className={classes.errorContainer}>
                        {reserveError}
                      </div>
                    : null
                  }
                </div>
                <h3 className={classes.title}>Step 2: Purchase Item</h3>
                <div className={classes.mobileCenter}>
                  <div className={classes.purchase}>
                    <InputLabel className={classes.label}>
                      Click below to buy the item.
                    </InputLabel>
                  </div>
                  <Button default color="primary" className={classes.reserveButton}>
                    <a href={product['productUrl']} target="_blank" rel="noopener noreferrer" className={classes.buttonLink}>
                      Purchase Gift
                    </a>
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </DialogContent>
        </Card>
      </Dialog>
      {/* NOTICE MODAL END */}
    </div>
  );
}

ReservePopout.propTypes = {
  open: PropTypes.bool,
  listId: PropTypes.string,
  product: PropTypes.object,
  reservedDetails: PropTypes.object
};
