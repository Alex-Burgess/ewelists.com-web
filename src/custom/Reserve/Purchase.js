import React from "react";
import { withRouter } from 'react-router-dom'
// import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Redeem from "@material-ui/icons/Redeem";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/custom/components/reserve/purchaseStyle.js";
const useStyles = makeStyles(styles);

function Purchase(props) {
  const classes = useStyles();
  // const { listId, productId, name, product, reserveQuantity } = props;
  const { listId, name, product, reserveQuantity } = props;

  const purchased = async () => {
    // try {
    //   await API.del("lists", "/" + listId + "/reserve/" +  productId);
    //
    // } catch (e) {
    //   console.log('Unexpected error occurred when unreserving product: ' + e);
    //   // setReserveError('Product could not be unreserved.');
    //   return false
    // }

    props.history.push({
      pathname: "/purchased/" + listId,
      state: {
        product: product,
        reserveQuantity: reserveQuantity,
        name: name
      }
    });
  }

  return (
    <div className={classes.section}>
      <h3 className={classes.title + " " + classes.sectionHeading}><Redeem className={classes.icon}/> Purchase Gift</h3>
      <GridContainer>
        <GridItem md={9} sm={9} xs={12} >
          <p className={classes.shortText}>
            Ready to buy? Head over to the retailer to purchase this item.
          </p>
        </GridItem>
        <GridItem md={3} sm={3} xs={12} className={classes.buttonWrapper}>
          <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
            <Button color="primary" className={classes.customButton}>
              Buy Gift
            </Button>
          </a>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={9} sm={9} xs={12} >
          <p className={classes.shortText + " " + classes.extraMargin}>
            Once you have purchased the item, let us know!
          </p>
        </GridItem>
        <GridItem md={3} sm={3} xs={12} className={classes.buttonWrapper}>
          <Button color="primary" className={classes.customButton} onClick={() => purchased()}>
            Purchased
          </Button>
        </GridItem>
      </GridContainer>
      <hr />
    </div>
  );
}

Purchase.propTypes = {
  listId: PropTypes.string,
  productId: PropTypes.string,
  product: PropTypes.object,
  reserveQuantity: PropTypes.number,
  name: PropTypes.string,
};

export default withRouter(Purchase);
