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

const sectionDetailsStyle = theme => ({
  container,
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
    paddingTop: "0px",
    paddingLeft: "10px",
    backgroundPosition: "50%",
    backgroundSize: "cover",
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
  quoteText: {
    fontSize: "1.5rem !important"
  },
  date: {
    paddingBottom: "20px",
    paddingTop: "0px",
    "& svg": {
      position: "relative",
      top: "8px"
    },
    fontSize: "16px",
    color: grayColor[22],
    [theme.breakpoints.down("xs")]: {
        textAlign: "Center"
    },
  },
  ...imagesStyles
});

export default sectionDetailsStyle;
