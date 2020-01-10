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

import styles from "assets/jss/custom/views/signupPageStyle.js";
const useStyles = makeStyles(styles);

export default function ConfirmationForm(props) {
  const classes = useStyles();
  const { email, password } = props;

  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationError, setConfirmationError] = useState(false);

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  }

  const handleConfirmationSubmit = async event => {
    event.preventDefault();

    let checkedEmail = checkGoogleEmail(email);

    try {
      await Auth.confirmSignUp(checkedEmail, confirmationCode);
      await Auth.signIn(checkedEmail, password);

      props.userHasAuthenticated(true);
    } catch (e) {
      setConfirmationError(e.message);
    }
  }

  const checkGoogleEmail = (email) => {
    if (email.includes('@googlemail.com')) {
      var fields = email.split('@');
      email = fields[0] + "@gmail.com"
    }
    return email
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
                  <form className={classes.form} onSubmit={handleConfirmationSubmit}>
                  <div id="confirmationMessage" className={classes.details}>
                    <p>
                      Please check your email for the code.
                    </p>
                  </div>
                  <CustomInput
                      id="confirmationCode"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                        value: confirmationCode,
                        onChange: event => setConfirmationCode(event.target.value)
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
                    { confirmationError
                      ? <div id="confirmationError" className={classes.signUpError}>
                          <p>{confirmationError}</p>
                        </div>
                      : null
                    }
                    <div className={classes.textCenter}>
                      <Button round color="info" type="submit" disabled={!validateConfirmationForm()}>
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

ConfirmationForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};