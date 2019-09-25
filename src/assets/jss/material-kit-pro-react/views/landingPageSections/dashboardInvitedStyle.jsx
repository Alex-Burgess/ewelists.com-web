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
  whiteColor,
  blackColor,
  grayColor,
  coloredShadow,
  description,
} from "assets/jss/material-kit-pro-react.jsx";

const createStyle = theme => ({
  coloredShadow,
  container: {
    color: whiteColor,
    ...container,
    zIndex: "2"
  },
  description: {
    color: grayColor[0],
    fontSize: "20px"
  },
  section: {
    paddingTop: "0px",
    paddingBottom: "70px",
    textAlign: "left"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: blackColor,
    textDecoration: "none",
    fontSize: "2.3125rem"
  },
  cardCategory: {
    marginTop: "10px",
    "& svg": {
      position: "relative",
      top: "8px"
    }
  },
  cardDescription: {
    ...description
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  listImage: {
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "211.44px",
    },
    height: "16vw",
    maxHeight: "174.5px",
    objectFit: "cover"
  }
});

export default createStyle;
