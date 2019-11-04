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
  mrAuto,
  mlAuto,
} from "assets/jss/material-kit-pro-react.jsx";

const sectionDetailsStyle = theme => ({
  container,
  mrAuto,
  mlAuto,
  customFormControl: {
    paddingTop: "14px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "270px",
    }
  },
  customQuanityFormControl: {
    width: "80px"
  },
  textCenter: {
    textAlign: "center !important"
  },
  rightText: {
    textAlign: "Right",
  },
  actionButton: {
    padding: "0px"
  }
});

export default sectionDetailsStyle;
