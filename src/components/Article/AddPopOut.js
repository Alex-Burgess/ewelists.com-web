import React, { useState } from 'react';
import update from 'immutability-helper';
import { API } from "aws-amplify";
// libs
import { onError, debugError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";
import Done from "@material-ui/icons/Done";
// core components
import Button from "components/Buttons/Button.js";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "components/Table/Table.js";
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from "assets/jss/material-kit-pro-react/components/article/addPopoutStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function AddPopOut(props) {
  const classes = useStyles();
  const { open, lists, product } = props;
  const [added, setAdded] = useState({});
  const [adding, setAdding] = useState({});
  const [addError, setAddError] = useState({});

  const closeEditPopOut = () => {
    clearError();
    props.handleClose(product['productId']);
  }

  const updateAdding = (state, id) => {
    if (state) {
      setAdding({
        ...adding,
          [id]: true
      })
    } else {
      setAdding({
        adding: update(adding, {
          [id]: {$set: false}
        })
      })
    }
  }

  const clearError = (id) => {
    if (id) {
      setAddError({
        addError: update(addError, {
          [id]: {$set: false}
        })
      })
    } else {
      setAddError({});
    }
  }

  const addProductToList = async (listId) => {
    updateAdding(true, listId);
    clearError(listId);

    let productId = product.productId;
    debugError("adding product (" + productId + ") to list: (" + listId + ")");

    try {
      await API.post("lists", "/" + listId + "/product/" +  productId, {
        body: {
          "quantity": "1",
          "productType": "products"
        }
      });
      debugError("Added product to list.")
    } catch (e) {
      onError(e);

      if (e.response.data.error !== 'Product already exists in list.') {
        setAddError({
          ...addError, [listId]: 'Could not be added.'
        })

        updateAdding(false, listId);
        return false
      }
    }

    setAdded({
      ...added, [listId]: true
    })
    updateAdding(false, listId);
    return true
  }

  const renderListsTable = () => {
    return (
      <Table
        tableData={
          renderRow()
        }
        tableShopping
        customCellClasses={[
          classes.listText,
          classes.buttonCell,
        ]}
        customClassesForCells={[0, 1]}
      />
    )
  }

  const renderButton = (id, list) => {
    if ((list.products.indexOf(product.productId) > -1 ) || (added[id])) {
      return (
        <Button round justIcon color="success" disabled className={classes.successButton}>
          <Done />
        </Button>
      )
    } else if(adding[id]) {
      return (
        <div className={classes.progressWrapper}>
          <Button round justIcon color="primary" disabled>
            <Add />
          </Button>
          <CircularProgress className={classes.fabProgress} size={51}/>
        </div>
      )
    } else {
      return (
        <Button round justIcon color="primary" onClick={() => addProductToList(id)}>
          <Add />
        </Button>
      )
    }
  }


  const renderRow = () => {
    if (Object.keys(lists).length > 0) {
      return Object.entries(lists).map(
        ([id, list]) =>
          [
            <span>
              <small className={classes.tdNameSmall}>
                {list.title}
                { addError[id]
                  ? <div className={classes.addError}>{addError[id]}</div>
                  : null
                }
              </small>
            </span>,
            <span>
              {renderButton(id, list)}
            </span>
          ]
      )
    } else {
      return [
        [
          <span>
            <small className={classes.tdNameSmall}>
              You have no lists yet...
            </small>
          </span>,
          <span>
            <a href={"/?create"} target="_blank" rel="noopener noreferrer">
              <Button round color="primary">
                Create a list
              </Button>
            </a>
          </span>
        ]
      ]
    }

  }

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
        onClose={() => closeEditPopOut()}
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
          onClick={() => closeEditPopOut()}
        >
          {" "}
          <Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>
          Add Item to List
        </h4>
      </DialogTitle>
      <DialogContent
        id="notice-modal-slide-description"
        className={classes.modalBody}
      >
      <div className={classes.productImageContainer}>
        <img src={product['imageUrl']} className={classes.productImage} alt=".." />
      </div>
      <div>
        <h4 className={classes.cardTitle}>{product.brand}</h4>
      </div>
      <div>
        <p className={classes.description}>
          {product.description}
        </p>
      </div>
      {renderListsTable()}
      </DialogContent>
      </Dialog>
      {/* NOTICE MODAL END */}
    </div>
  );
}

AddPopOut.propTypes = {
  open: PropTypes.bool,
  lists: PropTypes.object,
  product: PropTypes.object
};
