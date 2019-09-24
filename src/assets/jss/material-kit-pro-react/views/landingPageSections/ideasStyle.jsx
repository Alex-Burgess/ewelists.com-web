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
  coloredShadow,
  description,
  mlAuto,
  mrAuto,
  grayColor
} from "assets/jss/material-kit-pro-react.jsx";

const ideasSection = theme => ({
  container,
  coloredShadow,
  cardTitle,
  mlAuto,
  mrAuto,
  description,
  section: {
    padding: "50px 0"
  },
  title: {
    ...title,
    fontSize: "2.25rem"
  },
  cardCategory: {
    fontSize: "0.75rem",
    marginBottom: "0",
    marginTop: "10px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "8px",
      lineHeight: "0"
    }
  },
  description1: {
    ...description,
    lineHeight: "1.313rem"
  },
  author: {
    "& a": {
      color: grayColor[1],
      textDecoration: "none"
    }
  },
  card: {
    marginBottom: "80px",
    marginTop: "0px"
  },
  card4: {
    marginBottom: "60px",
    textAlign: "center"
  },
  leftImage: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    height: "18vw",
    maxHeight: "202.47px",
    objectFit: "cover"
  },
  leftImageMobile: {
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "230.28px",
      objectFit: "cover",
      display: "inline"
    },
    display: "none"
  },
  rightImage: {
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "230.28px",
      objectFit: "cover",
      display: "inline"
    },
    height: "18vw",
    maxHeight: "202.47px",
    objectFit: "cover"
  }
});

export default ideasSection;
