/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import PinDrop from "@material-ui/icons/PinDrop";
import Phone from "@material-ui/icons/Phone";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FooterDark from "components/Footer/FooterDark.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import contactUsStyle from "assets/jss/material-kit-pro-react/views/contactUsStyle.jsx";

class ContactUsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      message: '',
      submit: false
    };
  }

  sendMail = async event => {
    let details = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    const response = await API.post("contact", "/", {
      body: details
    });

    console.log("response: " + JSON.stringify(response))
    this.setState({
      submit: true
    });
  }

  changeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.message.length > 0
    );
  }


  renderForm(classes){
    return (
      <form>
        <CustomInput
          labelText="Your Name"
          id="name"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: this.changeHandler
          }}
        />
        <CustomInput
          labelText="Email address"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: this.changeHandler
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
            onChange: this.changeHandler
          }}
        />
        <div className={classes.textCenter}>
          <Button color="primary" round onClick={() => this.sendMail()} disabled={!this.validateForm()}>
            Contact us
          </Button>
        </div>
      </form>
    )
  }

  renderSent(classes){
    return (
      <div className={classes.sent}>
        <p>
          Thank you for your message {this.state.name}.  We will get back to you by email.
        </p>
      </div>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.isAuthenticated
          ? <Header
              brand="ewelists"
              links={<HeaderLinksAuth dropdownHoverColor="info" />}
              fixed
              color="info"
            />
          : <Header
              brand="ewelists"
              links={<HeaderLinks dropdownHoverColor="info" />}
              fixed
              color="info"
            />
        }
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
                  {this.state.submit
                    ? this.renderSent(classes)
                    : this.renderForm(classes)
                  }
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <FooterDark />
      </div>
    );
  }
}

ContactUsPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(contactUsStyle)(ContactUsPage);
