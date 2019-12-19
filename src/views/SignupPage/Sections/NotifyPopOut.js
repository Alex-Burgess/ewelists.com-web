import React from 'react';
import { Auth } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/custom/views/signupPageStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function NotifyPopOut(props) {
  const classes = useStyles();
  const { open, socialType } = props;

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal + " " + classes.modalSmall
      }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => props.setPopoutModal(false)}
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
          onClick={() => props.setPopoutModal(false)}
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
        <h5>If this is your first time signing in with your <b>{socialType}</b> account, you might find you are redirected to
          our login page.  If this happens, just click on the <b>{socialType}</b> icon and you'll be logged in as normal from then on.</h5>
      </DialogContent>
      <DialogActions
        className={
          classes.modalFooter + " " + classes.modalFooterCenter
        }
      >
        <Button
          onClick={() => Auth.federatedSignIn({provider: socialType})}
          block
          round
          className={
            classes.modalSmallFooterFirstButton +
            " " +
            classes.modalSmallFooterSecondButton
          }
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NotifyPopOut.propTypes = {
  open: PropTypes.bool,
  socialType: PropTypes.string.isRequired
};
