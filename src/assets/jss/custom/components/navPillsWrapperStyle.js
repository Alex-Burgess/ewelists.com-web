import {
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

import navPillsStyles from "assets/jss/material-kit-pro-react/components/navPillsStyle.js";

const navPillsStyle = theme => ({
  ...navPillsStyles,
  pills: {
    ...pills,
    // Styles for mobile edit nav bar
    [theme.breakpoints.down("xs")]: {
      maxWidth: "70px",
      minWidth: "70px",
      maxHeight: "100px"
    }
  },
});

export default navPillsStyle;
