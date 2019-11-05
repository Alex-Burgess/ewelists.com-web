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
  dangerColor,
  title,
  cardTitle,
  grayColor
} from "assets/jss/material-kit-pro-react.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.jsx";

const sectionStyle = theme => ({
  ...modalStyle(theme),
  ...buttonGroup,
  centerText: {
    textAlign: "Center",
  },
  error: {
    color: dangerColor[1]
  },
  title: {
    ...title,
    marginBottom: 0
  },
  mainPrice: {
    margin: "10px 0px 25px"
  },
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    }
  },
  description: {
    color: grayColor[0],
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  productImage: {
    [theme.breakpoints.down("xs")]: {
      height: "50vw",
      maxHeight: "276.59px",
    },
    height: "28vw",
    // maxHeight: "180.05px",
    objectFit: "contain",
  },
  textCenter: {
    textAlign: "center !important"
  },
});

export default sectionStyle;
