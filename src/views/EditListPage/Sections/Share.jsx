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
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";

import styles from "assets/jss/material-kit-pro-react/views/editListSections/shareStyle.jsx";

class SectionAddGifts extends React.Component {
  renderRows(classes, shared) {
    const allrows = Object.entries(shared).map(
      ([key, user]) =>
            this.renderRow(classes, user['name'], user['email'])
    )

    allrows[shared.length] =
      {
        addnew: true,
        colspan: "2",
        col: {
          colspan: 1,
        }
      }

    return allrows
  }

  renderRow(classes, name, email) {
    return ([
      <span>
        {name}
      </span>,
      <span>
        {email}
      </span>,
      <Tooltip
        key={8756431234}
        id="close1"
        title="Remove user"
        placement="left"
        classes={{ tooltip: classes.tooltip }}
      >
        <Button link className={classes.actionButton}>
          <Close />
        </Button>
      </Tooltip>
    ])
  }

  render() {
    const { classes, shared } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={10} lg={9}
              className={classes.mrAuto + " " + classes.mlAuto}
            >
              <div className={classes.textCenter}>
                <CustomInput
                  id="material"
                  formControlProps={{
                    fullWidth: false,
                    className: classes.customFormControl
                  }}
                  inputProps={{
                    placeholder: "Enter email..."
                  }}
                />
                <Button color="primary" justIcon>
                  <Add />
                </Button>
              </div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8} lg={8}
                  className={classes.mrAuto + " " + classes.mlAuto}
                >
                  <Table
                    tableHead={[
                      "Name",
                      "Email",
                      "Action"
                    ]}
                    tableData={
                      this.renderRows(classes, shared)
                    }
                    customCellClasses={[
                      classes.textCenter,
                    ]}
                    customClassesForCells={[2]}
                    customHeadCellClasses={[
                      classes.textCenter
                    ]}
                    customHeadClassesForCells={[2]}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionAddGifts.propTypes = {
  classes: PropTypes.object,
  shared: PropTypes.object
};

export default withStyles(styles)(SectionAddGifts);
