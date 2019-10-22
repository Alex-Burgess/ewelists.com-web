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
  mlAuto,
  mrAuto,
  title,
  cardTitle,
  main,
  whiteColor,
  mainRaised,
  grayColor,
  infoColor
} from "assets/jss/material-kit-pro-react.jsx";

const blogPostsPageStyle = theme => ({
  mlAuto,
  mrAuto,
  cardTitle,
  container: {
    ...container,
    zIndex: "2",
    position: "relative"
  },
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "15px 0"
  },
  textCenter: {
    textAlign: "center"
  },
  title: {
    ...title,
    color: whiteColor,
    fontSize: "2.25rem",
    lineHeight: "1.5em"
  },
  sectionTitle: {
    ...title
  },
  main: {
    ...main,
    ...mainRaised
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
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
  description: {
    color: grayColor[0]
  },
  link: {
    fontSize: "13px",
    textDecoration: "none",
    "&,& *,& *:hover,& *:focus": {
      color: infoColor[2] + "  !important"
    }
  },
  listImage: {
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "216.53px",
    },
    height: "17vw",
    maxHeight: "193.19px",
    objectFit: "cover"
  }
});

export default blogPostsPageStyle;
