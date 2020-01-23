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

  const { listId, userId, products, reserved } = props;

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

  const userReservedItem = (productId) => {
    if (! (productId in reserved)) {
      return false
    }

    if (! (userId in reserved[productId])) {
      return false
    }

    return true
  }

  const getUserReservedDetails = (productId) => {
    if (! (productId in reserved)) {
      return false
    }

    if (! (userId in reserved[productId])) {
      return false
    }

    return reserved[productId][userId]
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
        reservedDetails={getUserReservedDetails(product['productId'])
          ? getUserReservedDetails(product['productId'])
          : null }
        closeReservePopout={closeReservePopout}
        listId={listId}
        updateReservedQuantity={props.updateReservedQuantity}
        unreserveProduct={props.unreserveProduct}
        updateUserReservation={props.updateUserReservation}
        key={i}
      />
    )
  }

  const renderProduct = (product, i) => {
    if ((filterItems === "purchased") && (product['reserved'] < product['quantity'])) {
        return (null)
    } else if ((filterItems === "available") && (product['reserved'] >= product['quantity'])) {
      return (null)
    } else {
      return (
        <GridItem md={4} sm={6} key={i}>
          <Card plain product className={classes.customProduct}>
            <CardHeader noShadow image>
              <button onClick={() => openReservePopout(product['productId'])} className={classes.undoButton}>
                <img src={product['imageUrl']} className={classes.productImage} alt=".." />
              </button>
            </CardHeader>
            <CardBody plain className={classes.productDetails}>
              <div className={classes.textCenter}>
                <button onClick={() => openReservePopout(product['productId'])} className={classes.undoButton}>
                  <h4 className={classes.cardTitle}>{product['brand']}</h4>
                </button>
              </div>
              <p className={classes.description}>
                {product['details']}
              </p>
            </CardBody>
            <CardFooter plain className={classes.footer}>
              <div>
                <span className={classes.description}> Remaining: {product['quantity'] - product['reserved']}</span>
              </div>
              <div className={classes.textCenter}>
                {userReservedItem(product['productId'])
                  ? <Button default className={classes.reserveButton} onClick={() => openReservePopout(product['productId'])}>
                      Update
                    </Button>
                  : product['reserved'] < product['quantity']
                    ? <Button default color="primary" className={classes.reserveButton} onClick={() => openReservePopout(product['productId'])}>
                        Reserve Gift
                      </Button>
                    : <Button default className={classes.reserveButton} disabled onClick={() => openReservePopout(product['productId'])}>
                        Reserved
                      </Button>
                }
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
  userId: PropTypes.string
};
