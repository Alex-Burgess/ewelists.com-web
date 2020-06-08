import React, { useState } from 'react';
import { Auth } from "aws-amplify";
// libs
import { onAuthError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/custom/views/authPageStyle.js";
const useStyles = makeStyles(styles);

export default function NewPasswordForm(props) {
  const classes = useStyles();
  const { email } = props;

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationError, setConfirmationError] = useState('');

  const handleConfirmClick = async event => {
    event.preventDefault();

    if (!(/(?=^[0-9]{6}$)/.test(code))) {
      setConfirmationError("Confirmation code should be a 6 digit number which was sent to you by email.");
      return false
    }

    let passwordError = checkPassword(password);
    if (passwordError) {
      setConfirmationError(passwordError);
      return false
    }

    if (password !== confirmPassword) {
      setConfirmationError("Your confirmed password does not match the new password.");
      return false
    }

    try {
      await Auth.forgotPasswordSubmit(
        email,
        code,
        password
      );

      props.setConfirmed(true);
    } catch (e) {
      onAuthError(e, email);
      setConfirmationError(e.message);
    }
  };

  const checkPassword = (password) => {
    if (!(/(?=.*[a-z])/.test(password))) {
      return "Password does not contain any lower case letters."
    }

    if (!(/(?=.*[A-Z])/.test(password))) {
      return "Password does not contain any upper case letters."
    }

    if (!(/(?=.*\d)/.test(password))) {
      return "Password does not contain any numbers."
    }

    if (!(/(?=.*[-+_!@#$%^&*.,?])/.test(password))) {
      return "Password does not contain any symbols."
    }

    return null
  }

  const validateResetForm = () => {
    return (
      code.length > 0 &&
      password.length > 6 &&
      confirmPassword.length > 6
      // password.length > 6 &&
      // password === confirmPassword
    );
  }

  return (
    <form onSubmit={handleConfirmClick}>
      <h3 className={classes.title + " " + classes.textCenter}>Confirmation Code</h3>
      <div>
        A confirmation code was sent to your email ({email}).
      </div>
      <CustomInput
        labelText="Confirmation Code"
        id="code"
        formControlProps={{
          fullWidth: true,
          value: code,
          onChange: event => setCode(event.target.value),
          className: classes.inputProps
        }}
      />
      <div className={classes.newPassword}>
        Enter your new password below:
      </div>
      <CustomInput
        labelText="Password"
        id="password"
        formControlProps={{
          fullWidth: true,
          value: password,
          onChange: event => setPassword(event.target.value),
          className: classes.loginInputs
        }}
        inputProps={{
          type: "password",
          autoComplete: "off"
        }}
      />
      <CustomInput
        labelText="Confirm Password"
        id="confirmPassword"
        formControlProps={{
          fullWidth: true,
          value: confirmPassword,
          onChange: event => setConfirmPassword(event.target.value),
          className: classes.loginInputs
        }}
        inputProps={{
          type: "password",
          autoComplete: "off"
        }}
      />
      <div className={classes.passwordRules}>
        Use 8 or more characters with a mix of upper and lower case letters, numbers & symbols
      </div>
      { confirmationError
        ? <div id="newPasswordError" className={classes.error}>
            <p>{confirmationError}</p>
          </div>
        : null
      }
      <Button color="info" type="submit" disabled={!validateResetForm()} className={classes.buttonSizes}>
        Verify
      </Button>
    </form>
  );
}

NewPasswordForm.propTypes = {
  email: PropTypes.string.isRequired
};
