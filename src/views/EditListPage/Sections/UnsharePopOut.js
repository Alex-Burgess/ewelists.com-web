import React, { useState } from 'react';
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
// Styles
import styles from "assets/jss/custom/views/editListPage/popoutStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function SectionUnsharePopout(props) {
  const classes = useStyles();

  const { listId, open, user } = props;

  const [errorMessage, setErrorMessage] = useState('');

  const deleteUser = async user => {
    setErrorMessage('');

    console.log("User: " + JSON.stringify(user));

    let user_val;

    if (user['type'] === "PENDING") {
      user_val = encodeURIComponent(user['email'])
    } else if (user['type'] === "SHARED") {
      user_val = user['userId']
    } else {
      setErrorMessage('User could not be removed from your list due to an unexpected error.');
      return false
    }

    try {
      await API.del("lists", "/" + listId + "/share/" +  user_val, {
        body: {
          "share_type": user['type']
        }
      });
    } catch (e) {
      console.log('Error message: ' + e.response.data.error);
      setErrorMessage('User could not be removed from your list due to an unexpected error.');
      return false
    }

    props.removeUserFromSharedState(user['email']);
    props.handleClose(user['email']);
  }

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
        onClose={() => props.handleClose("smallModal")}
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
            onClick={() => props.handleClose("smallModal")}
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
            onClick={() => props.handleClose("smallModal")}
            color="success"
            block
            round
            className={classes.modalSmallFooterFirstButton}
          >
            No
          </Button>
          <Button
            onClick={() => deleteUser(user)}
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
          {errorMessage
            ?
              <div className={classes.errorContainer}>
                {errorMessage}
              </div>
            : null
          }
        </DialogContent>
      </Dialog>
      {/* SMALL MODAL END */}
    </div>
  );
}

SectionUnsharePopout.propTypes = {
  listId: PropTypes.string,
  user: PropTypes.object,
  open: PropTypes.bool
};
