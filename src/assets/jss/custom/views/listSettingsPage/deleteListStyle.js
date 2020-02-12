import {
  dangerColor
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";

const sectionStyle = theme => ({
  ...modalStyle(theme),
  centerText: {
    textAlign: "Center",
  },
  error: {
    color: dangerColor[1]
  }
});

export default sectionStyle;
