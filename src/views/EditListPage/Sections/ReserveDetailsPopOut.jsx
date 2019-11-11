import React from "react";
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
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import sectionStyle from "assets/jss/material-kit-pro-react/views/editListSections/reserveDetailsPopOutStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuantity: 1
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

  render() {
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
          onClose={() => this.props.handleClose(product['productId'])}
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
              onClick={() => this.props.handleClose(product['productId'])}
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
                  Quantity: {product['quantity']}
                </p>
                <p className={classes.description}>
                  Reserved: {product['reserved']}
                </p>
                <div className={classes.textCenter}>

                </div>
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
