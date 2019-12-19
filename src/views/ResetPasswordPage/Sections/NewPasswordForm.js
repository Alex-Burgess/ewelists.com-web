import React, { useState } from 'react';
import { Auth } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// core components
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import FooterTransparent from "custom/Footer/FooterTransparent.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import image from "assets/img/sheep-with-shoes.jpg";

import styles from "assets/jss/custom/views/resetPasswordPageStyle.js";
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

    try {
      await Auth.forgotPasswordSubmit(
        email,
        code,
        password
      );

      props.setConfirmed(true);
    } catch (e) {
      setConfirmationError(e.message);
    }
  };

  const validateResetForm = () => {
    return (
      code.length > 0 &&
      password.length > 6 &&
      password === confirmPassword
    );
  }

  return (
    <div>
      <HeaderTransparent isAuthenticated={false} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Confirmation Code</h2>
                <CardBody>
                  <form className={classes.form} onSubmit={handleConfirmClick}>
                  <div id="confirmationMessage" className={classes.details}>
                    <p className={classes.confirmMessageSpacing}>A confirmation code was sent to your email ({email}).</p>
                  </div>
                  <CustomInput
                      id="code"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                        value: code,
                        onChange: event => setCode(event.target.value)
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        placeholder: "Confirmation Code..."
                      }}
                    />
                    <div className={classes.details}>
                      <p className={classes.messageSpacing}>Enter your new password below:</p>
                    </div>
                    <CustomInput
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                        value: password,
                        onChange: event => setPassword(event.target.value),
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        type: "password",
                        autoComplete: "off",
                        placeholder: "New Password..."
                      }}
                    />
                    <CustomInput
                      id="confirmPassword"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                        value: confirmPassword,
                        onChange: event => setConfirmPassword(event.target.value),
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        type: "password",
                        autoComplete: "off",
                        placeholder: "Confirm Password..."
                      }}
                    />
                    { confirmationError
                      ? <div id="newPasswordError" className={classes.error}>
                          <p>{confirmationError}</p>
                        </div>
                      : null
                    }
                    <div className={classes.textCenter}>
                      <Button round color="info" type="submit" disabled={!validateResetForm()}>
                        Verify
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <FooterTransparent />
      </div>
    </div>
  );
}

NewPasswordForm.propTypes = {
  email: PropTypes.string.isRequired
};
