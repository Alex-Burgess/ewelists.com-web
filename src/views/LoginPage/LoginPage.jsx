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
import Footer from "components/Footer/Footer.jsx";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      showError: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  checkGoogleEmail(email) {
    if (email.includes('@googlemail.com')) {
      var fields = email.split('@');
      email = fields[0] + "@gmail.com"
    }
    return email
  }

  handleSubmit = async event => {
    event.preventDefault();

    let email = this.checkGoogleEmail(this.state.email)

    try {
      await Auth.signIn(email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      this.setState({
        showError: true,
        error: e.message
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="ewelist"
          links={<HeaderLinks dropdownHoverColor="info" />}
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
              <GridItem xs={12} sm={10} md={6}>
                <Card className={classes.cardLogin}>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <CardHeader
                      color="info"
                      signup
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle}>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={() => Auth.federatedSignIn({provider: 'LoginWithAmazon'})}
                        >
                          <i className="fab fa-amazon" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={() => Auth.federatedSignIn({provider: 'Google'})}
                        >
                          <i className="fab fa-google" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
                        >
                          <i className="fab fa-facebook" />
                        </Button>
                      </div>
                    </CardHeader>
                    <p
                      className={classes.description + " " + classes.textCenter}
                    >
                      Or log in with email
                    </p>
                    <CardBody signup>
                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                          value: this.state.email,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: "Email...",
                          type: "email",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                          value: this.state.email,
                          onChange: this.handleChange
                        }}
                        inputProps={{
                          placeholder: "Password",
                          type: "password",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                lock_utline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                      <div className={classes.details}>
                        <a href="/login/reset" className={classes.link}>Forgot your password?</a>
                      </div>
                      { this.state.showError
                        ? <div className={classes.loginError}>
                            <p>{this.state.error}</p>
                          </div>
                        : null
                      }
                    </CardBody>
                    <div className={classes.textCenter}>
                      <Button round color="info" type="submit" disabled={!this.validateForm()}>
                        Login
                      </Button>
                    </div>
                  </form>
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
}

LoginPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(LoginPage);
