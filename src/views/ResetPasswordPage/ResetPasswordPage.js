import React, { useState } from 'react';
import { Auth } from "aws-amplify";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
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
import SuccessMessage from "./Sections/SuccessMessage.js";
import NewPasswordForm from "./Sections/NewPasswordForm.js";

import image from "assets/img/sheep-with-shoes.jpg";

import styles from "assets/jss/custom/views/resetPasswordPageStyle.js";
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
      if (e.message === "Username/client id combination not found.") {
        setRequestError("Incorrect username.");
      } else {
        setRequestError(e.message);
      }
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
                      { requestError
                        ? <div id="submitError" className={classes.error}>
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

  return (
    <div>
      {! codeSent
        ? renderRequestCodeForm()
        : !confirmed
          ? <NewPasswordForm email={email} setConfirmed={setConfirmed} />
          : <SuccessMessage />}
    </div>
  );
}
