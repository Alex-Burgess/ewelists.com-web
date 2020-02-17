import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
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


function ReservePopout(props) {
  const classes = useStyles();
  const { listId, open, product, user } = props;

  const [reserveQuantity, setReserveQuantity] = useState(1);
  const [reserveError, setReserveError] = useState('');

  const closePopout = () => {
    setReserveError('');
    props.closeReservePopout(product['productId']);
  }

  const increaseQuantity = () => {
    const remaining = product['quantity'] - product['reserved'];

    if (reserveQuantity < remaining){
      setReserveQuantity(reserveQuantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (reserveQuantity > 1) {
      setReserveQuantity(reserveQuantity - 1);
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

    // TODO - API post request will return encrypted string of productId, user email and name.  Add to search.
    // TODO - refreshing page actually works.  issue is if copy url and paste to new tab / browser.  Maybe in this situation, we should redirect back to list.
    props.history.push({
      pathname: "/reserved/" + listId,
      // search: '?product=' + product.productId,
      state: {
        productId: productId,
        product: product,
        reserveQuantity: reserveQuantity,
        email: user.email,
        name: user.name
      }
    });
  }

  const renderProduct = () => {
    return (
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
          <h6 className={classes.cardCategory + " " + classes.centerText}>
            Remaining: {product['quantity'] - product['reserved']}
          </h6>
        </CardBody>
      </Card>
    )
  }

  const renderReserveForm = () => {
    return (
      <GridContainer className={classes.centerText}>
        <GridItem xs={12} sm={10} md={10}>
          <h3 className={classes.title + " " + classes.modalTitle + " " + classes.desktop}>
            Reserve Item
          </h3>
          <h3 className={classes.formIntro + " " + classes.desktop}>
              Please enter some details about yourself, so we know who is reserving the item.
          </h3>
          <h3 className={classes.formIntro + " " + classes.mobile}>
              Please enter some details about yourself:
          </h3>
          <CustomInput
              labelText="Name"
              inputProps={{
                value: user.name ? user.name : '',
                disabled: user.name ? true : false
              }}
              formControlProps={{
                fullWidth: true,
                className:  classes.customForm,
              }}
            />
          <CustomInput
            labelText="Email"
            inputProps={{
              value: user.email ? user.email : '',
              disabled: user.email ? true : false
            }}
            formControlProps={{
              fullWidth: true,
              className:  classes.customForm,
            }}
          />
          {product['quantity'] > 1
            ? <div className={classes.quantity}>
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
            : null
          }
          <Button default color="primary" className={classes.reserveButton} onClick={() => reserveProduct()}>
            Reserve Gift
          </Button>

          {reserveError
            ? <div className={classes.error}> {reserveError} </div>
            : null
          }
        </GridItem>
      </GridContainer>
    )
  }

  return (
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
          <DialogTitle
            id="signup-modal-slide-title"
            disableTypography
            className={classes.modalHeader + " " + classes.customHeader}
          >
            <h3 className={classes.title + " " + classes.modalTitle + " " + classes.mobile}>
              Reserve Item
            </h3>
            <Button simple key="close" aria-label="Close"
              className={classes.modalCloseButton + " " + classes.customCloseButton}
              onClick={() => closePopout()}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
          </DialogTitle>
          <DialogContent id="notice-modal-slide-description" className={classes.modalBody}>
            <GridContainer className={classes.reserveContainer}>
              <GridItem md={5} sm={5} xs={12}>
                {renderProduct()}
              </GridItem>
              <GridItem md={7} sm={7} xs={12}>
                {renderReserveForm()}
              </GridItem>
            </GridContainer>
          </DialogContent>
        </Card>
      </Dialog>
  );
}

ReservePopout.propTypes = {
  open: PropTypes.bool,
  listId: PropTypes.string,
  product: PropTypes.object,
  user: PropTypes.object,
};

export default withRouter(ReservePopout);
