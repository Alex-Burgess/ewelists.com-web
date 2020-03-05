import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/custom/components/reserve/manageStyle.js";
const useStyles = makeStyles(styles);

function Manage(props) {
  const classes = useStyles();
  // const { listId, productId, name, email, product, reserveQuantity } = props;
  const { listId, productId, name, email } = props;
  const [error, setError] = useState('');

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
        setError('Oops! There was an issue unreserving this product, please contact us.');
      }
      return false
    }

    props.setReserved(false);
    props.setUnreserved(true);
  }

  return (
    <div className={classes.section}>
      <h3 className={classes.title + " " + classes.sectionHeading}><Update className={classes.icon}/>Manage Reservation</h3>
      <p className={classes.longText}>
        Don't worry if you don't want to buy right now, or need to make changes to this reservation.  We sent you a
        confirmation email with a link to update this at a later date.
      </p>
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
  product: PropTypes.object,
  reserveQuantity: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string
};

export default withRouter(Manage);
