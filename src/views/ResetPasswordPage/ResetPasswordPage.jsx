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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
// core components
import HeaderTransparent from "custom/Header/HeaderTransparent.jsx";
import FooterTransparent from "custom/Footer/FooterTransparent.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import resetPasswordPageStyle from "assets/jss/custom/views/resetPasswordPageStyle.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false,
      requestError: "",
      showRequestError: false,
      confirmationError: "",
      showConfirmationError: false
    };
  }

  validateCodeForm() {
    return this.state.email.length > 0;
  }

  validateResetForm() {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 6 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSendCodeClick = async event => {
    event.preventDefault();

    this.setState({ isSendingCode: true });

    try {
      await Auth.forgotPassword(this.state.email);
      this.setState({ codeSent: true });
    } catch (e) {
      this.setState({
        isSendingCode: false,
        requestError: e.message,
        showRequestError: true
      });
    }
  };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      );
      this.setState({ confirmed: true });
    } catch (e) {
      this.setState({
        isConfirming: false,
        confirmationError: e.message,
        showConfirmationError: true
     });
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  renderRequestCodeForm() {
    const { classes, ...rest } = this.props;
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
                    <form className={classes.form} onSubmit={this.handleSendCodeClick}>
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
                      { this.state.showRequestError
                        ? <div className={classes.error}>
                            <p>{this.state.requestError}</p>
                          </div>
                        : null
                      }
                      <div className={classes.textCenter}>
                        <Button round color="info" type="submit" disabled={!this.validateCodeForm()}>
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
                    <form className={classes.form} onSubmit={this.handleConfirmClick}>
                    <CustomInput
                        id="code"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                          value: this.state.code,
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
                        Please check your email ({this.state.email}) for the code.
                      </p>
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
                          placeholder: "New Password..."
                        }}
                      />
                      <CustomInput
                        id="confirmPassword"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses,
                          value: this.state.confirmPassword,
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
                          placeholder: "Confirm Password..."
                        }}
                      />
                      { this.state.showConfirmationError
                        ? <div className={classes.error}>
                            <p>{this.state.confirmationError}</p>
                          </div>
                        : null
                      }
                      <div className={classes.textCenter}>
                        <Button round color="info" type="submit" disabled={!this.validateResetForm()}>
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

  renderSuccessMessage() {
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
                  <h2 className={classes.cardTitle}>Password Reset Complete</h2>
                  <CardBody className={classes.textCenter}>
                    <div className={classes.details}>
                      <p>Your password has been reset.</p>
                      <p>
                        <a href="/login" className={classes.link}>Login with your new credentials</a>
                      </p>
                    </div>

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
        {! this.state.codeSent
          ? this.renderRequestCodeForm()
          : !this.state.confirmed
            ? this.renderConfirmationForm()
            : this.renderSuccessMessage()}
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(resetPasswordPageStyle)(ResetPasswordPage);
