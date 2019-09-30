/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Today from "@material-ui/icons/Today";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import sectionDetailsStyle from "assets/jss/material-kit-pro-react/views/editListSections/editDetailsStyle.jsx";

function SectionDetails({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <InputLabel className={classes.label}>
              Title:
            </InputLabel>
            <CustomInput
              id="title"
              title
              inputProps={{
                placeholder: "Add your title here...",
              }}
              formControlProps={{
                fullWidth: true,
              }}
            />
            <br />
            <InputLabel className={classes.label + " " + classes.date}>
              Date:
            </InputLabel>
            <FormControl>
              <Datetime
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                inputProps={{ placeholder: "Select a date" }}
              />
            </FormControl>
            <p />
            <InputLabel className={classes.label}>
              Description:
            </InputLabel>
            <CustomInput
              id="textarea-input"
              description
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Add your description here...",
                multiline: true,
                rows: 3
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionDetails.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionDetailsStyle)(SectionDetails);
