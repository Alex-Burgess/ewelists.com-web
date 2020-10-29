import React, { useState } from 'react';
// import useClippy from 'use-clippy';
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

  const pasteLink = () => {
    navigator.clipboard.readText()
    .then(text => {
      console.log('Pasted content: ', text);
      setEmail(text)
    })
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  }

  // const pasteName = async () => {
  //   console.log('Name input is focused.');
  //
  //   // navigator.clipboard.readText()
  //   // .then(text => {
  //   //   console.log('Pasted name content: ', text);
  //   //   setName(text)
  //   // })
  //   // .catch(err => {
  //   //   console.error('Failed to read clipboard contents: ', err);
  //   // });
  //
  //   let items = await navigator.clipboard.readText();
  //
  //   console.log("item: " + JSON.stringify(items));
  //   console.log("items length: " + items.length);
  //   // for (let item of items) {
  //       // if (!item.types.includes("text/html"))
  //       //     continue;
  //
  //       // let reader = new FileReader;
  //       // reader.addEventListener("load", loadEvent => {
  //       //     document.getElementById("html-output").innerHTML = reader.result;
  //       // });
  //       // reader.readAsText(await item.getType("text/html"));
  //       // break;
  //   // }
  // }

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
          labelText="Paste url"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: event => setEmail(event.target.value),
            value: email
          }}
        />
        <div className={classes.textCenter}>
          <Button color="primary" onClick={() => pasteLink()}>
            Paste
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
      <HeaderWhite  />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={8} className={classes.gridLogin}>
            <Card className={classes.customCard} data-cy="contact-card">
              <CardBody signup>
                <h3 className={classes.title + " " + classes.textCenter}>Paste Test Page</h3>
                <h4>
                  Paste from your clipboard here.
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
