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
  whiteColor,
  infoColor,
  mainRaised
} from "assets/jss/material-kit-pro-react.jsx";

const blogPostsPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative"
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
  main: {
    ...main,
    ...mainRaised
  },
  parallaxSize: {
    maxHeight: "320px",
    "&:before": {
      background: "0"
    },
    "&:after": {
      background: "0"
    },
    backgroundColor: infoColor[0],
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
});

export default blogPostsPageStyle;
