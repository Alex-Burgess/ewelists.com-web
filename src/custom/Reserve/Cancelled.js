import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/custom/components/reserve/cancelledStyle.js";
const useStyles = makeStyles(styles);

export default function Unreserve(props) {
  const classes = useStyles();
  const { listId, listTitle } = props;

  return (
    <div className={classes.section}>
      <SnackbarContent
        message={
          <span className={classes.message}>
            Looks like you unreserved this product.  Head back to <a href={"/lists/" + listId} className={classes.link}> {listTitle} </a>
            to reserve another product.
          </span>
        }
        color="danger"
        icon="info_outline"
      />
    </div>
  );
}

Unreserve.propTypes = {
  listId: PropTypes.string,
  listTitle: PropTypes.string
};