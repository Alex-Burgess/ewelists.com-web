import React, { useState } from 'react';
// import { API } from "aws-amplify";
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
import SentMessage from "./Sections/SentMessage.js";
import config from 'config.js';
import { contactApiPost } from "./contactApi";

import styles from "assets/jss/custom/views/contactUsCustomStyle.js";
const useStyles = makeStyles(styles);

const backgroundImage = config.imagePrefix + "/images/sheep-with-shoes.jpg";

export default function ContactUsPage(props) {
  const classes = useStyles();
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMail = async event => {
    let details = {
      name: name,
      email: email,
      message: message
    }

    console.log("API request body: " + JSON.stringify(details));

    const response = await contactApiPost(details);

    console.log("response: " + JSON.stringify(response))
    setSubmit(true);
  }

  // const contactApiPost = async details => {
  //   return API.post("contact", "/", {
  //     body: details
  //   });
  // }

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
            onChange: event => setName(event.target.value)
          }}
        />
        <CustomInput
          labelText="Email address"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: event => setEmail(event.target.value)
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
            onChange: event => setMessage(event.target.value)
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

  return (
    <div>
      <HeaderFixed isAuthenticated={props.isAuthenticated} user={props.user} />
      <Parallax image={backgroundImage} className={classes.parallax}>
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
                <div id="formWrapper">
                  {submit
                    ? <SentMessage name={name} />
                    : renderForm()
                  }
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <div className={classes.spacer}>
      </div>
      <FooterGrey />
    </div>
  );
}
