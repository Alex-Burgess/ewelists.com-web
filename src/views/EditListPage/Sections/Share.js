import React, { useState } from 'react';
import { API } from "aws-amplify";
import update from 'immutability-helper';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";

import SectionUnsharePopout from "./UnsharePopOut.js";

import styles from "assets/jss/custom/views/editListPage/shareStyle.js";
const useStyles = makeStyles(styles);

export default function SectionShare(props) {
  const classes = useStyles();

  const { listId, shared } = props;

  const [newEmail, setNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [unsharePopouts, setUnsharePopouts] = useState({});

  const clearFormState = () => {
    setNewEmail('');
    setErrorMessage('');
  }

  const parseEmail = (email) => {
    email = email.trim();
    email = email.toLowerCase();
    return email
  }

  const validateEmail = () => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      newEmail.length > 0 && regexp.test(newEmail)
    );
  }

  const handleEmailChange = event => {
    let email = parseEmail(event.target.value)
    setNewEmail(email);
  }

  const handleClose = (email) => {
    setUnsharePopouts({
      unsharePopouts: update(unsharePopouts, {
        [email]: {$set: false}
      })
    })
  }

  const openUnsharePopout = (email) => {
    clearFormState();

    setUnsharePopouts({
      ...unsharePopouts,
        [email]: true
    })
  }

  const shareListWithUser = async (event) => {
    let user;

    try {
      const response = await API.post("lists", "/" + listId + "/share/" +  newEmail);
      user = response.user

    } catch (e) {
      console.log('Error message: ' + JSON.stringify(e));

      if (! e.response) {
        setErrorMessage('User could not be added to your list due to an unexpected error.')
      } else {
        if (e.response.data.error === 'User already exists in list.') {
          setErrorMessage(newEmail + ' already exists in your list.')
          setNewEmail('');
        } else {
          setErrorMessage('User could not be added to your list due to an unexpected error.')
        }
      }
      return false
    }

    clearFormState();
    props.addUserToSharedState(user);
  }


  const renderRows = (shared) => {
    let allrows = [];
    if (shared) {
      allrows = Object.entries(shared).map(
        ([key, user]) =>
              renderRow(user)
      )

      allrows[shared.length] = { addnew: true, colspan: "2", col: {colspan: 1} }
    } else {
      allrows[1] = { addnew: true, colspan: "2", col: {colspan: 1} }
    }

    return allrows
  }

  const renderRow = (user) => {
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
        <Button link className={classes.actionButton} onClick={() => openUnsharePopout(user['email'])}>
          <Close />
        </Button>
      </Tooltip>
    ])
  }

  const renderUnsharePopOuts = (listId, shared) => {
    return Object.entries(shared).map(
      ([key, user]) =>
            <SectionUnsharePopout
              listId={listId}
              open={unsharePopouts[user['email']]
                ? unsharePopouts[user['email']]
                : false }
              user={user}
              handleClose={handleClose}
              removeUserFromSharedState={props.removeUserFromSharedState}
              key={key}
            />
    )
  }

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
                  onChange: handleEmailChange,
                  value: newEmail,
                }}
              />
              <Button color="primary" justIcon onClick={() => shareListWithUser()} disabled={!validateEmail()}>
                <Add />
              </Button>
            </div>
            <div className={classes.errorContainer}>
              {errorMessage
                ?
                  <div>
                    {errorMessage}
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
                    renderRows(shared)
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
      {renderUnsharePopOuts(listId, shared)}
    </div>
  );
}

SectionShare.propTypes = {
  listId: PropTypes.string,
  shared: PropTypes.object
};
