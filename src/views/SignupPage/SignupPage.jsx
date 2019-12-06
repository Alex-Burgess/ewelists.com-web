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
import Favorite from "@material-ui/icons/Favorite";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import ListIcon from "@material-ui/icons/List";
import Perm from "@material-ui/icons/PermIdentity";
import Close from "@material-ui/icons/Close";
// core components
import Footer from "components/Footer/Footer.jsx";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

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
      newUser: null,
      error: "",
      showError: false,
      confirmationError: "",
      showConfirmationError: false,
      popoutModal: false,
      socialType: ''
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.validateEmail() &&
      this.state.password.length > 7 &&
      this.validatePassword()
    );
  }

  validatePassword() {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/.test(this.state.password)) {
      return true
    }
    return false
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
        password: this.state.password,
        attributes: {
          name: this.state.name
        }
      });
      this.setState({
        newUser
      });
    } catch (e) {
      this.setState({
        showError: true,
        error: e.message
      });
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
      this.setState({
        showConfirmationError: true,
        confirmationError: e.message
      });
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

  openNotification(type) {
    this.setState({
      socialType: type,
      popoutModal: true
    });
  }

  handleClose(modal) {
    this.setState({
      popoutModal: false
    });
  }

  renderNotifyPopOut(classes){
    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal + " " + classes.modalSmall
        }}
        open={this.state.popoutModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.handleClose("popoutModal")}
        aria-labelledby="small-modal-slide-title"
        aria-describedby="small-modal-slide-description"
      >
        <DialogTitle
          id="small-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => this.handleClose("popoutModal")}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
        </DialogTitle>
        <DialogContent
          id="small-modal-slide-description"
          className={
            classes.modalBody + " " + classes.modalSmallBody + " " + classes.centerText
          }
        >
          <h5>If this is your first time signing in with your <b>{this.state.socialType}</b> account, you might find you are redirected to
            our login page.  If this happens, just click on the <b>{this.state.socialType}</b> icon and you'll be logged in as normal from then on.</h5>
        </DialogContent>
        <DialogActions
          className={
            classes.modalFooter + " " + classes.modalFooterCenter
          }
        >
          <Button
            onClick={() => Auth.federatedSignIn({provider: this.state.socialType})}
            color="default"
            block
            round
            className={
              classes.modalSmallFooterFirstButton +
              " " +
              classes.modalSmallFooterSecondButton
            }
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
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
                          <Button justIcon round color="amazon" onClick={() => this.openNotification('LoginWithAmazon')}>
                            <i
                              className={classes.socials + " fab fa-amazon"}
                            />
                          </Button>
                          {` `}
                          <Button justIcon round color="google" onClick={() => this.openNotification('Google')}>
                            <i
                              className={classes.socials + " fab fa-google"}
                            />
                          </Button>
                          {` `}
                          <Button justIcon round color="facebook" onClick={() => this.openNotification('Facebook')}>
                            <i
                              className={classes.socials + " fab fa-facebook-f"}
                            />
                          </Button>
                          {` `}
                          <div className={classes.orEmail}>
                            or sign up with your email address
                          </div>
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
                          <div className={classes.passwordRules}>
                            Use 8 or more characters with a mix of upper and lower case letters, numbers & symbols
                          </div>
                          { this.state.showError
                            ? <div className={classes.signUpError}>
                                <p>{this.state.error}</p>
                              </div>
                            : null
                          }
                          <div className={classes.textCenter}>
                            <Button round color="info" type="submit" disabled={!this.validateForm()}>
                              Sign Up
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
                    <div className={classes.terms + " " + classes.textCenter}>
                      <span>
                        By signing up to Ewelists, you agree to the{" "}
                        <a href="/terms" target="_blank" className={classes.link}>terms of service</a>. View
                        our <a href="/privacy" target="_blank" className={classes.link}>privacy policy</a>.
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer
            className={classes.footer}
            content={
              <div>
                <div className={classes.left}>
                  <List className={classes.list}>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/"
                        className={classes.block}
                      >
                        &copy; {1900 + new Date().getYear()} ewelists
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/contact"
                        className={classes.block}
                      >
                        Contact Us
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/#about"
                        className={classes.block}
                      >
                        About us
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/privacy"
                        className={classes.block}
                      >
                        Privacy
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/terms"
                        className={classes.block}
                      >
                        Terms
                      </a>
                    </ListItem>
                  </List>
                </div>
                <div className={classes.rightLinks}>
                  <ul>
                    <li>
                      <Button
                        href="https://www.facebook.com/ewelists"
                        target="_blank"
                        justIcon
                        simple
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        href="https://twitter.com/ewelists"
                        target="_blank"
                        justIcon
                        simple
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        href="https://www.instagram.com/ewelists/"
                        target="_blank"
                        justIcon
                        simple
                      >
                        <i className="fab fa-instagram" />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            }
          />
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
                      { this.state.showConfirmationError
                        ? <div className={classes.signUpError}>
                            <p>{this.state.confirmationError}</p>
                          </div>
                        : null
                      }
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
          <Footer
            className={classes.footer}
            content={
              <div>
                <div className={classes.left}>
                  <List className={classes.list}>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/"
                        className={classes.block}
                      >
                        &copy; {1900 + new Date().getYear()} ewelists
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/contact"
                        className={classes.block}
                      >
                        Contact Us
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/#about"
                        className={classes.block}
                      >
                        About us
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/privacy"
                        className={classes.block}
                      >
                        Privacy
                      </a>
                    </ListItem>
                    <ListItem className={classes.inlineBlock}>
                      <a
                        href="/terms"
                        className={classes.block}
                      >
                        Terms
                      </a>
                    </ListItem>
                  </List>
                </div>
                <div className={classes.rightLinks}>
                  <ul>
                    <li>
                      <Button
                        href="https://www.facebook.com/ewelists"
                        target="_blank"
                        justIcon
                        simple
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        href="https://twitter.com/ewelists"
                        target="_blank"
                        justIcon
                        simple
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        href="https://www.instagram.com/ewelists/"
                        target="_blank"
                        justIcon
                        simple
                      >
                        <i className="fab fa-instagram" />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        {this.renderNotifyPopOut(classes)}
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
