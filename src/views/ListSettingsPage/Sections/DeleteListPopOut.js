import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
// libs
import { onError } from "libs/errorLib";
import { deleteList, deleteProduct } from "libs/apiLib";
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
import Button from "components/Buttons/Button.js";
import ErrorText from "components/Typography/Error.js";

import styles from "assets/jss/material-kit-pro-react/views/listSettingsPage/deleteListStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

function SectionDeletePopout(props) {
  const classes = useStyles();
  const history = useHistory();

  const { open, listId, products, setShowDeletePopOut } = props;
  const [error, setError] = useState('');

  const deleteAction = async event => {
    // Step 1: Delete the list
    try {
      await deleteList(listId);
    } catch (e) {
      setError('Unexpected error occurred when deleting list. Check that the list still exists.');
      return false
    }

    // Step 2: Delete notfound products
    for (var key in products) {
      let product = products[key];

      if (product.type === "notfound") {
        try {
          await deleteProduct(key)
        } catch (e) {
          onError("There was an issue cleaning up products when deleting the list.");
        }
      }
    }

    history.push('/');
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
        onClose={() => setShowDeletePopOut(false)}
        aria-labelledby="small-modal-slide-title"
        aria-describedby="small-modal-slide-description"
        data-cy="popout-delete"
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
            onClick={() => setShowDeletePopOut(false)}
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
          <Button color="secondary" onClick={() => setShowDeletePopOut(false)} data-cy="button-close">
            No
          </Button>
          <Button color="primary" onClick={deleteAction} data-cy="button-confirm">
            Yes
          </Button>
        </DialogActions>
        <DialogContent
          id="small-modal-slide-description"
          className={
            classes.modalFooter + " " + classes.centerText + " " + classes.error
          }
        >
          {error
            ? <ErrorText>
                <p>{error}</p>
              </ErrorText>
            : null
          }
        </DialogContent>
      </Dialog>
      {/* SMALL MODAL END */}
    </div>
  );
}

SectionDeletePopout.propTypes = {
  open: PropTypes.bool,
  listId: PropTypes.string,
  products: PropTypes.object,
  setShowDeletePopOut: PropTypes.func
};

export default SectionDeletePopout;
