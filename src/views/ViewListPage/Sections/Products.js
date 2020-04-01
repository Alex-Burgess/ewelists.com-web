import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
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
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Sections
import SectionReserve from "./ReservePopOut.js";

import styles from "assets/jss/custom/views/viewListPage/productsStyle.js";
const useStyles = makeStyles(styles);

export default function Products(props) {
  const classes = useStyles();

  const { listId, listTitle, userId, products, reserved } = props;

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
    if (! (productId in reserved)) {
      return false
    }

    if (! (userId in reserved[productId])) {
      return false
    }

    const details = {
      'reserved': false,
      'purchased': false,
      'reserved_quantity': 0,
      'purchased_quantity': 0,
    }

    for (var r of reserved[productId][userId]) {
      console.log("reservation: " + JSON.stringify(r));
      if (r['state'] === 'purchased') {
        details['purchased'] = true;
        details['purchased_quantity'] = r['quantity'] + details['purchased_quantity'];
      } else {
        details['reserved'] = true;
        details['reserved_quantity'] = r['quantity'];
        details['reservationId'] = r['reservationId'];
      }
    }

    console.log("Reserved details: " + JSON.stringify(details));
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
        <a href={"/reserve/" + resvId}>
          <Button default className={classes.reserveButton}>
            Confirm Purchase
          </Button>
        </a>
      )
    } else if (userPurchased && allReserved){
      return (
        <Button default className={classes.reserveButton} disabled>
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

  const renderImage = (product) => {
    const reserved = getUserReservedDetails(product['productId']);

    if (reserved['reserved']) {
      return (
        <a href={"/reserve/" + reserved['reservationId']}>
          <img src={product['imageUrl']} className={classes.productImage} alt=".." />
        </a>
      )
    } else if (reserved['purchased']) {
      return (
          <img src={product['imageUrl']} className={classes.productImage} alt=".." />
      )
    } else {
      return (
        <button onClick={() => openReservePopout(product['productId'])} className={classes.undoButton}>
          <img src={product['imageUrl']} className={classes.productImage} alt=".." />
        </button>
      )
    }
  }

  const renderTitle = (userReserved, userPurchased, allReserved, brand, resvId, productId) => {
    if (userReserved) {
      return (
        <a href={"/reserve/" + resvId}>
          <h4 className={classes.cardTitle}>{brand}</h4>
        </a>
      )
    } else if (userPurchased && allReserved) {
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
              {renderImage(product)}
            </CardHeader>
            <CardBody plain className={classes.productDetails}>
              <div className={classes.textCenter}>
                {renderTitle(userReserved, userPurchased, allReserved, product['brand'], userReservation['reservationId'], product['productId'])}
              </div>
              <p className={classes.description + " " + classes.textCenter}>
                {product['details']}
              </p>
            </CardBody>
            <CardFooter plain className={classes.footer}>
              <div className={classes.remaining}>
                <h6 className={classes.cardCategory + " " + classes.textCenter}>
                  {renderRemainingQuantities(userReserved, userPurchased, allReserved, quantityRemaining, userReservation['reserved_quantity'], userReservation['purchased_quantity'])}
                </h6>
              </div>
              {renderButton(userReserved, userPurchased, allReserved, userReservation['reservationId'], product['productId'])}
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
        updateReservedQuantity={props.updateReservedQuantity}
        unreserveProduct={props.unreserveProduct}
        updateUserReservation={props.updateUserReservation}
        key={i}
      />
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem md={3} sm={4}>
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
                        activeColor="rose"
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
          </GridItem>
          <GridItem md={9} sm={8}>
            <GridContainer>
              {renderProducts()}
              {renderReservePopouts()}
            </GridContainer>
          </GridItem>
        </GridContainer>
        <br />
      </div>
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.object,
  reserved: PropTypes.object,
  listId: PropTypes.string,
  listTitle: PropTypes.string,
  userId: PropTypes.string,
  user: PropTypes.object,
};
