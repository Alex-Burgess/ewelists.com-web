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
  }
});

export default blogPostsPageStyle;
