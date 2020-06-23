import React, { useState } from 'react';
// libs
import { onError, debugError } from "libs/errorLib";
import { contactRequest } from "libs/apiLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Input from "components/Input/CustomInput.js";
import Button from "components/Buttons/Button.js";
import Footer from "components/Footer/FooterGrey.js";
import HeaderWhite from "components/Header/HeaderWhite.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ErrorText from "components/Typography/Error.js";

import styles from "assets/jss/material-kit-pro-react/views/contactPageStyle.js";
const useStyles = makeStyles(styles);

export default function ContactUsPage(props) {
  const classes = useStyles();
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendMail = async event => {
    let details = {
      name: name,
      email: email,
      message: message
    }

    debugError("API request body: " + JSON.stringify(details));

    try {
      await contactRequest(details);
      setSubmit(true);
    } catch (e) {
      onError(e);
      setError("There was an unexpected error, we're working on it!");
    }
  }

  const validateForm = () => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      message.length > 0
    );
  }


  const renderForm = () => {
    return (
      <form>
        <Input
          labelText="Your Name"
          id="name"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: event => setName(event.target.value)
          }}
        />
        <Input
          labelText="Email address"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: event => setEmail(event.target.value)
          }}
        />
        <Input
          labelText="Your message"
          id="message"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            multiline: true,
            rows: 6,
            onChange: event => setMessage(event.target.value)
          }}
        />
        <div className={classes.textCenter}>
          <Button color="primary" round onClick={() => sendMail()} disabled={!validateForm()}>
            Contact us
          </Button>
          {error
            ? <div className={classes.textCenter}>
                <ErrorText>
                  <p>{error}</p>
                </ErrorText>
              </div>
            : null
          }
        </div>
      </form>
    )
  }


  return (
    <div className={classes.page}>
      <HeaderWhite isAuthenticated={props.isAuthenticated} user={props.user} mobile={props.mobile} />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={8} className={classes.gridLogin}>
            <Card className={classes.customCard}>
              <CardBody signup>
                <h3 className={classes.title + " " + classes.textCenter}>Send us a message</h3>
                <h4>
                  You can contact us with anything related to Ewelists. We {"'"}ll get back to you ASAP.
                </h4>
                <div id="formWrapper">
                  {submit
                    ? <div className={classes.sent}>
                        Thank you for your message {name}.  We aim to respond to emails the same day.
                      </div>
                    : renderForm()
                  }
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.flexer} />
      <Footer />
    </div>
  );
}
