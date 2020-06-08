import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
// libs
import { onAuthError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// Custom components
import FooterGrey from "custom/Footer/FooterGrey.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";
import ConfirmationForm from "./Sections/ConfirmationForm.js";
import SocialButtons from "./Sections/SocialButtons.js";

import styles from "assets/jss/custom/views/authPageStyle.js";
const useStyles = makeStyles(styles);

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
    if (email === password) {
      return "Password cannot be your email."
    }
    
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

  const emailForm = () => {
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <h3 className={classes.title + " " + classes.textCenter + " " + classes.emailFormTitle}>
          <Button justIcon simple className={classes.backButton} onClick={() => setShowEmailForm(false)}>
            <ArrowBackIos />
          </Button>
          Sign Up
          <div className={classes.emailFormSpacer}/>
        </h3>
        <CustomInput
          labelText="Name"
          id="name"
          formControlProps={{
            fullWidth: true,
            value: name,
            onChange: event => setName(event.target.value),
            className: classes.inputProps
          }}
        />
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
            value: email,
            onChange: event => setEmail(event.target.value),
            className: classes.inputProps
          }}
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
            value: email,
            onChange: event => setPassword(event.target.value),
            className: classes.loginInputs
          }}
          inputProps={{
            type: "password",
            autoComplete: "off"
          }}
        />
        <div className={classes.passwordRules}>
          Your password must be a least 8 characters long.
        </div>
        { error
          ? <div className={classes.error + " " + classes.textCenter}>
              <p>{error}</p>
            </div>
          : null
        }
        <Button color="info" type="submit" disabled={!validateForm()} className={classes.buttonSizes}>
          Sign Up
        </Button>
      </form>
    );
  }


  const renderLanding = () => {
    return (
      <div>
        { showEmailForm
          ? emailForm()
          : <div>
              <h3 className={classes.title + " " + classes.textCenter}>Sign Up</h3>
              <SocialButtons />
              <Button color="info" onClick={() => setShowEmailForm(true)} className={classes.buttonSizes + " " + classes.signUpButton}>
                Sign up with email
              </Button>
            </div>
        }
        <div className={classes.terms}>
          By signing up to Ewelists, you agree to our{" "}
          <Link to="/terms" target="_blank" className={classes.link}>terms of service</Link> and
          <Link to="/privacy" target="_blank" className={classes.link}> privacy policy</Link>.
        </div>
        <div className={classes.accountCheck + " " + classes.textCenter}>
          Already have an account? <Link to="/login" className={classes.link}>Log in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.page}>
      <HeaderFixed isAuthenticated={false} mobile={props.mobile}/>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={6} className={classes.gridLogin}>
            <Card className={classes.cardLogin}>
                <CardBody signup>
                {newUser === null
                   ? renderLanding()
                   : <ConfirmationForm email={email} password={password} />
                }
                </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.flexer} />
      <FooterGrey />
    </div>
  );
}
