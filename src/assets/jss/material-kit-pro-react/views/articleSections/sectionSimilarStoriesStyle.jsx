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
  grayColor,
  coloredShadow
} from "assets/jss/material-kit-pro-react.jsx";

const sectionSimilarStoriesStyle = theme => ({
  container,
  title,
  cardTitle,
  coloredShadow,
  textCenter: {
    textAlign: "center"
  },
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0"
  },
  description: {
    color: grayColor[0]
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

export default sectionSimilarStoriesStyle;
