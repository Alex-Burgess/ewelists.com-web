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
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import sectionStyle from "assets/jss/material-kit-pro-react/views/viewListSections/reservePopOutStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveQuantity: 1,
      reserveError: '',
      updateUserQuantity: 0
    };
  }

  componentWillMount(props){
    if (this.props.reservedDetails) {
        this.setState({updateUserQuantity: this.props.reservedDetails['quantity']});
    }
  }

  // componentDidUpdate(props) {
  //   if (this.props.reservedDetails) {
  //       this.setState({updateUserQuantity: this.props.reservedDetails['quantity']});
  //   }
  // }

  increaseQuantity(){
    var quantity = this.state.reserveQuantity;

    const remaining = this.props.product['quantity'] - this.props.product['reserved'];

    if (quantity < remaining){
      quantity = quantity + 1;
    }

    this.setState({ reserveQuantity: quantity})
  }

  decreaseQuantity(){
    var quantity = this.state.reserveQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    this.setState({ reserveQuantity: quantity})
  }

  updateReservedQuantity(){
    var quantity = this.state.updateUserQuantity;

    const remaining = this.props.product['quantity'] - this.props.product['reserved'];

    if (quantity <= remaining){
      quantity = quantity + 1;
    }

    this.setState({ updateUserQuantity: quantity})
  }

  decreaseReservedQuantity(){
    var quantity = this.state.updateUserQuantity;

    if (quantity >= 1) {
      quantity = quantity - 1;
    }

    this.setState({ updateUserQuantity: quantity})
  }

  reserveProduct = async event => {
    let productId = this.props.product['productId'];
    let listId = this.props.getListId()
    console.log("Reserving product (" + productId + ") for list (" + listId + ").  Quantity (" + this.state.reserveQuantity + ")");

    try {
      await API.post("lists", "/" + listId + "/reserve/" +  productId, {
        body: { "quantity": this.state.reserveQuantity }
        // body: { "quantity": this.state.reserveQuantity, "message": 'A test message' }
      });
    } catch (e) {
      console.log('Unexpected error occurred when reserving product: ' + e);
      this.setState({ reserveError: 'Product could not be reserved.'});
      return false
    }

    this.props.updateReservedQuantity(this.state.reserveQuantity, this.props.product);

    this.setState({updateUserQuantity: this.state.reserveQuantity});
  }

  updateReservation = async event => {
    let productId = this.props.product['productId'];
    let listId = this.props.getListId()
    let newQuantity = this.state.updateUserQuantity;

    if (newQuantity === 0) {
      console.log("Unreserving product (" + productId + ") for list (" + listId + ") for user.  Quantity (" + this.state.updateUserQuantity + ")");
      try {
        await API.del("lists", "/" + listId + "/reserve/" +  productId);
      } catch (e) {
        console.log('Unexpected error occurred when unreserving product: ' + e);
        this.setState({ reserveError: 'Product could not be unreserved.'});
        return false
      }
    } else {
      console.log("Updating number of product (" + productId + ") for list (" + listId + ") reserved by user.  Quantity (" + this.state.updateUserQuantity + ")");
    }
  }

  render() {
    const { classes, open, product, reservedDetails } = this.props;
    return (
      <div className={classes.section}>
        {/* NOTICE MODAL START */}
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalSignup + " " + classes.reservePopout
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.props.handleClose(product['productId'])}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <Card plain className={classes.modalSignupCard + " " + classes.reserveCard}>
            <DialogContent
              id="notice-modal-slide-description"
              className={classes.modalBody}
            >
              <GridContainer className={classes.reserveContainer}>
                <GridItem md={12} sm={12} xs={12}>
                  <Button
                    simple
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    onClick={() => this.props.handleClose(product['productId'])}
                  >
                    {" "}
                    <Close className={classes.modalClose} />
                  </Button>
                </GridItem>
              </GridContainer>
              <GridContainer className={classes.reserveContainer}>
                <GridItem md={6} sm={6} xs={12}>
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
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem md={6} sm={6} xs={12}>
                  <h3 className={classes.title + " " + classes.stepOne}>Step 1: Reserve Item</h3>
                  <div className={classes.mobileCenter}>
                    <div className={classes.quantity}>
                      <InputLabel className={classes.label}>
                        Remaining items: {product['quantity'] - product['reserved']}
                      </InputLabel>
                      <InputLabel className={classes.label}>
                        Reserved by you: {reservedDetails ? reservedDetails['quantity'] : 0 }
                      </InputLabel>
                      {product['reserved'] > 0
                        ? <div>
                            <InputLabel className={classes.labelQuantity}>
                              Update how many you have reserved below:
                            </InputLabel>
                            <InputLabel>
                              Quantity:
                              <Button color="primary" size="sm" simple onClick={() => this.decreaseReservedQuantity()}>
                                <Remove />
                              </Button>
                              {` `}
                              {this.state.updateUserQuantity}
                              {` `}
                              <Button color="primary" size="sm" simple onClick={() => this.updateReservedQuantity()}>
                                <Add />
                              </Button>
                            </InputLabel>
                          </div>
                        : <div>
                            <InputLabel className={classes.labelQuantity}>
                              How many items would you like to reserve?
                            </InputLabel>
                            <InputLabel>
                              Quantity:
                              <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity()}>
                                <Remove />
                              </Button>
                              {` `}{this.state.reserveQuantity}{` `}
                              <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity()}>
                                <Add />
                              </Button>
                            </InputLabel>
                          </div>
                      }


                    </div>
                    {reservedDetails
                      ? <div>
                          <Button default color="primary" className={classes.reserveButton} onClick={() => this.updateReservation()}>
                            Update
                          </Button>
                        </div>
                      : product['reserved'] < product['quantity']
                        ? <Button default color="primary" className={classes.reserveButton} onClick={() => this.reserveProduct()}>
                            Reserve Gift
                          </Button>
                        : <Button default color="default" className={classes.reserveButton} disabled>
                            Reserved
                          </Button>
                    }
                    {this.state.reserveError
                      ?
                        <div className={classes.errorContainer}>
                          {this.state.reserveError}
                        </div>
                      : null
                    }
                  </div>
                  <h3 className={classes.title}>Step 2: Purchase Item</h3>
                  <div className={classes.mobileCenter}>
                    <div className={classes.purchase}>
                      <InputLabel className={classes.label}>
                        Head to the site now to buy the item.
                      </InputLabel>
                    </div>
                    <Button default color="primary" className={classes.reserveButton}>
                      <a href={product['productUrl']} target="_blank" rel="noopener noreferrer" className={classes.buttonLink}>
                        Purchase Gift
                      </a>
                    </Button>
                  </div>
                </GridItem>
              </GridContainer>
            </DialogContent>
          </Card>
        </Dialog>
        {/* NOTICE MODAL END */}
      </div>
    );
  }
}

SectionDetails.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  product: PropTypes.object,
  reservedDetails: PropTypes.object
};

export default withStyles(sectionStyle)(SectionDetails);
