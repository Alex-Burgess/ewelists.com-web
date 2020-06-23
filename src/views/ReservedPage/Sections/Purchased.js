import React from 'react';
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-pro-react/views/reservedPageStyle.js";
const useStyles = makeStyles(styles);

export default function Unreserve(props) {
  const classes = useStyles();
  const { listId, listTitle } = props;

  return (
    <div className={classes.section}>
      <SnackbarContent
        message={
          <span className={classes.message}>
            Thank you for confirming you purchased this gift.  Head back to <Link to={"/lists/" + listId} className={classes.link}> {listTitle} </Link>
            to reserve another product.
          </span>
        }
        color="success"
        icon={Check}
      />
    </div>
  );
}

Unreserve.propTypes = {
  listId: PropTypes.string,
  listTitle: PropTypes.string
};
