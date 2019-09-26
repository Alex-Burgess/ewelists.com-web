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
    textAlign: "Center",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.75rem"
    }
  },
  subtitle: {
    paddingBottom: "30px",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.5rem",
        textAlign: "Center"
    }
  },
  section: {
    paddingBottom: "0",
    paddingTop: "20px",
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
  ...imagesStyles
});

export default sectionDetailsStyle;
