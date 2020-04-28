import {
  infoColor,
  grayColor,
  dangerColor,
  container,
  cardTitle,
  whiteColor,
  blackColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

import customCheckboxRadioSwitchStyle from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

const resetPasswordPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: whiteColor
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
  },
  cardSignup: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(" +
      hexToRgb(blackColor) +
      ", 0.14), 0 6px 30px 5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2);",
    marginBottom: "100px",
    padding: "40px 0px"
  },
  cardTitle: {
    ...cardTitle,
    textDecoration: "none",
    textAlign: "center !important",
    marginBottom: "0.75rem"
  },
  ...customCheckboxRadioSwitchStyle,
  socials: {
    marginTop: "0",
    position: "absolute",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px"
  },
  textCenter: {
    textAlign: "center"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: grayColor[13]
  },
  form: {
    margin: "0"
  },
  infoArea: {
    padding: "0px 10px 20px !important"
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0.2rem 0.8rem 0.2rem 0.8rem",
    },
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    display: "block",
    "&,& *,& *:hover,& *:focus": {
      color: whiteColor + "  !important"
    }
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
    "&,& *,& *:hover,& *:focus": {
      color: whiteColor + "  !important"
    }
  },
  rightLinks: {
    float: "right!important",
    "& ul": {
      margin: 0,
      padding: 0,
      listStyle: "none",
      "& li": {
        display: "inline-block"
      },
      "& a": {
        display: "block"
      }
    },
    "& i": {
      fontSize: "20px"
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
  footer: {
    position: "absolute",
    width: "100%",
    background: "transparent",
    bottom: "0",
    color: whiteColor,
    zIndex: "2"
  },
  details: {
    color: "#999"
  },
  confirmMessageSpacing: {
    fontSize: "16px",
    marginBottom: "0px"
  },
  messageSpacing: {
    fontSize: "16px",
    marginTop: "15px",
    marginBottom: "0px"
  },
  link: {
    textDecoration: "none",
    "&,& *,& *:hover,& *:focus": {
      color: infoColor[2] + "  !important"
    }
  },
  error: {
    color: dangerColor[1]
  },
  passwordRules: {
    color: "#999",
    paddingBottom: "15px",
    fontSize: "13px"
  }
});

export default resetPasswordPageStyle;
