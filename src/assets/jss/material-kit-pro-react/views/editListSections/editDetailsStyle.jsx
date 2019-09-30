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
  grayColor,
  container,
  title
} from "assets/jss/material-kit-pro-react.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";
import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.jsx";

const sectionDetailsStyle = theme => ({
  container,
  ...customSelectStyle,
  ...imagesStyles,
  title: {
    ...title,
    textAlign: "Left",
    [theme.breakpoints.down("xs")]: {
        textAlign: "Center",
        fontSize: "1.75rem"
    },
    marginBottom: "10px"
  },
  description: {
    paddingBottom: "0px",
  },
  section: {
    paddingBottom: "40",
    paddingTop: "20px",
    paddingLeft: "10px",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
      [theme.breakpoints.down("xs")]: {
          fontSize: "1.1rem",
          lineHeight: "1.4em"
      }
    }
  },
  label: {
    paddingTop: "30px",
    color: grayColor[12],
  },
  dateField: {
    marginTop: "10px"
  },
  listImage: {
    maxHeight: "233.188px",
    objectFit: "cover"
  },
});

export default sectionDetailsStyle;
