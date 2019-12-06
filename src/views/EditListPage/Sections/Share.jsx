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
import { API } from "aws-amplify";
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

import SectionUnsharePopout from "./UnsharePopOut.jsx";

import styles from "assets/jss/material-kit-pro-react/views/editListSections/shareStyle.jsx";

class SectionShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      errorMessage: '',
      message: '',
      popout: {},
    };
  }

  parseEmail(email) {
    email = email.trim();
    email = email.toLowerCase();
    return email
  }

  handleEmailChange = event => {
    let email = this.parseEmail(event.target.value)

    this.setState({
      newEmail: email
    });
  }

  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState({ popout: x });
  }

  handleOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState({ popout: x });
  }

  validateEmail(){
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      this.state.newEmail.length > 0 && regexp.test(this.state.newEmail)
    );
  }

  clearErrorState() {
    this.setState({ errorMessage: ''});
  }

  shareListWithUser = async event => {
    this.setState({ errorMessage: ''});

    let list_id = this.props.getListId();
    let email = this.state.newEmail;

    let response;

    try {
      response = await API.post("lists", "/" + list_id + "/share/" +  email);
    } catch (e) {
      console.log('Error message: ' + e.response.data.error);

      if (e.response.data.error === 'User already exists in list.') {
        this.setState({ errorMessage: 'User already exists in your list.'});
      } else {
        this.setState({ errorMessage: 'User could not be added to your list due to an unexpected error.'});
      }
      return false
    }

    this.setState({ newEmail: '' });
    this.props.addUserToSharedState(response.user);
  }


  renderRows(classes, shared) {
    let allrows = [];
    if (shared) {
      allrows = Object.entries(shared).map(
        ([key, user]) =>
              this.renderRow(classes, user)
      )

      allrows[shared.length] = { addnew: true, colspan: "2", col: {colspan: 1} }
    } else {
      allrows[1] = { addnew: true, colspan: "2", col: {colspan: 1} }
    }

    return allrows
  }

  renderRow(classes, user) {
    return ([
      <span>
        {user['name']}
      </span>,
      <span>
        {user['email']}
      </span>,
      <Tooltip
        key={8756431234}
        id="close1"
        title="Remove user"
        placement="left"
        classes={{ tooltip: classes.tooltip }}
      >
        <Button link className={classes.actionButton} onClick={() => this.handleOpen(user['email'])}>
          <Close />
        </Button>
      </Tooltip>
    ])
  }

  renderUnsharePopOuts(classes, shared) {
    return Object.entries(shared).map(
      ([key, user]) =>
            <SectionUnsharePopout
              open={this.state.popout[user['email']]
                ? this.state.popout[user['email']]
                : false }
              user={user}
              handleClose={this.handleClose.bind(this)}
              removeUserFromSharedState={this.props.removeUserFromSharedState.bind(this)}
              getListId={this.props.getListId.bind(this)}
              clearErrorState={this.clearErrorState.bind(this)}
              key={key}
            />
    )
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
                  id="newEmail"
                  formControlProps={{
                    fullWidth: false,
                    className: classes.customFormControl
                  }}
                  inputProps={{
                    placeholder: "Enter email...",
                    onChange: this.handleEmailChange,
                    value: this.state.newEmail,
                  }}
                />
                <Button color="primary" justIcon onClick={() => this.shareListWithUser()} disabled={!this.validateEmail()}>
                  <Add />
                </Button>
              </div>
              <div className={classes.errorContainer}>
                {this.state.errorMessage
                  ?
                    <div>
                      {this.state.errorMessage}
                    </div>
                  : null
                }
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
        {this.renderUnsharePopOuts(classes, shared)}
      </div>
    );
  }
}

SectionShare.propTypes = {
  classes: PropTypes.object,
  shared: PropTypes.object
};

export default withStyles(styles)(SectionShare);
