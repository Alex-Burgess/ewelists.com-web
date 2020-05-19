import React, { useState, useEffect } from 'react';
import { Auth } from "aws-amplify";
import qs from "qs";
// libs
import { onAuthError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import FooterTransparent from "custom/Footer/FooterTransparent.js";
import HeaderTransparent from "custom/Header/HeaderTransparent.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import {imageSize} from 'custom/Image/Image.js';


import styles from "assets/jss/custom/views/loginPageStyle.js";
const useStyles = makeStyles(styles);

const image = "/images/sheep-with-shoes";

export default function LoginPage(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect( () => {
    function checkUrlParams() {
      const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

      if (params['error']) {
        switch (params['error']) {
          case "GoogleDomainError":
            setError('An account has already been registed with this email address.  Log in with your username and password.');
            break;
          default:
            setError('Oops, there was error whilst logging in. If this issue persists please contact us.');
            break;
        }
      }
    };

    checkUrlParams();
  }, [props.location.search]);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
    } catch (e) {
      onAuthError(e, email);

      if (e.message === 'User does not exist.') {
        setError("We couldn't find an account with the username you entered.");
      } else if (e.message === 'Incorrect username or password.') {
        setError("The username or password you entered was incorrect.");
      } else {
        setError(e.message);
      }
    }
  }

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
            <GridItem xs={12} sm={10} md={6}>
              <Card className={classes.cardLogin}>
                  <CardHeader
                    color="info"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Log in to Ewelists</h4>
                  </CardHeader>
                  <CardBody signup>
                    <Button color="google" onClick={() => Auth.federatedSignIn({provider: 'Google'})} className={classes.buttonSizes}>
                      <i className="fab fa-google" /> Log in with Google
                    </Button>
                    <Button color="facebook" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})} className={classes.buttonSizes}>
                      <i className="fab fa-facebook" /> Log in with Facebook
                    </Button>
                    <p
                      className={classes.description + " " + classes.textCenter + " " + classes.emailLine}
                    >
                      Or log in with email
                    </p>
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                        value: email,
                        onChange: event => setEmail(event.target.value)
                      }}
                      inputProps={{
                        placeholder: "Email...",
                        type: "email",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                        value: email,
                        onChange: event => setPassword(event.target.value)
                      }}
                      inputProps={{
                        placeholder: "Password",
                        type: "password",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    { error
                      ? <div id="loginError" className={classes.loginError}>
                          <p>{error}</p>
                        </div>
                      : null
                    }
                    <Button color="info" type="submit" disabled={!validateForm()} className={classes.buttonSizes}>
                      Login
                    </Button>
                    <div className={classes.details}>
                      <a href="/login/reset" className={classes.link}>Forgot your password?</a>
                      <p className={classes.description}>
                        New To Ewelists? <a href="/signup" className={classes.link}>Sign Up</a>
                      </p>
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
