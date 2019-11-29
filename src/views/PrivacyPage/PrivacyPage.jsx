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
                  Privacy Policy
                </h3>
                <p>
                  The internet site <u>ewelists.com</u> <b>("Site")</b> is provided by Ewelists Ltd <b>(“Ewelists”)</b>.
                  Ewelists is committed to protecting your privacy and security. This <b>Privacy Policy</b>, together with
                  the terms of service <b>(“Terms”)</b>, sets out the basis on which any personal data Ewelists collects
                  from you, or that you provide to Ewelists, via the Site will be processed. Please read this Privacy
                  Policy and the Terms carefully to understand Ewelists views and practices regarding your personal data
                  and how Ewelists will ensure your data remains secure.
                </p>
                <p>
                  By using the Site you accept the Terms and this Privacy Policy and you agree to comply with them.
                  Ewelists may make changes to this Privacy Policy without notice to you. Please ensure that you review
                  this Privacy Policy regularly as you will be deemed to have accepted any variation if you continue to
                  use the Site after it has been posted.
                </p>
                <p>
                  For the purpose of the Data Protection Act 2018, the controller is Ewe Lists Ltd and  Our registered
                  office is Lytchett House 13 Freeland Park, Wareham Road, Poole, Dorset, United Kingdom, BH16 6FA. 
                </p>
                <p>
                  If you have any requests concerning your personal data or any queries with regard to the practices
                  laid out below please contact us <u>contact@ewelists.com</u>.
                </p>
                <h3 className={classes.title}>
                  Information We Collect
                </h3>
                <p>
                  All the data we collect from you as a gift list holder, purchaser or website user is for the provision
                  of the Services we offer. The data we collect about you may include your name, postal address, e-mail
                  address or telephone number. We collect this personal data in a number of different ways, namely when
                  you register on this Site, create a gift list on the Site or report a problem with the Site.
                </p>
                <h3 className={classes.title}>
                  How We Use Your Information
                </h3>
                <p>
                  We may use your Personal Information for a variety of reasons to provide the Services, including:
                  <ul>
                    <li>
                      To present the Site and its contents to you.
                    </li>
                    <li>
                      To provide you with information, products or services that you request from us.
                    </li>
                    <li>
                      To allow you to participate in the creation and sharing of gift lists
                    </li>
                    <li>
                      To contact you and deliver administrative notices and communications relevant to your use of the
                      Service, such as security or support and maintenance advisories.
                    </li>
                    <li>
                      To conduct system administration and system troubleshooting and to diagnose or fix technology
                      problems.
                    </li>
                    <li>
                      To enforce our Terms of Service or other policies or agreements.
                    </li>
                    <li>
                      To operate the Service, monitor the effectiveness of the Service, to improve the content of the
                      Service, and layout and design.
                    </li>
                    <li>
                      To monitor, analyse and describe usage patterns and performance of the Service, including
                      aggregate metrics such as total number of visitors, traffic, and demographic patterns.
                    </li>
                    <li>
                      To send promotional communications and/or newsletters to you and for other marketing purposes of
                      Ewelists or its Affiliates or Partners.
                    </li>
                    <li>
                      For distribution to Service Providers that provide services to Ewelists and Partners of Ewelists.
                    </li>
                    <li>
                      As otherwise set forth in this Privacy Policy.
                    </li>
                  </ul>
                </p>
                <h3 className={classes.title}>
                  How We Store Your Personal Data
                </h3>
                <p>
                  Any personal data you give to Ewelists is held in accordance with the provisions of the  Data
                  Protection Act 2018. Ewelists stores this data on secure servers within the  EEA. On registration to
                  the Site you are required to choose a member ID and password. You are responsible for keeping these
                  confidential. You should not share them with anyone.
                </p>
                <p>
                  We will only keep your personal details for a maximum of 2 years or for as long as you continue to use
                  the Site. The terms of the Data Protection Act 2018  states that your consent is valid for 2 years
                  unless you choose to withdraw it within this time period. As previously explained you can withdraw
                  your consent at any time.
                </p>
                <h3 className={classes.title}>
                  Links To Other Sites
                </h3>
                <p>
                  The Site may include links to other internet sites. Please note that these internet sites have their
                  own privacy policies and that Ewelists does not accept any responsibility or liability for these
                  policies. Please check these policies before you submit any personal data to these internet sites.
                </p>
                <h3 className={classes.title}>
                  Disclosure Of You Personal Information
                </h3>
                <p>
                  We may share your personal information with any member of our group or with selected relevant third
                  parties including:
                  <ul>
                    <li>
                      Business partners, suppliers, sub-contractors and other service providers (such as mapping and
                        location services), if required for the performance of the services we provide to you or a
                        product requested by you.
                    </li>
                    <li>
                      Analytics and search engine providers that assist us in the improvement and optimisation of Our
                      Site.
                    </li>
                  </ul>
                </p>
                <p>
                  We may disclose your personal information to third parties in the event that we sell or buy any
                  business or assets, in which case we may disclose your personal data to the prospective seller or
                  buyer of such business or assets. If Ewelists or substantially all of its assets are acquired by a
                  third party, in which case personal data held by us about our customers will be one of the transferred
                  ssets. If we are under a duty to disclose or share your personal data in order to comply with any
                  legal obligation, or in order to enforce or apply our terms and conditions or other policies at
                  Ewelists and other agreements; or to protect the rights, property, or safety of Ewelists, our
                  customers, or others.
                </p>
                <h3 className={classes.title}>
                  Accessing And Correcting Your Personal Information
                </h3>
                <p>
                  You can send an e-mail to <u>contact@ewelists.com</u> to request access to, correct or delete any personal
                  data that you have provided.
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
