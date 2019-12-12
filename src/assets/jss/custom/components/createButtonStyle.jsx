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
  successColor,
  description
} from "assets/jss/material-kit-pro-react.jsx";

const buttonStyle = {
  addList: {
    width: "100%",
    height: "330px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardDescription: {
    ...description
  },
  centerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    color: successColor[1],
    marginLeft: -66,
  }
};

export default buttonStyle;
