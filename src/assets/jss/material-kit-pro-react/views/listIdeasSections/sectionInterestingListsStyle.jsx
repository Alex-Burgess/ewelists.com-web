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
  title,
  cardTitle,
  coloredShadow,
  grayColor,
  infoColor
} from "assets/jss/material-kit-pro-react.jsx";

const sectionInterestingListsStyle = {
  title,
  cardTitle,
  coloredShadow,
  textCenter: {
    textAlign: "center"
  },
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "15px 0"
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
  }
};

export default sectionInterestingListsStyle;
