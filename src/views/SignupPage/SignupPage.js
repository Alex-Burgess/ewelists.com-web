import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
// libs
import { onAuthError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import ListIcon from "@material-ui/icons/List";
import Perm from "@material-ui/icons/PermIdentity";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// Custom components
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import FooterTransparent from "custom/Footer/FooterTransparent.js";
import ConfirmationForm from "./Sections/ConfirmationForm.js";
import {imageSize} from 'custom/Image/Image.js';

import styles from "assets/jss/custom/views/signupPageStyle.js";
const useStyles = makeStyles(styles);

const image = "/images/sheep-with-shoes";

export default function SignupPage(props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(null);
  const [error, setError] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const validateForm = () => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      validateEmail() &&
      password.length > 7
    );
  }

  const validateEmail = () => {
    if (/^[a-zA-Z0-9.+]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      return true
    }
    return false
  }

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

  const switchGoogleMail = (email) => {

    if (email.includes('@googlemail.com')) {
      const fields = email.split('@');
      email = fields[0] + "@gmail.com"
    } else if (email.includes('@gmail.com')) {
      const fields = email.split('@');
      email = fields[0] + "@googlemail.com"
    }

    return email
  }

  const handleSubmit = async event => {
    event.preventDefault();

    let passwordError = checkPassword(password);
    if (passwordError) {
      setError(passwordError);
      return false
    }


    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: name
        }
      });
      setNewUser(newUser);
    } catch (e) {
      onAuthError(e, email);

      if (e.message === 'PreSignUp failed with error User exists with different google email address..') {
        setError("An account with this email already exists (" + switchGoogleMail(email) + ").");
      } else if (e.message === 'An account with the given email already exists.') {
        setError("An account with this email already exists.");
      } else {
        setError(e.message);
      }
    }
  }

  const emailRegistrationForm = () => {
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.signUpHeader}>
          <Button justIcon simple className={classes.backButton} onClick={() => setShowEmailForm(false)}>
            <ArrowBackIos />
          </Button>
          <h4 className={classes.title}>
            Sign Up With Email
          </h4>
        </div>
        <CustomInput
          id="name"
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
            value: name,
            onChange: event => setName(event.target.value)
          }}
          inputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                <Face
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            placeholder: "Name..."
          }}
        />
        <CustomInput
          id="email"
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
            value: email,
            onChange: event => setEmail(event.target.value)
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
            placeholder: "Password..."
          }}
        />
        <div className={classes.passwordRules}>
          Use 8 or more characters with a mix of upper and lower case letters, numbers & symbols
        </div>
        { error
          ? <div id="signupError" className={classes.signUpError}>
              <p>{error}</p>
            </div>
          : null
        }
        <div className={classes.textCenter}>
          <Button color="info" type="submit" disabled={!validateForm()} className={classes.buttonSizes}>
            Sign Up
          </Button>
        </div>
        <p className={classes.description + " " + classes.loginLink}>
          Already signed up? <Link to="/login" className={classes.link}>Log in</Link>
        </p>
      </form>
    )
  }

  const renderForm = () => {
    return (
      <div>
        <HeaderTransparent isAuthenticated={false} />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + imageSize(image) + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={5} md={5}>
                        { showEmailForm
                          ? null
                          : <div className={classes.textCenter + " " + classes.buttonSpacer}>
                              <Button color="google" onClick={() => Auth.federatedSignIn({provider: 'Google'})} className={classes.buttonSizes}>
                                <i className="fab fa-google" /> Sign up with Google
                              </Button>
                              <Button color="facebook" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})} className={classes.buttonSizes}>
                                <i className="fab fa-facebook" /> Sign up with Facebook
                              </Button>
                              <p
                                className={classes.description + " " + classes.textCenter + " " + classes.emailLine}
                              >
                                Or sign up with email
                              </p>
                              <Button color="info" onClick={() => setShowEmailForm(true)} className={classes.buttonSizes}>
                                Sign up with email
                              </Button>
                              <p className={classes.description + " " + classes.loginLink}>
                                Already signed up? <Link to="/login" className={classes.link}>Log in</Link>
                              </p>
                            </div>
                        }
                        { showEmailForm
                          ? emailRegistrationForm()
                          : null
                        }
                      </GridItem>
                      <GridItem xs={12} sm={5} md={5}>
                        <InfoArea
                          className={classes.infoArea}
                          title="Sign Up"
                          description="Sign up using one of your social accounts, or alternatively just an email, to create your first list."
                          icon={Perm}
                          iconColor="primary"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Add Items"
                          description="Add items by copying the link to the product, or alternatively use one of our ready made lists if you're looking for inspiration."
                          icon={ListIcon}
                          iconColor="rose"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Share"
                          description="Share your first ewelist with friends and family."
                          icon={Group}
                          iconColor="info"
                        />
                      </GridItem>
                    </GridContainer>
                    <div className={classes.terms + " " + classes.textCenter}>
                      <span>
                        By signing up to Ewelists, you agree to the{" "}
                        <Link to="/terms" target="_blank" className={classes.link}>terms of service</Link>. View our
                        <Link to="/privacy" target="_blank" className={classes.link}> privacy policy</Link>.
                      </span>
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
      {newUser === null
        ? renderForm()
        : <ConfirmationForm email={email} password={password} />}
    </div>
  );
}
