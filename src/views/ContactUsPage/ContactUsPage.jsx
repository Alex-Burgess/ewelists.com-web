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
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FooterDark from "components/Footer/FooterDark.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import contactUsStyle from "assets/jss/material-kit-pro-react/views/contactUsStyle.jsx";

class ContactUsPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="dark" />}
          fixed
          color="info"
        />
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
                    You can contact us with anything related to our Ewelists. We
                    {"'"}ll get in touch with you as soon as possible.
                    <br />
                    <br />
                  </p>
                  <form>
                    <CustomInput
                      labelText="Your Name"
                      id="float"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <CustomInput
                      labelText="Email address"
                      id="float"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <CustomInput
                      labelText="Phone"
                      id="float"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <CustomInput
                      labelText="Your message"
                      id="float"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 6
                      }}
                    />
                    <div className={classes.textCenter}>
                      <Button color="primary" round>
                        Contact us
                      </Button>
                    </div>
                  </form>
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
