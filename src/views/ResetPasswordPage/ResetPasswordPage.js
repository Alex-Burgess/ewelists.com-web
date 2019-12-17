import React, { useState } from 'react';
import { Auth } from "aws-amplify";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import FooterTransparent from "custom/Footer/FooterTransparent.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import image from "assets/img/sheep-with-shoes.jpg";

import styles from "assets/jss/custom/views/resetPasswordPageStyle.js";
const useStyles = makeStyles(styles);

export default function ResetPasswordPage(props) {
  const classes = useStyles();

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };

  const handleCodeInput = e => {
    setCode(e.target.value);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordInput = e => {
    setConfirmPassword(e.target.value);
  };

  const validateCodeForm = () => {
    return email.length > 0;
  }

  const validateResetForm = () => {
    return (
      code.length > 0 &&
      password.length > 6 &&
      password === confirmPassword
    );
  }

  const handleSendCodeClick = async event => {
    event.preventDefault();

    try {
      await Auth.forgotPassword(email);
      setCodeSent(true);
    } catch (e) {
      setRequestError(e.message);
    }
  };

  const handleConfirmClick = async event => {
    event.preventDefault();

    try {
      await Auth.forgotPasswordSubmit(
        email,
        code,
        password
      );

      setConfirmed(true);
    } catch (e) {
      setConfirmationError(e.message);
    }
  };

  const renderRequestCodeForm = () => {
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
                  <h2 className={classes.cardTitle}>Reset Password</h2>
                  <CardBody>
                    <div className={classes.details}>
                      <p>Enter your email address below and we'll send you a link with a code.</p>
                    </div>
                    <form className={classes.form} onSubmit={handleSendCodeClick}>
                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                          value: email,
                          onChange: handleEmailInput
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          ),
                          placeholder: "Email..."
                        }}
                      />
                      { requestError
                        ? <div className={classes.error}>
                            <p>{requestError}</p>
                          </div>
                        : null
                      }
                      <div className={classes.textCenter}>
                        <Button round color="info" type="submit" disabled={!validateCodeForm()}>
                          Submit
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

  const renderConfirmationForm = () => {
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
                    <CustomInput
                        id="code"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                          value: code,
                          onChange: handleCodeInput
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
                      <p>
                        Please check your email ({email}) for the code.
                      </p>
                      <CustomInput
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                          value: password,
                          onChange: handlePasswordInput,
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
                          onChange: handleConfirmPasswordInput,
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
                        ? <div className={classes.error}>
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

  const renderSuccessMessage = () => {
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
                  <h2 className={classes.cardTitle}>Password Reset Complete</h2>
                  <CardBody className={classes.textCenter}>
                    <div className={classes.details}>
                      <p>Your password has been reset.</p>
                      <p>
                        <a href="/login" className={classes.link}>Login with your new credentials</a>
                      </p>
                    </div>

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

  return (
    <div>
      {! codeSent
        ? renderRequestCodeForm()
        : !confirmed
          ? renderConfirmationForm()
          : renderSuccessMessage()}
    </div>
  );
}
