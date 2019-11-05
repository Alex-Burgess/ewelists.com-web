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
  cardTitle,
} from "assets/jss/material-kit-pro-react.jsx";

const sectionDetailsStyle = theme => ({
  container,
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important",
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    margin: "auto",
    "& img": {
      width: "100%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "200px",
      maxHeight: "100%",
    }
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  description: {
    maxWidth: "150px"
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.2em"
  },
  tdNameAnchor: {
    color: grayColor[1]
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300"
  },
  tdNumber: {
    // textAlign: "right",
    minWidth: "100px",
    fontWeight: "300",
    fontSize: "1.125em !important"
  },
  tdNumberSmall: {
    marginRight: "3px"
  },
  actionButton: {
    margin: "0px",
    padding: "5px"
  },
  mobileDescription: {
    fontSize: "1.1em",
    fontWeight: "300"
  },
  quantities: {
    fontSize: "1.1em",
    fontWeight: "300",
    lineHeight: "2.2em"
  }
});

export default sectionDetailsStyle;
