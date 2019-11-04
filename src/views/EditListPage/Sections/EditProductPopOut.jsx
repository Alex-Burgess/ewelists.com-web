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

import sectionStyle from "assets/jss/material-kit-pro-react/views/editListSections/editProductPopOutStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  render() {
    const { classes, open, productId, brand, description, quantity, url, img } = this.props;
    return (
      <div className={classes.section}>
        {/* NOTICE MODAL START */}
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalSignup
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.props.handleClose(productId)}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <Card plain className={classes.modalSignupCard}>
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
              <GridContainer>
                <GridItem md={6} sm={6}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href={url}>
                        <img src={img} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                  </Card>
                </GridItem>
                <GridItem md={6} sm={6}>
                  <h2 className={classes.title}>{brand}</h2>
                  <p>{description}</p>
                  <InputLabel className={classes.label}>
                    Quantity: {quantity}{` `}
                    <div className={classes.buttonGroup}>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.firstButton}
                      >
                        <Remove />
                      </Button>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.lastButton}
                      >
                        <Add />
                      </Button>
                    </div>
                  </InputLabel>
                  <InputLabel className={classes.label}>
                    Reserved: 0
                  </InputLabel>
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
  productId: PropTypes.string,
  brand: PropTypes.string,
  description: PropTypes.string,
  quanity: PropTypes.number,
  url: PropTypes.string,
  img: PropTypes.string
};

export default withStyles(sectionStyle)(SectionDetails);
