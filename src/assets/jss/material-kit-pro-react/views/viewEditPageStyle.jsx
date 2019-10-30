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
  main,
  whiteColor
} from "assets/jss/material-kit-pro-react.jsx";

const pageStyle = {
  container: {
    ...container,
    zIndex: "2"
  },
  textCenter: {
    textAlign: "center"
  },
  title: {
    ...title,
    color: whiteColor
  },
  subtitle: {
    color: whiteColor
  },
  main: {
    ...main,
    paddingTop: "70px"
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  profileTabs: {
    marginTop: "4.284rem"
  },
};

export default pageStyle;
