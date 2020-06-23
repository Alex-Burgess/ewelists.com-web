import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import update from 'immutability-helper';
import FadeLoader from "react-spinners/FadeLoader";
// libs
import { debugError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui icons
import Cached from "@material-ui/icons/Cached";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import Accordion from "components/Accordion/Accordion.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/Buttons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Sections
import SectionReserve from "./ReservePopOut.js";

import styles from "assets/jss/material-kit-pro-react/views/viewListPage/productsStyle.js";
const useStyles = makeStyles(styles);

export default function Products(props) {
  const classes = useStyles();
  const [cookies] = useCookies(['email']);

  const { listId, listTitle, userId, products, reserved, loading, isAuthenticated } = props;

  const [desktop, setDesktop] = useState(true);
  const [filterItems, setFilterItems] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [reservePopouts, setReservePopouts] = useState({});

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

  const closeReservePopout = (id) => {
    setReservePopouts({
      reservePopouts: update(reservePopouts, {
        [id]: {$set: false}
      })
    })
  }

  const openReservePopout = (id) => {
    setReservePopouts({
      ...reservePopouts,
        [id]: true
    })
  }

  const toggleMobileFilter = () => {
    if (showFilter === false){
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  }

  const getUserReservedDetails = (productId) => {
    let user_key;
    if (isAuthenticated) {
      user_key = userId;
    } else if (cookies.email) {
      user_key = cookies.email;
    } else {
      return false;
    }


    if (! (productId in reserved)) {
      return false;
    }

    if (! (user_key in reserved[productId])) {
      return false
    }

    const details = {
      'reserved': false,
      'purchased': false,
      'reserved_quantity': 0,
      'purchased_quantity': 0,
    }

    for (var r of reserved[productId][user_key]) {
      debugError("reservation: " + JSON.stringify(r));
      if (r['state'] === 'purchased') {
        details['purchased'] = true;
        details['purchased_quantity'] = r['quantity'] + details['purchased_quantity'];
      } else {
        details['reserved'] = true;
        details['reserved_quantity'] = r['quantity'];
        details['reservationId'] = r['reservationId'];
      }
    }

    debugError("Reserved details: " + JSON.stringify(details));
    return details
  }

  const checkAllReserved = (product) => {
    if (product['reserved'] + product['purchased'] >= product['quantity']) {
      return true
    }

    return false
  }

  const renderButton = (userReserved, userPurchased, allReserved, resvId, productId ) => {
    if (userReserved) {
      return (
        <Link to={"/reserve/" + resvId}>
          <Button default color="secondary" className={classes.reserveButton}>
            Confirm Purchase
          </Button>
        </Link>
      )
    } else if (userPurchased && allReserved){
      return (
        <Button default color="primary" className={classes.reserveButton} disabled>
          Purchased by you
        </Button>
      )
    } else if (userPurchased && !allReserved){
      return (
        <Button default color="primary" className={classes.reserveButton} onClick={() => openReservePopout(productId)}>
          Reserve Another
        </Button>
      )
    } else if (!allReserved) {
      return (
        <Button default color="primary" className={classes.reserveButton} onClick={() => openReservePopout(productId)}>
          Reserve Gift
        </Button>
      )
    } else {
      return (
        <Button default className={classes.reserveButton} disabled>
          Reserved
        </Button>
      )
    }
  }

  const renderRemainingQuantities = (userReserved, userPurchased, allReserved, quantityRemaining, userReservedQuantity, userPurchasedQuantity) => {
    let remainingDetails;

    if (userReserved && userPurchased) {
      remainingDetails = "You purchased " + userPurchasedQuantity + " and reserved " + userReservedQuantity;
    }
    else if (userReserved && allReserved) {
      remainingDetails = "You reserved " + userReservedQuantity;
    }
    else if (userReserved && !allReserved) {
      remainingDetails = quantityRemaining + " remaining - You reserved " + userReservedQuantity;
    }
    else if (!allReserved) {
      remainingDetails = quantityRemaining + " remaining";
    }

    return (
      <span>
        {remainingDetails}
      </span>
    )
  }

  const renderTitle = (userReserved, userPurchased, allReserved, brand, resvId, productId) => {
    if (userReserved) {
      return (
        <Link to={"/reserve/" + resvId}>
          <h4 className={classes.cardTitle}>{brand}</h4>
        </Link>
      )
    } else if (userPurchased && allReserved) {
      return (
          <h4 className={classes.cardTitle}>{brand}</h4>
      )
    } else if (allReserved) {
      return (
          <h4 className={classes.cardTitle}>{brand}</h4>
      )
    } else {
      return (
        <button onClick={() => openReservePopout(productId)} className={classes.undoButton}>
          <h4 className={classes.cardTitle}>{brand}</h4>
        </button>
      )
    }
  }

  const renderImage = (userReserved, userPurchased, allReserved, imageUrl, resvId, productId) => {
    if (userReserved) {
      return (
        <Link to={"/reserve/" + resvId}>
          <img src={imageUrl} className={classes.productImage} alt=".." />
        </Link>
      )
    } else if (userPurchased && allReserved) {
      return (
        <img src={imageUrl} className={classes.productImage} alt=".." />
      )
    } else if (userPurchased && !allReserved){
      return (
        <button onClick={() => openReservePopout(productId)} className={classes.undoButton}>
          <img src={imageUrl} className={classes.productImage} alt=".." />
        </button>
      )
    } else if (!allReserved) {
      return (
        <button onClick={() => openReservePopout(productId)} className={classes.undoButton}>
          <img src={imageUrl} className={classes.productImage} alt=".." />
        </button>
      )
    } else {
      return (
        <img src={imageUrl} className={classes.productImage} alt=".." />
      )
    }
  }

  const renderProduct = (product, i) => {
    const userReservation = getUserReservedDetails(product['productId']);
    const userReserved = userReservation['reserved'];
    const userPurchased = userReservation['purchased'];
    const allReserved = checkAllReserved(product);
    const quantityRemaining = product['quantity'] - product['reserved'] - product['purchased'];

    if ((filterItems === "purchased") && (quantityRemaining > 0)) {
        return (null)
    } else if ((filterItems === "available") && (quantityRemaining <= 0)) {
      return (null)
    } else {
      return (
        <GridItem md={4} sm={6} key={i}>
          <Card plain product className={classes.customProduct}>
            <CardHeader noShadow image>
              {renderImage(userReserved, userPurchased, allReserved, product['imageUrl'], userReservation['reservationId'], product['productId'])}
            </CardHeader>
            <CardBody plain className={classes.productDetails}>
              <div className={classes.textCenter}>
                {renderTitle(userReserved, userPurchased, allReserved, product['brand'], userReservation['reservationId'], product['productId'])}
              </div>
              <div className={classes.textLeft}>
                <p className={classes.description}>
                  {product['details']}
                </p>
              </div>
              {product['price']
                ? <div className={classes.price}>
                    £ {product['price']}
                  </div>
                : null
              }
            </CardBody>
            <CardFooter plain className={classes.footer}>
              {renderButton(userReserved, userPurchased, allReserved, userReservation['reservationId'], product['productId'])}
              <div className={classes.remaining}>
                <h6 className={classes.cardCategory + " " + classes.textCenter}>
                  {renderRemainingQuantities(userReserved, userPurchased, allReserved, quantityRemaining, userReservation['reserved_quantity'], userReservation['purchased_quantity'])}
                </h6>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      )
    }
  }

  const renderProducts = () => {
    return (
      Object.entries(products).map(
        ([key, product]) =>
          renderProduct(product, key)
      )
    )
  }

  const renderReservePopouts = () => {
    return (
      Object.entries(products).map(
        ([key, product]) =>
          renderReservePopout(product, key)
      )
    )
  }

  const renderReservePopout = (product, i) => {
    return (
      <SectionReserve
        open={reservePopouts[product['productId']]
          ? reservePopouts[product['productId']]
          : false }
        product={product}
        closeReservePopout={closeReservePopout}
        listId={listId}
        listTitle={listTitle}
        user={props.user}
        cookiesAllowed={props.cookiesAllowed}
        updateReservedQuantity={props.updateReservedQuantity}
        unreserveProduct={props.unreserveProduct}
        updateUserReservation={props.updateUserReservation}
        key={i}
      />
    )
  }

  const renderFilterColumn = () => {
    return (
      <Card plain className={classes.filterCard}>
        <CardBody className={classes.cardBodyRefine}>
          <div className={classes.textCenter + " " + classes.filterButtonContainer}>
            <Button default onClick={toggleMobileFilter} className={classes.filterButton}>
              {
                desktop || showFilter
                ? <span>Hide Filter</span>
                : <span>Filter Items</span>
              }
            </Button>
          </div>
          {
            desktop || showFilter
            ?  <div>
                <h4 className={classes.cardTitle + " " + classes.textLeft}>
                  Filter
                  <Tooltip id="tooltip-top" title="Reset Filter" placement="top" classes={{ tooltip: classes.tooltip }}>
                    <Button link justIcon size="sm" className={classes.pullRight + " " + classes.refineButton} onClick={() => setFilterItems('all')}>
                      <Cached />
                    </Button>
                  </Tooltip>
                  <Clearfix />
                </h4>
                <Accordion
                  active={[0, 1]}
                  activeColor="red"
                  collapses={[
                    {
                      title: "Availability",
                      content: (
                        <div className={classes.customExpandPanel}>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={filterItems === "all"}
                                  onChange={event => setFilterItems("all")}
                                  value="all"
                                  name="radio button enabled"
                                  aria-label="A"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label,
                                root: classes.labelRoot
                              }}
                              label="All Items"
                            />
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={filterItems === "available"}
                                  onChange={event => setFilterItems("available")}
                                  value="available"
                                  name="radio button enabled"
                                  aria-label="B"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label,
                                root: classes.labelRoot
                              }}
                              label="Available Items"
                            />
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={filterItems === "purchased"}
                                  onChange={event => setFilterItems("purchased")}
                                  value="purchased"
                                  name="radio button enabled"
                                  aria-label="C"
                                  icon={
                                    <FiberManualRecord
                                      className={classes.radioUnchecked}
                                    />
                                  }
                                  checkedIcon={
                                    <FiberManualRecord className={classes.radioChecked} />
                                  }
                                  classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                  }}
                                />
                              }
                              classes={{
                                label: classes.label,
                                root: classes.labelRoot
                              }}
                              label="Purchased Items"
                            />
                          </div>
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            : null
          }
        </CardBody>
      </Card>
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem md={3} sm={4}>
            {renderFilterColumn()}
          </GridItem>
          <GridItem md={9} sm={8}>
            {loading
              ? <div className={classes.loading}>
                  <FadeLoader
                    size={50}
                    color={"#9a9a9a"}
                    loading={true}
                  />
                </div>
              : <GridContainer>
                  {renderProducts()}
                  {renderReservePopouts()}
                </GridContainer>
            }
          </GridItem>
        </GridContainer>
        <br />
      </div>
    </div>
  );
}

Products.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.object,
  reserved: PropTypes.object,
  listId: PropTypes.string,
  listTitle: PropTypes.string,
  userId: PropTypes.string,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool
};
