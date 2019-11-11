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
      newQuantity: this.props.product['quantity'],
      editError: ''
    };
  }

  increaseQuantity(){
    var quantity = this.state.newQuantity;
    quantity = quantity + 1;
    this.setState({ newQuantity: quantity})
  }

  decreaseQuantity(){
    var quantity = this.state.newQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    this.setState({ newQuantity: quantity})
  }

  closeEditPopOut(){
    this.setState({newQuantity: this.props.product['quantity']});
    this.props.handleClose(this.props.product['productId']);
  }

  deleteProduct = async event => {
    let productId = this.props.product['productId'];
    let type = this.props.product['type'];
    let listId = this.props.getListId();
    console.log("Deleting product (" + productId + ") of type (" + type + ") from list (" + listId + ").");

    try {
      await API.del("lists", "/" + listId + "/product/" +  productId);
    } catch (e) {
      console.log('Unexpected error occurred when adding product to list: ' + e.response.data.error);
      this.setState({ editError: 'Product could not be added to your list.'});
      return false
    }

    console.log("Deleted product from list: " + productId);

    if (type === 'notfound'){
      // Delete product from table
      try {
        await API.del("notfound", "/" + productId);
      } catch (e) {
        console.log('Unexpected error occurred when deleting product: ' + e.response.data.error);
        this.setState({ editError: 'Product could not be deleted.'});
        return false
      }

      console.log("Deleted product from notfound table: " + productId);
    }

    this.props.deleteProductFromState(productId);
    this.props.handleClose(productId);
  }

  updateProduct = async event => {
    let productId = this.props.product['productId'];
    let listId = this.props.getListId()
    let quantity = this.props.product['quantity'];

    if (quantity === this.state.newQuantity) {
      console.log("There are no updates to this item.");
      this.setState({ editError: 'There are no updates to this item.'});
      return false;
    }

    console.log("Updating product (" + productId + ") for list (" + listId + ")");


    try {
      await API.put("lists", "/" + listId + "/product/" +  productId, {
        body: { "quantity": this.state.newQuantity }
      });
    } catch (e) {
      console.log('Unexpected error occurred when creating product: ' + e);
      this.setState({ editError: 'Product could not be updated.'});
      return false
    }

    let product = {
      productId: productId,
      quantity: this.state.newQuantity,
      reserved: this.props.product['reserved'],
      brand: this.props.product['brand'],
      details: this.props.product['details'],
      type: this.props.product['type'],
      productUrl: this.props.product['productUrl'],
      imageUrl: this.props.product['imageUrl']
    }

    this.props.updateProductToState(product)
    this.setState({ message: 'Product was added to your list.'});

    this.props.handleClose(productId);
  }

  render() {
    // const { classes, open, brand, description, url, img } = this.props;
    const { classes, open, product } = this.props;
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
          onClose={() => this.closeEditPopOut()}
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
              onClick={() => this.closeEditPopOut()}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <Card plain product>
              <CardHeader noShadow productTable>
                <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                  <img src={product['imageUrl']} className={classes.productImage} alt=".." />
                </a>
              </CardHeader>
              <CardBody plain className={classes.productDetails}>
                <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
                  <h4 className={classes.cardTitle}>{product['brand']}</h4>
                </a>
                <p className={classes.description}>
                  {product['description']}
                </p>
                <p className={classes.description}>
                  Reserved: {product['reserved']}
                </p>
                <div className={classes.textCenter}>
                  <InputLabel className={classes.label}>
                    Quantity:
                    <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity()}>
                      <Remove />
                    </Button>
                    {` `}{this.state.newQuantity}{` `}
                    <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity()}>
                      <Add />
                    </Button>
                  </InputLabel>
                  <Button round color="default" type="submit" onClick={() => this.deleteProduct()}>
                    Delete
                  </Button>
                  <Button round color="primary" type="submit" onClick={() => this.updateProduct()}>
                    Update
                  </Button>
                </div>
                {this.state.editError
                  ?
                    <div className={classes.errorContainer + " " + classes.centerText + " " + classes.error}>
                      {this.state.editError}
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
  product: PropTypes.object
};

export default withStyles(sectionStyle)(SectionDetails);
