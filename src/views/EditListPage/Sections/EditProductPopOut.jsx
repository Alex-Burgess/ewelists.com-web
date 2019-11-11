import React from "react";
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating date-time-picker
// nodejs library that concatenates classes
import withStyles from "@material-ui/core/styles/withStyles";
// import classNames from "classnames";
// @material-ui/core components
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import sectionStyle from "assets/jss/material-kit-pro-react/views/editListSections/editProductPopOutStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuantity: 1,
      deleteError: ''
    };
  }

  increaseQuantity(){
    var quantity = this.state.addQuantity;
    quantity = quantity + 1;
    this.setState({ addQuantity: quantity})
  }

  decreaseQuantity(){
    var quantity = this.state.addQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    this.setState({ addQuantity: quantity})
  }

  deleteProduct = async event => {
    let productId = this.props.productId;
    let type = this.props.type;
    let list_id = this.props.listId;
    console.log("Deleting product (" + productId + ") of type (" + type + ") from list (" + list_id + ").");

    try {
      const response = await API.del("lists", "/" + list_id + "/product/" +  productId);
    } catch (e) {
      console.log('Unexpected error occurred when adding product to list: ' + e.response.data.error);
      this.setState({ errorMessage: 'Product could not be added to your list.'});
      return false
    }

    console.log("Deleted product from list: " + productId);

    if (type == 'notfound'){
      // Delete product from table
      try {
        const response = await API.del("notfound", "/" + productId);
      } catch (e) {
        console.log('Unexpected error occurred when deleting product: ' + e.response.data.error);
        this.setState({ deleteError: 'Product could not be deleted.'});
        return false
      }

      console.log("Deleted product from notfound table: " + productId);
    }

    this.props.deleteProductFromState(productId);

    this.props.handleClose(productId);
    // Print error if not deleted
  }

  render() {
    const { classes, open, productId, brand, description, quantity, url, img } = this.props;
    return (
      <div className={classes.section}>
        {/* NOTICE MODAL START */}
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.props.handleClose(productId)}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.props.handleClose(productId)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <Card plain product>
              <CardHeader noShadow image>
                <a href={url}>
                  <img src={img} className={classes.productImage} alt=".." />
                </a>
              </CardHeader>
              <CardBody plain className={classes.productDetails}>
                <a href={url}>
                  <h4 className={classes.cardTitle}>{brand}</h4>
                </a>
                <p className={classes.description}>
                  {description}
                </p>
                <p className={classes.description}>
                  Reserved: 0
                </p>
                <div className={classes.textCenter}>
                  <InputLabel className={classes.label}>
                    Quantity:
                    <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity()}>
                      <Remove />
                    </Button>
                    {` `}{this.state.addQuantity}{` `}
                    <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity()}>
                      <Add />
                    </Button>
                  </InputLabel>
                  <Button round color="default" type="submit" onClick={() => this.deleteProduct()}>
                    Delete
                  </Button>
                  <Button round color="primary" type="submit">
                    Update
                  </Button>
                </div>
                {this.state.deleteError
                  ?
                    <div className={classes.errorContainer + " " + classes.centerText + " " + classes.error}>
                      {this.state.deleteError}
                    </div>
                  : null
                }
              </CardBody>
            </Card>
          </DialogContent>
        </Dialog>
        {/* NOTICE MODAL END */}
      </div>
    );
  }
}

SectionDetails.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  productId: PropTypes.string,
  brand: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number,
  url: PropTypes.string,
  img: PropTypes.string
};

export default withStyles(sectionStyle)(SectionDetails);
