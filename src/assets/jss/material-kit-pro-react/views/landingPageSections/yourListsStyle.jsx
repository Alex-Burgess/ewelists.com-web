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
  cardTitle,
  whiteColor,
  blackColor,
  grayColor,
  successColor,
  coloredShadow,
  description,
  mlAuto,
  mrAuto,
} from "assets/jss/material-kit-pro-react.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";
import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.jsx";

const sectionStyle = theme => ({
  coloredShadow,
  mlAuto,
  mrAuto,
  cardTitle,
  ...modalStyle(theme),
  ...customSelectStyle,
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
    paddingTop: "70px",
    paddingBottom: "20px",
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
  },
  textCenter: {
    textAlign: "Center",
  },
  label: {
    paddingTop: "30px",
    color: grayColor[12],
  },
  progress: {
    color: successColor[1],
    marginLeft: -66,
  },
  centerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addList: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    position: 'relative',
    margin: "0 auto"
  },
  buttonSuccess: {
    backgroundColor: successColor[500],
    '&:hover': {
      backgroundColor: successColor[700],
    },
  },
  buttonProgress: {
    color: successColor[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default sectionStyle;
