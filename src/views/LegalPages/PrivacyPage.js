import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import FooterGrey from "components/Footer/FooterGrey.js";
import HeaderWhite from "components/Header/HeaderWhite.js";

import styles from "assets/jss/material-kit-pro-react/views/legalPagesStyle.js";
const useStyles = makeStyles(styles);

export default function PrivacyPage(props) {
  const classes = useStyles();
  return (
    <div>
      <HeaderWhite />
      <div className={classes.main}>
        <div className={classes.content}>
          <div className={classes.container}>
            <h1 className={classes.title}>Privacy Policy</h1>

            <div className={classes.textContent}>
              <h3 className={classes.title}>
                Privacy Policy
              </h3>
              <p>
                The internet site <u>ewelists.com</u> <b>("Site")</b> is provided by Ewelists Ltd <b>(“Ewelists”)</b>.
                Ewelists is committed to protecting Your privacy and security. This <b>Privacy Policy</b>, together with
                the terms of service <b>(“Terms”)</b>, sets out the basis on which any personal data Ewelists collects
                from You, or that You provide to Ewelists, via the Site will be processed. Please read this Privacy
                Policy and the Terms carefully to understand Ewelists views and practices regarding Your personal data
                and how Ewelists will ensure Your data remains secure.
              </p>
              <p>
                By using the Site You accept the Terms, Cookies and this Privacy Policy and You agree to comply with them.
                Ewelists may make changes to this Privacy Policy without notice to You. Please ensure that You review
                this Privacy Policy regularly as You will be deemed to have accepted any variation if You continue to
                use the Site after it has been posted.
              </p>
              <p>
                For the purpose of the Data Protection Act 2018, the controller is Ewelists Ltd and  Our registered
                office is Lytchett House 13 Freeland Park, Wareham Road, Poole, Dorset, United Kingdom, BH16 6FA. 
              </p>
              <p>
                If You have any requests concerning Your personal data or any queries with regard to the practices
                laid out below please contact us <u>contact@ewelists.com</u>.
              </p>
              <h3 className={classes.title}>
                Information We Collect
              </h3>
              <p>
                All the data We collect from You as a gift list holder, purchaser or website user is for the provision
                of the Services We offer. The data We collect about You may include Your name, postal address, e-mail
                address or telephone number. We collect this personal data in a number of different ways, namely when
                You register on this Site, create a gift list on the Site or report a problem with the Site.
              </p>
              <h3 className={classes.title}>
                How We Use Your Information
              </h3>
              <p>
                We may use Your Personal Information for a variety of reasons to provide the Services, including:
              </p>
              <ul>
                <li>
                  To present the Site and its contents to You.
                </li>
                <li>
                  To provide You with information, products or services that You request from Us.
                </li>
                <li>
                  To allow You to participate in the creation and sharing of gift lists
                </li>
                <li>
                  To contact You and deliver administrative notices and communications relevant to Your use of the
                  Service, such as security or support and maintenance advisories.
                </li>
                <li>
                  To conduct system administration and system troubleshooting and to diagnose or fix technology
                  problems.
                </li>
                <li>
                  To enforce Our Terms of Service or other policies or agreements.
                </li>
                <li>
                  To operate the Service, monitor the effectiveness of the Service, to improve the content of the
                  Service, and laYout and design.
                </li>
                <li>
                  To monitor, analyse and describe usage patterns and performance of the Service, including
                  aggregate metrics such as total number of visitors, traffic, and demographic patterns.
                </li>
                <li>
                  To send promotional communications and/or newsletters to You and for other marketing purposes of
                  Ewelists or its Affiliates or Partners.
                </li>
                <li>
                  For distribution to Service Providers that provide services to Ewelists and Partners of Ewelists.
                </li>
                <li>
                  As otherwise set forth in this Privacy Policy.
                </li>
              </ul>
              <h3 className={classes.title}>
                How We Store Your Personal Data
              </h3>
              <p>
                Any personal data You give to Ewelists is held in accordance with the provisions of the  Data
                Protection Act 2018. Ewelists stores this data on secure servers within the  EEA. On registration to
                the Site You are required to choose a member ID and password. You are responsible for keeping these
                confidential. You should not share them with anyone.
              </p>
              <p>
                We will only keep Your personal details for a maximum of 2 years or for as long as You continue to use
                the Site. The terms of the Data Protection Act 2018  states that Your consent is valid for 2 years
                unless You choose to withdraw it within this time period. As previously explained You can withdraw
                Your consent at any time.
              </p>
              <h3 className={classes.title}>
                Links To Other Sites
              </h3>
              <p>
                The Site may include links to other internet sites. Please note that these internet sites have their
                own privacy policies and that Ewelists does not accept any responsibility or liability for these
                policies. Please check these policies before You submit any personal data to these internet sites.
              </p>
              <h3 className={classes.title}>
                Disclosure Of You Personal Information
              </h3>
              <p>
                We may share Your personal information with any member of Our group or with selected relevant third
                parties including:
              </p>
              <ul>
                <li>
                  Business partners, suppliers, sub-contractors and other service providers (such as mapping and
                  location services), if required for the performance of the services We provide to You or a
                  product requested by You.
                </li>
                <li>
                  Analytics and search engine providers that assist Us in the improvement and optimisation of Our
                  Site.
                </li>
              </ul>
              <p>
                We may disclose Your personal information to third parties in the event that We sell or buy any
                business or assets, in which case We may disclose Your personal data to the prospective seller or
                buyer of such business or assets. If Ewelists or substantially all of its assets are acquired by a
                third party, in which case personal data held by Us about Our customers will be one of the transferred
                assets. If We are under a duty to disclose or share Your personal data in order to comply with any
                legal obligation, or in order to enforce or apply Our terms and conditions or other policies at
                Ewelists and other agreements; or to protect the rights, property, or safety of Ewelists, Our
                customers, or others.
              </p>
              <h3 className={classes.title}>
                Accessing And Correcting Your Personal Information
              </h3>
              <p>
                You can send an e-mail to <u>contact@ewelists.com</u> to request access to, correct or delete any personal
                data that You have provided.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterGrey />
    </div>
  );
}
