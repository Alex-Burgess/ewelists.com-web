import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating date-time-picker
// nodejs library that concatenates classes
import withStyles from "@material-ui/core/styles/withStyles";
// import classNames from "classnames";
// @material-ui/core components
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import sectionStyle from "assets/jss/material-kit-pro-react/views/editListSections/deletePopOutStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // deleteError: false,
      // deleteErrorMessage: null,
    };
  }

  render() {
    const { classes, open } = this.props;
    return (
      <div>
        {/* NOTICE MODAL START */}
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.props.handleClose("addModal")}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <DialogTitle
            id="notice-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.props.handleClose("addModal")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h3 className={classes.modalTitle}>
              Add an item:
            </h3>
          </DialogTitle>
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            <InputLabel className={classes.label}>
              Name:
            </InputLabel>
            <CustomInput
              id="name"
              inputProps={{
                placeholder: "e.g. BABYBORN",
                // defaultValue: title,
                // onChange: this.props.handleChange
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
            <InputLabel className={classes.label}>
              Details:
            </InputLabel>
            <CustomInput
              id="details"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "e.g. Travel Cot Easy Go, Anthracite, with transport bag.",
                // defaultValue: description,
                // onChange: this.props.handleChange
              }}
            />
            <InputLabel className={classes.label}>
              Url (Optional):
            </InputLabel>
            <CustomInput
              id="url"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Add your url here... e.g. https://amazon.co.uk/....",
                // defaultValue: description,
                // onChange: this.props.handleChange
              }}
            />
            <InputLabel className={classes.label}>
              Quantity:
            </InputLabel>
            1{` `}
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
          </DialogContent>
          <DialogActions
            className={
              classes.modalFooter + " " + classes.modalFooterCenter
            }
          >
            <Button
              onClick={() => this.props.handleClose("addModal")}
              color="info"
              round
            >
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
        {/* NOTICE MODAL END */}
      </div>
    );
  }
}

SectionDetails.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  // deleteError: PropTypes.string
};

export default withStyles(sectionStyle)(SectionDetails);
