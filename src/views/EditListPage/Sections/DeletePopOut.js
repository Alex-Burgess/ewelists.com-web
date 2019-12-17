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
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import sectionStyle from "assets/jss/custom/views/editListPage/popoutStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDeletePopout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteError: false,
      deleteErrorMessage: null,
    };
  }

  render() {
    const { classes, open, deleteError } = this.props;
    return (
      <div className={classes.section}>
        {/* SMALL MODAL START */}
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalSmall
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.props.handleClose("smallModal")}
          aria-labelledby="small-modal-slide-title"
          aria-describedby="small-modal-slide-description"
        >
          <DialogTitle
            id="small-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.props.handleClose("smallModal")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
          </DialogTitle>
          <DialogContent
            id="small-modal-slide-description"
            className={
              classes.modalBody + " " + classes.modalSmallBody + " " + classes.centerText
            }
          >
            <h5><b>Are you sure you want to delete this list?</b></h5>
            <h5>This cannot be undone.</h5>
          </DialogContent>
          <DialogActions
            className={
              classes.modalFooter + " " + classes.modalFooterCenter
            }
          >
            <Button
              onClick={() => this.props.handleClose("smallModal")}
              color="success"
              block
              round
              className={classes.modalSmallFooterFirstButton}
            >
              No
            </Button>
            <Button
              onClick={this.props.deleteList}
              color="default"
              block
              round
              className={
                classes.modalSmallFooterFirstButton +
                " " +
                classes.modalSmallFooterSecondButton
              }
            >
              Yes
            </Button>
          </DialogActions>
          <DialogContent
            id="small-modal-slide-description"
            className={
              classes.modalFooter + " " + classes.centerText + " " + classes.error
            }
          >
            {deleteError
              ?
                <div className={classes.errorContainer}>
                  {deleteError}
                  <a href="/"> Click here to go back to your lists.</a>
                </div>
              : null
            }
          </DialogContent>
        </Dialog>
        {/* SMALL MODAL END */}
      </div>
    );
  }
}

SectionDeletePopout.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  deleteError: PropTypes.string
};

export default withStyles(sectionStyle)(SectionDeletePopout);
