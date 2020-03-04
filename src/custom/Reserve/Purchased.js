import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/custom/components/reserve/unreservedStyle.js";
const useStyles = makeStyles(styles);

export default function Unreserve(props) {
  const classes = useStyles();
  const { listId, listTitle } = props;

  return (
    <div className={classes.section}>
      <SnackbarContent
        message={
          <span className={classes.message}>
            Thank you for confirming you purchased this gift.  Head back to <a href={"/lists/" + listId} className={classes.link}> {listTitle} </a>
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
