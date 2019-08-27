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
  main,
  mainRaised,
  mlAuto,
  description
} from "assets/jss/material-kit-pro-react.jsx";

const contactUsStyle = {
  main,
  mainRaised,
  mlAuto,
  description,
  container: {
    ...container,
    maxWidth: "600px !important"
  },
  contactContent: {
    paddingBottom: "80px",
    paddingTop: "40px"
  },
  parallax: {
    height: "40vh",
    minHeight: "40vh",
    maxHeight: "550px",
    display: "block"
  },
  title: {
    fontSize: "2.25rem",
    lineHeight: "1.5em",
    color: "#3C4858",
    minHeight: "32px",
    marginBottom: "25px"
  },
  subHeading: {
    fontSize: "14px",
    margin: "0 0 10px",
    color: "#3c4858"
  },
  info: {
    paddingBottom: "10px",
    paddingTop: 0
  },
  textCenter: {
    textAlign: "center !important"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  }
};

export default contactUsStyle;
