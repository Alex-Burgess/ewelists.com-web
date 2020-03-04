import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import Update from "@material-ui/icons/Update";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/custom/components/reserve/unreservedStyle.js";
const useStyles = makeStyles(styles);

export default function Unreserve(props) {
  const classes = useStyles();
  const { listId, listTitle } = props;

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem md={9} sm={9} xs={12} className={classes.centerContent}>
          <p className={classes.shortText}>
            This gift was unreserved.  Head back to <a href={"/lists/" + listId}> {listTitle} </a>
            to reserve another product.
          </p>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Unreserve.propTypes = {
  listId: PropTypes.string,
  listTitle: PropTypes.string
};
