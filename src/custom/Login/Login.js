import React from 'react';
import { Auth } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AmazonButton from "custom/Buttons/AmazonButton.js";

import styles from "assets/jss/custom/components/loginStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function LoginPopout(props) {
  const classes = useStyles();
  const { open, account, loginType } = props;

  const renderLoginButton = (account) => {
    if (account === 'Google') {
      return (
        <Button color="google" onClick={() => Auth.federatedSignIn({provider: 'Google'})}>
          <i className="fab fa-google" /> Log in with Google
        </Button>
      )
    } else if (account === 'Amazon') {
      return (
        <AmazonButton color="amazon" onClick={() => Auth.federatedSignIn({provider: 'LoginWithAmazon'})}>
          <i className="fab fa-amazon" /> Log in with Amazon
        </AmazonButton>
      )
    } else if (account === 'Facebook') {
      return (
        <Button color="facebook" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>
          <i className="fab fa-facebook" /> Log in with Facebook
        </Button>
      )
    }
  }

  return (
    <div>
      {/* NOTICE MODAL START */}
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalLogin
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setLogin(false)}
        aria-labelledby="login-modal-slide-title"
        aria-describedby="login-modal-slide-description"
      >
        <Card plain className={classes.modalLoginCard}>
          <DialogTitle
            id="login-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <CardHeader
              plain
              color="info"
              className={
                classes.textCenter + " " + classes.cardLoginHeader
              }
            >
              <Button
                simple
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                onClick={() => props.setLogin(false)}
              >
                {" "}
                <Close className={classes.modalClose} />
              </Button>
              {loginType === 'LinkedLogon'
                ? <h5 className={classes.cardTitleWhite}>Please Login Again</h5>
                : <h5 className={classes.cardTitleWhite}>Sign Up Complete</h5>
              }

            </CardHeader>
          </DialogTitle>
          <DialogContent id="login-modal-slide-description" className={classes.modalBody + " " + classes.loginMessage}>
            <p className={classes.description + " " + classes.textCenter}>
              {loginType === 'LinkedLogon'
                ? "We had to do a little configuration so you can log in with your " + account + " account."
                : "Now that we've setup your account, you can go ahead and log in."
              }

            </p>
            <CardBody className={classes.cardLoginBody}>
              {renderLoginButton(account)}
            </CardBody>
          </DialogContent>
        </Card>
      </Dialog>
      {/* NOTICE MODAL END */}
    </div>
  );
}

LoginPopout.propTypes = {
  open: PropTypes.bool,
  account: PropTypes.string,
  loginType: PropTypes.string
};
