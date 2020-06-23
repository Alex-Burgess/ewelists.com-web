import React, { useState } from 'react';
import { Auth } from "aws-amplify";
// libs
import { onAuthError, debugError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/Buttons/Button.js";
import Input from "components/Input/CustomInput.js";

import styles from "assets/jss/material-kit-pro-react/views/authPageStyle.js";
const useStyles = makeStyles(styles);

export default function ConfirmationForm(props) {
  const classes = useStyles();
  const { email, password } = props;

  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationError, setConfirmationError] = useState(false);

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  }

  const handleConfirmationSubmit = async event => {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      debugError("User confirmed email.");
      await Auth.signIn(email, password);
    } catch (e) {
      onAuthError(e, email);
      setConfirmationError(e.message);
    }
  }

  return (
    <form className={classes.form} onSubmit={handleConfirmationSubmit}>
      <h3 className={classes.title + " " + classes.textCenter}>Confirmation Code</h3>
      <div id="confirmationMessage">
        <p>
          Please check your email for the code.
        </p>
      </div>
      <Input
        labelText="Confirmation Code"
        id="confirmationCode"
        formControlProps={{
          fullWidth: true,
          value: email,
          onChange: event => setConfirmationCode(event.target.value),
          className: classes.inputProps
        }}
      />
      { confirmationError
        ? <div className={classes.error + " " + classes.textCenter}>
            <p>{confirmationError}</p>
          </div>
        : null
      }
      <div className={classes.textCenter}>
        <Button round color="primary" type="submit" disabled={!validateConfirmationForm()}>
          Verify
        </Button>
      </div>
    </form>
  );
}

ConfirmationForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};
