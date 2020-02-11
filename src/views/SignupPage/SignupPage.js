import React, { useState } from 'react';
import { Auth } from "aws-amplify";
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
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// Custom components
import AmazonButton from "custom/Buttons/AmazonButton.js";
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import FooterTransparent from "custom/Footer/FooterTransparent.js";
import ConfirmationForm from "./Sections/ConfirmationForm.js";
import NotifyPopOut from "./Sections/NotifyPopOut.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/signupPageStyle.js";
const useStyles = makeStyles(styles);

const image = config.imagePrefix + "/images/sheep-with-shoes.jpg";

export default function SignupPage(props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(null);
  const [error, setError] = useState('');
  const [popoutModal, setPopoutModal] = useState(false);
  const [socialType, setSocialType] = useState('');

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

  const checkGoogleEmail = (email) => {
    if (email.includes('@googlemail.com')) {
      var fields = email.split('@');
      email = fields[0] + "@gmail.com"
    }
    return email
  }

  const handleSubmit = async event => {
    event.preventDefault();

    let checkedEmail = checkGoogleEmail(email);

    let passwordError = checkPassword(password);
    if (passwordError) {
      setError(passwordError);
      return false
    }


    try {
      const newUser = await Auth.signUp({
        username: checkedEmail,
        password: password,
        attributes: {
          name: name
        }
      });
      setNewUser(newUser);
    } catch (e) {
      setError(e.message);
    }
  }

  const openNotification = (type) => {
    setSocialType(type);
    setPopoutModal(true);
  }

  const renderForm = () => {
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
              <GridItem xs={12} sm={10} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={5} md={5}>
                        <div className={classes.textCenter}>
                          <AmazonButton justIcon round color="amazon" onClick={() => openNotification('LoginWithAmazon')}>
                            <i
                              className={classes.socials + " fab fa-amazon"}
                            />
                          </AmazonButton>
                          {` `}
                          <Button justIcon round color="google" onClick={() => openNotification('Google')}>
                            <i
                              className={classes.socials + " fab fa-google"}
                            />
                          </Button>
                          {` `}
                          <Button justIcon round color="facebook" onClick={() => openNotification('Facebook')}>
                            <i
                              className={classes.socials + " fab fa-facebook-f"}
                            />
                          </Button>
                          {` `}
                          <div className={classes.orEmail}>
                            or sign up with your email address
                          </div>
                        </div>
                        <form className={classes.form} onSubmit={handleSubmit}>
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
                            <Button round color="info" type="submit" disabled={!validateForm()}>
                              Sign Up
                            </Button>
                          </div>
                        </form>
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
                        <a href="/terms" target="_blank" className={classes.link}>terms of service</a>. View
                        our <a href="/privacy" target="_blank" className={classes.link}>privacy policy</a>.
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
      {<NotifyPopOut open={popoutModal} socialType={socialType} setPopoutModal={setPopoutModal} />}
      {newUser === null
        ? renderForm()
        : <ConfirmationForm email={email} password={password} checkGoogleEmail={checkGoogleEmail} />}
    </div>
  );
}
