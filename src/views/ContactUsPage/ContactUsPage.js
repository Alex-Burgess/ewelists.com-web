import React, { useState } from 'react';
import { API } from "aws-amplify";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import FooterGrey from "custom/Footer/FooterGrey.js";
import Parallax from "components/Parallax/Parallax.js";

import HeaderFixed from "custom/Header/HeaderFixed.js";

import styles from "assets/jss/custom/views/contactUsCustomStyle.js";
const useStyles = makeStyles(styles);

export default function ContactUsPage(props) {
  const classes = useStyles();
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameInput = e => {
    setName(e.target.value);
  };

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };

  const handleMessageInput = e => {
    setMessage(e.target.value);
  };

  const sendMail = async event => {
    let details = {
      name: name,
      email: email,
      message: message
    }

    console.log("API request body: " + JSON.stringify(details));

    const response = await API.post("contact", "/", {
      body: details
    });

    console.log("response: " + JSON.stringify(response))
    setSubmit(true);
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
        <CustomInput
          labelText="Your Name"
          id="name"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: handleNameInput
          }}
        />
        <CustomInput
          labelText="Email address"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: handleEmailInput
          }}
        />
        <CustomInput
          labelText="Your message"
          id="message"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            multiline: true,
            rows: 6,
            onChange: handleMessageInput
          }}
        />
        <div className={classes.textCenter}>
          <Button color="primary" round onClick={() => sendMail()} disabled={!validateForm()}>
            Contact us
          </Button>
        </div>
      </form>
    )
  }

  const renderSent = () => {
    return (
      <div className={classes.sent}>
        <p>
          Thank you for your message {name}.  We will get back to you by email.
        </p>
      </div>
    )
  }

  return (
    <div>
      <HeaderFixed isAuthenticated={props.isAuthenticated} />
      <Parallax image={require("assets/img/sheep-with-shoes.jpg")} className={classes.parallax}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.contactContent}>
          <div className={classes.container}>
            <h2 className={classes.title}>Send us a message</h2>
            <GridContainer>
              <GridItem md={12} sm={12}>
                <p className={classes.subHeading}>
                  You can contact us with anything related to Ewelists. We
                  {"'"}ll get in touch with you as soon as possible.
                  <br />
                  <br />
                </p>
                {submit
                  ? renderSent(classes)
                  : renderForm(classes)
                }
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <FooterGrey />
    </div>
  );
}
