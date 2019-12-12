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
  whiteColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.jsx";

import buttonStyles from "assets/jss/material-kit-pro-react/components/buttonStyle.jsx";

const buttonStyle = {
  ...buttonStyles,
  amazon: {
    backgroundColor: "#FF9900",
    color: whiteColor,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb("#FF9900") +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb("#FF9900") +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb("#FF9900") +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#FF9900",
      color: whiteColor,
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb("#FF9900") +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb("#FF9900") +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb("#FF9900") +
        ", 0.2)"
    }
  },
};

export default buttonStyle;
