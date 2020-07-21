import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
// libs
import { onAuthError } from "libs/errorLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// components
import FooterGrey from "components/Footer/FooterGrey.js";
import HeaderWhite from "components/Header/HeaderWhite.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Input from "components/Input/CustomInput.js";
import ErrorText from "components/Typography/Error.js";
// sections
import NewPasswordForm from "./Sections/NewPasswordForm.js";

import styles from "assets/jss/material-kit-pro-react/views/authPageStyle.js";
const useStyles = makeStyles(styles);

export default function ResetPasswordPage(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [requestError, setRequestError] = useState('');

  const validateCodeForm = () => {
    return email.length > 0;
  }

  const handleSendCodeClick = async event => {
    event.preventDefault();

    try {
      await Auth.forgotPassword(email);
      setCodeSent(true);
    } catch (e) {
      onAuthError(e, email);

      if (e.message === "Username/client id combination not found.") {
        setRequestError("Incorrect username.");
      } else {
        setRequestError(e.message);
      }
    }
  };

  const renderRequestCodeForm = () => {
    return (
      <form className={classes.form} onSubmit={handleSendCodeClick}>
        <h3 className={classes.title + " " + classes.textCenter}>Reset Password</h3>
        <div>
          <p>Enter your email address below and we'll send you a link with a code.</p>
        </div>
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
        { requestError
          ? <div className={classes.textCenter}>
              <ErrorText>
                <p>{requestError}</p>
              </ErrorText>
            </div>
          : null
        }
        <div className={classes.textCenter}>
          <Button fullWidth color="primary" type="submit" disabled={!validateCodeForm()} className={classes.buttonSizes} data-cy="submit-reset">
            Reset
          </Button>
        </div>
      </form>
    );
  }

  const renderSuccess = () => {
    return (
      <div id="successMessage">
        <h3 className={classes.title + " " + classes.textCenter}>Password Reset Complete</h3>
        <div className={classes.textCenter}>
          <Link to="/login" className={classes.link}>
            Login with your new credentials
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.page}>
      <HeaderWhite isAuthenticated={false} mobile={props.mobile}/>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={6} className={classes.gridLogin}>
            <Card className={classes.cardLogin} data-cy="card">
              <CardBody>
                {! codeSent
                  ? renderRequestCodeForm()
                  : !confirmed
                    ? <NewPasswordForm email={email} setConfirmed={setConfirmed} />
                    : renderSuccess()
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
