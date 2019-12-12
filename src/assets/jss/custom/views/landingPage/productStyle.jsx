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
  container,
  title,
  grayColor,
  whiteColor
} from "assets/jss/material-kit-pro-react.jsx";

const productStyle = {
  container: {
    color: whiteColor,
    ...container,
    zIndex: "2"
  },
  section: {
    paddingTop: "20px",
    paddingRight: "0px",
    paddingBottom: "70px",
    paddingLeft: "0px",
    textAlign: "center"
  },
  sectionGray: {
    background: grayColor[14]
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: grayColor[0],
    fontSize: "16px"
  },
  infoArea: {
    padding: "0px 0 30px"
  }
};

export default productStyle;
