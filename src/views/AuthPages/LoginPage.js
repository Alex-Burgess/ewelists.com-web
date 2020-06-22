import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import qs from "qs";
// libs
import { onAuthError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FooterGrey from "components/Footer/FooterGrey.js";
import HeaderFixed from "components/Header/HeaderFixed.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Input from "components/Input/CustomInput.js";
// Custom components
import SocialButtons from "./Sections/SocialButtons.js";

import styles from "assets/jss/material-kit-pro-react/views/authPageStyle.js";
const useStyles = makeStyles(styles);

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
        setError("There is no account with the email provided.");
      } else if (e.message === 'Incorrect username or password.') {
        setError("The email or password you provided was incorrect.");
      } else {
        setError(e.message);
      }
    }
  }

  return (
    <div className={classes.page}>
      <HeaderFixed isAuthenticated={false} mobile={props.mobile}/>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={6} className={classes.gridLogin}>
            <Card className={classes.cardLogin}>
              <CardBody signup>
                <h3 className={classes.title + " " + classes.textCenter}>Log in</h3>
                <SocialButtons />
                <form onSubmit={handleSubmit}>
                  <Input
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                      value: email,
                      onChange: event => setEmail(event.target.value),
                      className: classes.inputProps
                    }}
                  />
                  <Input
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
                  { error
                    ? <div className={classes.error + " " + classes.textCenter}>
                        <p>{error}</p>
                      </div>
                    : null
                  }
                  <Button color="info" type="submit" disabled={!validateForm()} className={classes.buttonSizes}>
                    Login
                  </Button>
                  <Link to="/login/reset" className={classes.link}>Forgot your password?</Link>
                </form>
                <div className={classes.accountCheck + " " + classes.textCenter}>
                  Don't have an account? <Link to="/signup" className={classes.link}>Sign Up</Link>
                </div>
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
