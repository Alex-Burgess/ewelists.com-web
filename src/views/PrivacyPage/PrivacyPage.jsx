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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import FooterDark from "components/Footer/FooterDark.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";

import privacyPageStyle from "assets/jss/material-kit-pro-react/views/privacyPageStyle.jsx";

class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        {this.props.isAuthenticated
          ? <Header
            color="info"
            brand="ewelists"
            links={<HeaderLinksAuth dropdownHoverColor="info" />}
            fixed
            {...rest}
          />
          : <Header
            color="info"
            brand="ewelists"
            links={<HeaderLinks dropdownHoverColor="info" />}
            fixed
            {...rest}
          />
        }
        <div className={classes.main}>
          <div className={classes.privacyContent}>
            <div className={classes.container}>
              <h1 className={classes.title}>Privacy Policy</h1>

              <div className={classes.textContent}>
                <h3 className={classes.title}>
                  Information gathering and usage
                </h3>
                <p>
                  This is the paragraph where you can write more details about your
                  product. Keep you user engaged by providing meaningful information.
                  Remember that by this time, the user is curious, otherwise he wouldn
                  {"'"}t scroll to get here. Add a button if you want the user to see
                  more. We are here to make life better.
                  <br />
                  <br />
                  And now I look and look around and there’s so many Kanyes I{"'"}ve
                  been trying to figure out the bed design for the master bedroom at
                  our Hidden Hills compound... and thank you for turning my personal
                  jean jacket into a couture piece.
                </p>

                <h3 className={classes.title}>
                  Your data
                </h3>
                <p>
                  This is the paragraph where you can write more details about your
                  product. Keep you user engaged by providing meaningful information.
                  Remember that by this time, the user is curious, otherwise he wouldn
                  {"'"}t scroll to get here. Add a button if you want the user to see
                  more. We are here to make life better.
                  <br />
                  <br />
                  And now I look and look around and there’s so many Kanyes I{"'"}ve
                  been trying to figure out the bed design for the master bedroom at
                  our Hidden Hills compound... and thank you for turning my personal
                  jean jacket into a couture piece.
                </p>

                <h3 className={classes.title}>
                  The Rest
                </h3>
                <p>
                  We are here to make life better. And now I look and look around and
                  there’s so many Kanyes I{"'"}ve been trying to figure out the bed
                  design for the master bedroom at our Hidden Hills compound... and
                  thank you for turning my personal jean jacket into a couture piece.
                  <br />I speak yell scream directly at the old guard on behalf of the
                  future. daytime All respect prayers and love to Phife’s family Thank
                  you for so much inspiration.
                </p>
                <p>
                  Thank you Anna for the invite thank you to the whole Vogue team And
                  I love you like Kanye loves Kanye Pand Pand Panda I{"'"}ve been
                  trying to figure out the bed design for the master bedroom at our
                  Hidden Hills compound...The Pablo pop up was almost a pop up of
                  influence. All respect prayers and love to Phife’s family Thank you
                  for so much inspiration daytime I love this new Ferg album! The Life
                  of Pablo is now available for purchase I have a dream. Thank you to
                  everybody who made The Life of Pablo the number 1 album in the
                  world! I{"'"}m so proud of the nr #1 song in the country. Panda!
                  Good music 2016!
                </p>
                <p>
                  I love this new Ferg album! The Life of Pablo is now available for
                  purchase I have a dream. Thank you to everybody who made The Life of
                  Pablo the number 1 album in the world! I{"'"}m so proud of the nr #1
                  song in the country. Panda! Good music 2016!
                </p>
              </div>
            </div>
          </div>
        </div>
        <FooterDark />
      </div>
    );
  }
}

PrivacyPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(privacyPageStyle)(PrivacyPage);
