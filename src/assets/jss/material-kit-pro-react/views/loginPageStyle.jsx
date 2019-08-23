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
  description,
  cardTitle,
  infoColor,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.jsx";

const signupPageStyle = theme => ({
  description,
  cardTitle: {
    ...cardTitle,
    color: whiteColor + "  !important"
  },
  // container: {
  //   ...container,
  //   zIndex: "4",
  //   [theme.breakpoints.down("sm")]: {
  //     paddingBottom: "100px"
  //   }
  // },
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: whiteColor
  },
  pageHeader: {
    color: whiteColor,
    border: "0",
    height: "100%",
    margin: "0",
    // display: "flex!important",
    display: "inherit",
    // padding: "120px 0",
    position: "relative",
    minHeight: "100vh",
    alignItems: "center",
    "&:before": {
      // background: "rgba(" + hexToRgb(blackColor) + ", 0.5)"
      background: "rgba(" + hexToRgb(blackColor) + ", 0.1)"
    },
    // "&:after": {
    //   background:
    //     "linear-gradient(60deg,rgba(" +
    //     hexToRgb(infoColor[4]) +
    //     ",.56),rgba(" +
    //     hexToRgb(infoColor[5]) +
    //     ",.95))"
    // },
    "&:after": {
      background:
        "linear-gradient(60deg,rgba(" +
        hexToRgb(infoColor[4]) +
        ",.30),rgba(" +
        hexToRgb(infoColor[5]) +
        ",.70))"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    }
  },
  cardLogin: {
    paddingBottom: "20px"
  },
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  inputIconsColor: {
    color: grayColor[13]
  },
  textCenter: {
    textAlign: "center"
  },
  iconButtons: {
    marginRight: "3px !important",
    marginLeft: "3px !important"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  }
});

export default signupPageStyle;
