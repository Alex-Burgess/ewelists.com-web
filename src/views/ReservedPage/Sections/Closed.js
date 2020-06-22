import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-pro-react/views/reservedPage/cancelledStyle.js";
const useStyles = makeStyles(styles);

export default function Closed(props) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <SnackbarContent
        message={
          <span className={classes.message}>
            This list is now closed.
          </span>
        }
        color="warning"
        icon="info_outline"
      />
    </div>
  );
}
