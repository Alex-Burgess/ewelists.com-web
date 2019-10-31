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

const sectionStyle = theme => ({
  ...modalStyle(theme),
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
  productImage: {
    // [theme.breakpoints.down("xs")]: {
    //   height: "82vw",
    //   maxHeight: "276.59px",
    // },
    // height: "18vw",
    maxHeight: "400px",
    objectFit: "contain",
  },
});

export default sectionStyle;
