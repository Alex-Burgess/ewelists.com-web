import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import FooterGrey from "custom/Footer/FooterGrey.js";
import HeaderFixed from "custom/Header/HeaderFixed.js";

import styles from "assets/jss/custom/views/legalPagesStyle.js";
const useStyles = makeStyles(styles);

export default function TermsPage(props) {
  const classes = useStyles();
  return (
    <div>
      <HeaderFixed isAuthenticated={props.isAuthenticated} user={props.user} mobile={props.mobile} />

      <div className={classes.main}>
        <div className={classes.content}>
          <div className={classes.container}>
            <h1 className={classes.title}>Cookies</h1>

            <div className={classes.textContent}>
              <h3 className={classes.title}>
                How We Use Cookies
              </h3>
              <p>
                We use cookies to provide you with a better experience across our Site and to show your personalised
                content. Cookies are used for a number of purposes, some of which essential to the operation of our
                Site, including:
                <ul>
                  <li>
                    <b>Perform analytics:</b> We have integrated third party analytics service provides, such as Google Analytics, to understand our
                    clients use of the Site.  This tracking is subsequently used to improve our Site.
                  </li>
                  <li>
                    <b>Improve user experience:</b> We use cookies to store Site specific information, so that we can
                      personalise pages for users that have not registered with our site.
                  </li>
                  <li>
                    <b>Recognise your device:</b> We use cookies to recognise your device, so that we don't have to
                      request certain information repeatedly and so that we can provide a smooth user experience.
                  </li>
                  <li>
                    <b>Cookie consent:</b> We use a cookie to record your approval for us to use cookies on our Site.
                  </li>
                </ul>
              </p>
              <h3 className={classes.title}>
                Cookie Preferences
              </h3>
              <p>
                We ask for your permission to use cookies across our Site. When you visit our Site, a pop up will appear
                asking for your permission.  You may not see this pop up if you have already set your preferences in
                your browser, or if you have already accepted all cookies on our website.
              </p>
              <p>
                If you choose not to accept cookies, our websites may not perform properly and certain services will
                not be provided to you.
              </p>
              <h3 className={classes.title}>
                Cookie Management
              </h3>
              <p>
                You can control the use of cookies at using your internet browser. If you reject or delete cookies, our
                Services may no longer function for you.  Please see your specific browsers help page for more details.
              </p>
              <h3 className={classes.title}>
                Further Information
              </h3>
              <p>
                You can send an email to contact@ewelists.com if you would like more information on the cookies that we
                use and their purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterGrey />
    </div>
  );
}
