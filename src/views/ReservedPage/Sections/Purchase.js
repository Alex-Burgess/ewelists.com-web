import React, { useState } from 'react';
import { API } from "aws-amplify";
// libs
import { onError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Redeem from "@material-ui/icons/Redeem";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import ErrorText from "components/Typography/Error.js";

import styles from "assets/jss/material-kit-pro-react/views/reservedPageStyle.js";
const useStyles = makeStyles(styles);

function Purchase(props) {
  const classes = useStyles();
  const { resvId, listTitle, name, reservedQuantity, product, email } = props;

  const [error, setError] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);

  const purchased = async () => {
    setError('');
    setIsPurchasing(true);

    try {
      await API.put("lists", "/purchase/" + resvId + "/email/" + email, {
        body: {
          "quantity": reservedQuantity,
          "title": listTitle,
          "name": name,
          "product": {
            "type": product['type'],
            "brand": product['brand'],
            "details": product['details'],
            "productUrl": product['productUrl'],
            "imageUrl": product['imageUrl']
          }
        }
      });
    } catch (e) {
      onError(e);

      if (e.response.data.error === 'Product was already purchased.') {
        props.setReserved(false);
        props.setConfirmed(true);
      } else if (e.response.data.error === 'Product is not reserved by user.'){
        props.setReserved(false);
        props.setCancelled(true);
      } else {
        setError('Oops! There was an issue confirming the purchase of this gift, please contact us.');
      }

      setIsPurchasing(false);
      return false
    }

    setIsPurchasing(false);
    props.setReserved(false);
    props.setPurchased(true);
  }

  return (
    <div className={classes.section}>
      <h3 className={classes.subTitle + " " + classes.sectionHeading}><Redeem className={classes.icon}/> Purchase Gift</h3>
      <GridContainer>
        <GridItem md={9} sm={9} xs={12} >
          <p className={classes.shortText}>
            Ready to buy? Head over to the retailer to purchase this item.
          </p>
        </GridItem>
        <GridItem md={3} sm={3} xs={12} className={classes.buttonWrapper}>
          <a href={product['productUrl']} target="_blank" rel="noopener noreferrer" className={classes.linkWidth}>
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
          <Button color="primary2" className={classes.customButton} disabled={isPurchasing} onClick={() => purchased()}>
            Purchased
          </Button>
        </GridItem>
      </GridContainer>
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

Purchase.propTypes = {
  resvId: PropTypes.string,
  listTitle: PropTypes.string,
  name: PropTypes.string,
  reservedQuantity: PropTypes.number,
  product: PropTypes.object,
  email: PropTypes.string
};

export default Purchase;
