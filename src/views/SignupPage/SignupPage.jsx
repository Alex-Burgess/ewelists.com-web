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
import { Auth } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import ListIcon from "@material-ui/icons/List";
import Perm from "@material-ui/icons/PermIdentity";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import FooterTransparent from "components/Footer/FooterTransparent.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1],
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.validateEmail() &&
      this.state.password.length > 5
    );
  }

  validateEmail() {
    if (/^[a-zA-Z0-9.+]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      return true
    }
    return false
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
    }
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  renderForm() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="ewelist"
          links={<HeaderLinks dropdownHoverColor="rose" />}
          {...rest}
        />
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
              <GridItem xs={12} sm={10} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={5} md={5}>
                        <div className={classes.textCenter}>
                          <Button justIcon round color="amazon" onClick={() => Auth.federatedSignIn({provider: 'LoginWithAmazon'})}>
                            <i
                              className={classes.socials + " fab fa-amazon"}
                            />
                          </Button>
                          {` `}
                          <Button justIcon round color="google" onClick={() => Auth.federatedSignIn({provider: 'Google'})}>
                            <i
                              className={classes.socials + " fab fa-google"}
                            />
                          </Button>
                          {` `}
                          <Button justIcon round color="facebook" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>
                            <i
                              className={classes.socials + " fab fa-facebook-f"}
                            />
                          </Button>
                          {` `}
                          <h4 className={classes.socialTitle}>
                            or sign up with your email address
                          </h4>
                        </div>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                          <CustomInput
                            id="name"
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses,
                              value: this.state.name,
                              onChange: this.handleChange
                            }}
                            inputProps={{
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Face
                                    className={classes.inputAdornmentIcon}
                                  />
                                </InputAdornment>
                              ),
                              placeholder: "Name..."
                            }}
                          />
                          <CustomInput
                            id="email"
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses,
                              value: this.state.email,
                              onChange: this.handleChange
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
                          <CustomInput
                            id="password"
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses,
                              value: this.state.password,
                              onChange: this.handleChange,
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
                              type: "password",
                              autoComplete: "off",
                              placeholder: "Password..."
                            }}
                          />
                          <div className={classes.terms}>
                            <span>
                              By signing up to Ewelists, you agree to the{" "}
                              <a href="/terms" target="_blank">terms of service</a>. View
                              our <a href="/privacy" target="_blank">privacy policy</a>.
                            </span>
                          </div>
                          <div className={classes.textCenter}>
                            <Button round color="info" type="submit" disabled={!this.validateForm()}>
                              Get started
                            </Button>
                          </div>
                        </form>
                      </GridItem>
                      <GridItem xs={12} sm={5} md={5}>
                        <InfoArea
                          className={classes.infoArea}
                          title="Sign Up"
                          description="Sign up using one of your social accounts, or alternatively just an email, to create your first list."
                          icon={Perm}
                          iconColor="primary"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Add Items"
                          description="Add items by copying the link to the product, or alternatively use one of our ready made lists if you're looking for inspiration."
                          icon={ListIcon}
                          iconColor="rose"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Share"
                          description="Share your first ewelist with friends and family."
                          icon={Group}
                          iconColor="info"
                        />
                      </GridItem>
                    </GridContainer>
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

  renderConfirmationForm() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="ewelist"
          links={<HeaderLinks dropdownHoverColor="rose" />}
          {...rest}
        />
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
                    <form className={classes.form} onSubmit={this.handleConfirmationSubmit}>
                    <CustomInput
                        id="confirmationCode"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                          value: this.state.confirmationCode,
                          onChange: this.handleChange
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
                      <p>
                        Please check your email for the code.
                      </p>
                      <div className={classes.textCenter}>
                        <Button round color="info" type="submit" disabled={!this.validateConfirmationForm()}>
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

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(signupPageStyle)(SignUpPage);
