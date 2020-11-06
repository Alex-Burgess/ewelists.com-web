import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
// libs
import { useAppContext } from "libs/contextLib";
import { onError } from "libs/errorLib";
import { reserveProduct } from "libs/apiLib";
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
import Button from "components/Buttons/Button.js";
import Input from "components/Input/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ErrorText from "components/Typography/Error.js";

import styles from "assets/jss/material-kit-pro-react/views/viewListPage/reservePopOutStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


function ReservePopout(props) {
  const classes = useStyles();
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['name', 'email']);
  const { user, cookiesAllowed } = useAppContext();

  const { listId, listTitle, open, product, closeReservePopout } = props;

  const [reserveQuantity, setReserveQuantity] = useState(1);
  const [reserveError, setReserveError] = useState('');
  const [accountError, setAccountError] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect( () => {
    if (user.email){
      setEmail(user.email)
      setName(user.name)
    } else if (cookies.name || cookies.email) {
      setEmail(cookies.email)
      setName(cookies.name)
    }
  }, [user, cookies.email, cookies.name]);

  const validateForm = () => {
    if (email == null || name === "null") {
      return false
    } else {
      return email.length > 0 && name.length > 0;
    }
  }

  const closePopout = () => {
    setReserveError('');
    closeReservePopout(product['productId']);
  }

  const increaseQuantity = () => {
    const remaining = product['quantity'] - product['reserved'] - product['purchased'];

    if (reserveQuantity < remaining){
      setReserveQuantity(reserveQuantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (reserveQuantity > 1) {
      setReserveQuantity(reserveQuantity - 1);
    }
  }

  const disabled = () => {
    if (user.email) {
      return true
    }

    if (accountError) {
      return true
    }

    return false
  }

  const setUserDetailsCookie = () => {
    if (cookiesAllowed) {
      setCookie('name', name, { path: '/' });
      setCookie('email', email.toLowerCase(), { path: '/' });
    }
  }

  const reserveGift = async () => {
    setReserveError('');
    setIsReserving(true);
    setEmail(email.toLowerCase());

    let productId = product['productId'];
    let response;

    try {
      response = await reserveProduct(listId, productId, email.toLowerCase(), name, reserveQuantity, listTitle, product);
    } catch (e) {
      if (e.response.data.error === 'User has an account, login required before product can be reserved.') {
        setAccountError(true);
        setReserveError('Looks like you already have an account. Please log in to reserve this product.');
      } else {
        onError('Unexpected error occurred when reserving product: ' + e);
        setReserveError('Product could not be reserved.');
      }

      setIsReserving(false);
      return false
    }

    setIsReserving(false);
    setUserDetailsCookie();
    history.push({
      pathname: "/reserve/" + response.reservation_id,
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
            Remaining: {product['quantity'] - product['reserved'] - product['purchased']}
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
          <hr className={classes.spacer}/>
          {product.notes
            ? <div>
                <h3 className={classes.notesIntro}>
                    Notes to gift buyer
                </h3>
                <div className={classes.notes}>
                  {product.notes}
                </div>
                <hr className={classes.spacer}/>
              </div>
            : null
          }
          <h3 className={classes.formIntro + " " + classes.desktop}>
              Please enter some details about yourself, so we know who is reserving the item.
          </h3>
          <h3 className={classes.formIntro + " " + classes.mobile}>
              Enter your details about yourself
          </h3>
          <Input
              id={"name-" + product.productId}
              labelText="Name"
              inputProps={{
                value: user.name ? user.name : name,
                disabled: disabled() ? true : false,
                onChange: event => setName(event.target.value)
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          <Input
            id={"email-" + product.productId}
            labelText="Email"
            inputProps={{
              value: user.email ? user.email : email,
              disabled: disabled() ? true : false,
              onChange: event => setEmail(event.target.value)
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
          {product['quantity'] > 1
            ? <div className={classes.quantity}>
                <div className={classes.labelQuantity}>
                  <span>
                      Quantity:
                  </span>
                  <span>
                    <Button id="remove" color="primary" size="sm" simple onClick={() => decreaseQuantity()} data-cy="popout-button-quantity-decrease">
                      <Remove />
                    </Button>
                    {reserveQuantity}
                    <Button id="add" color="primary" size="sm" simple onClick={() => increaseQuantity()} data-cy="popout-button-quantity-increase">
                      <Add />
                    </Button>
                  </span>
                </div>
              </div>
            : null
          }
          {accountError
            ?  <Link to={"/login?/lists/" + listId} className={classes.logIn}>
                <Button default color="primary" className={classes.reserveButton}>
                  Log In
                </Button>
              </Link>
            : <Button default color="primary" className={classes.reserveButton} disabled={!validateForm() || isReserving} onClick={() => reserveGift()} data-cy="popout-button-reserve">
                Reserve Gift
              </Button>
          }

          {reserveError
            ? <div>
                <ErrorText>
                  <p>{reserveError}</p>
                </ErrorText>
              </div>
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
        <Card plain className={classes.modalSignupCard + " " + classes.reserveCard} data-cy={"popout-reserve-" + product.productId}>
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
  listTitle: PropTypes.string,
  product: PropTypes.object,
  closeReservePopout: PropTypes.func
};

export default ReservePopout;
