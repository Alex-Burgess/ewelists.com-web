import React, { useState } from 'react';
import { Auth } from "aws-amplify";
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
import config from 'config.js';

import styles from "assets/jss/custom/views/loginPageStyle.js";
const useStyles = makeStyles(styles);

const backgroundImage = config.imagePrefix + "/images/sheep-with-shoes.jpg";

export default function LoginPage(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
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

    let checkedEmail = checkGoogleEmail(email)

    try {
      await Auth.signIn(checkedEmail, password);
      props.userHasAuthenticated(true);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <HeaderTransparent isAuthenticated={false} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + backgroundImage + ")",
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
                    <h4 className={classes.cardTitle}>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={() => Auth.federatedSignIn({provider: 'LoginWithAmazon'})}
                      >
                        <i className="fab fa-amazon" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={() => Auth.federatedSignIn({provider: 'Google'})}
                      >
                        <i className="fab fa-google" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                    </div>
                  </CardHeader>
                  <p
                    className={classes.description + " " + classes.textCenter}
                  >
                    Or log in with email
                  </p>
                  <CardBody signup>
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
                    <div className={classes.details}>
                      <a href="/login/reset" className={classes.link}>Forgot your password?</a>
                    </div>
                    { error
                      ? <div id="loginError" className={classes.loginError}>
                          <p>{error}</p>
                        </div>
                      : null
                    }
                    <div className={classes.textCenter}>
                      <Button round color="info" type="submit" disabled={!validateForm()}>
                        Login
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
