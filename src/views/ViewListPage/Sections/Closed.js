import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/custom/views/viewListPage/listDetailsStyle.js";
const useStyles = makeStyles(styles);

export default function SectionDetails(props) {
  const classes = useStyles();


  return (
    <div className={classes.bannerWrapper}>
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
  )
}
