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
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.jsx";

import sectionStyle from "assets/jss/custom/views/editListPage/popoutStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionUnsharePopout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteError: false,
      deleteErrorMessage: null,
    };
  }

  deleteUser = async user => {
    this.props.clearErrorState();

    let list_id = this.props.getListId();
    let user_val;

    if (user['type'] === "PENDING") {
      user_val = encodeURIComponent(user['email'])
    } else if (user['type'] === "SHARED") {
      user_val = user['userId']
    } else {
      this.setState({ errorMessage: 'User could not be removed from your list due to an unexpected error.'});
      return false
    }

    try {
      await API.del("lists", "/" + list_id + "/share/" +  user_val, {
        body: {
          "share_type": user['type']
        }
      });
    } catch (e) {
      console.log('Error message: ' + e.response.data.error);
      this.setState({ errorMessage: 'User could not be removed from your list due to an unexpected error.'});
      return false
    }

    this.props.removeUserFromSharedState(user);
    this.props.handleClose(user['email']);
  }

  render() {
    const { classes, open, deleteError, user } = this.props;
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
            <h5><b>Are you sure you want to remove {user['name']}?</b></h5>
            <h5>They may have bought gifts on your list.</h5>
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
              onClick={() => this.deleteUser(user)}
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

SectionUnsharePopout.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  open: PropTypes.bool,
  deleteError: PropTypes.string
};

export default withStyles(sectionStyle)(SectionUnsharePopout);
