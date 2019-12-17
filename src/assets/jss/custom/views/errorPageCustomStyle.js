import {
  infoColor,
  whiteColor,
  title,
  hexToRgb,
  blackColor
} from "assets/jss/material-kit-pro-react.js";

import errorPageStyles from "assets/jss/material-kit-pro-react/views/errorPageStyles.js";

const errorPageCustomStyle = {
  ...errorPageStyles,
  title: {
    ...title,
    fontSize: "4em",
    color: whiteColor,
    fontWeight: "700"
  },
  subTitle: {
    fontSize: "2.25rem",
    marginTop: "0",
    marginBottom: "20px"
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(" + hexToRgb(blackColor) + ", 0.1)"
    },
    "&:after": {
      background:
        "linear-gradient(60deg,rgba(" +
        hexToRgb(infoColor[4]) +
        ",.30),rgba(" +
        hexToRgb(infoColor[5]) +
        ",.70))"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    }
  }
};

export default errorPageCustomStyle;
