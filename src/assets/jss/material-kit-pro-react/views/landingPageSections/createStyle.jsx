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
  title,
  description,
  blackColor,
} from "assets/jss/material-kit-pro-react.jsx";

const createStyle = {
  description,
  section: {
    padding: "150px 0",
    textAlign: "left"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: blackColor,
    textDecoration: "none"
  },
  phoneContainer: {
    "& img": {
      width: "100%"
    }
  },
  infoArea: {
    maxWidth: "none",
    margin: "0 auto",
    padding: "10px 0 0px"
  }
};

export default createStyle;
