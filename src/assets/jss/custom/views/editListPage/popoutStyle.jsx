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
  dangerColor
} from "assets/jss/material-kit-pro-react.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";

const sectionStyle = theme => ({
  ...modalStyle(theme),
  centerText: {
    textAlign: "Center",
  },
  error: {
    color: dangerColor[1]
  }
});

export default sectionStyle;
