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
import {
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.jsx";

import navPillsStyles from "assets/jss/material-kit-pro-react/components/navPillsStyle.jsx";

const navPillsStyle = theme => ({
  ...navPillsStyles,
  pills: {
    ...pills,
    // Styles for mobile edit nav bar
    [theme.breakpoints.down("xs")]: {
      maxWidth: "70px",
      minWidth: "70px",
      maxHeight: "100px"
    }
  },
});

export default navPillsStyle;
