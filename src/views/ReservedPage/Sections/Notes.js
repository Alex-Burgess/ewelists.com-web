import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-pro-react/views/reservedPageStyle.js";
const useStyles = makeStyles(styles);

function Purchase(props) {
  const classes = useStyles();

  const { notes } = props;

  return (
    <div className={classes.section}>
      <h3 className={classes.subTitle + " " + classes.sectionHeading}><ErrorOutlineOutlinedIcon className={classes.icon}/>Important Notes</h3>
      <GridContainer>
        <GridItem md={9} sm={9} xs={12} >
          <p className={classes.shortText}>
            {notes}
          </p>
        </GridItem>
      </GridContainer>
      <hr />
    </div>
  );
}

Purchase.propTypes = {
  notes: PropTypes.string
};

export default Purchase;
