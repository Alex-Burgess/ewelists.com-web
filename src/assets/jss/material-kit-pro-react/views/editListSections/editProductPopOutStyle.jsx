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
  dangerColor,
  title
} from "assets/jss/material-kit-pro-react.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.jsx";

const sectionStyle = theme => ({
  ...modalStyle(theme),
  ...buttonGroup,
  centerText: {
    textAlign: "Center",
  },
  error: {
    color: dangerColor[1]
  },
  title: {
    ...title,
    marginBottom: 0
  },
  mainPrice: {
    margin: "10px 0px 25px"
  },
});

export default sectionStyle;
