import {
  whiteColor,
  grayColor,
  blackColor,
  primaryColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

import buttonStyles from "assets/jss/material-kit-pro-react/components/buttonStyle.js";

const buttonStyle = {
  ...buttonStyles,
  button: {
    minHeight: "auto",
    minWidth: "auto",
    backgroundColor: grayColor[0],
    color: whiteColor,
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.12)",
    border: "none",
    borderRadius: "3px",
    position: "relative",
    padding: "12px 12px",
    margin: ".3125rem 1px",
    fontSize: "12px",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    "&:hover,&:focus": {
      color: whiteColor,
      backgroundColor: grayColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.2)"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      display: "inline-block",
      top: "0",
      marginTop: "-1em",
      marginBottom: "-1em",
      fontSize: "1.2rem",
      marginRight: "4px",
      verticalAlign: "middle"
    },
    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      width: "18px",
      height: "18px",
      marginRight: "4px",
      verticalAlign: "middle"
    },
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginTop: "0px",
        marginRight: "0px",
        position: "absolute",
        width: "100%",
        transform: "none",
        left: "0px",
        top: "0px",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px"
      }
    }
  },
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
  default: {
    backgroundColor: whiteColor,
    color: grayColor[4],
    boxShadow: 'none',
    "&:hover,&:focus": {
      backgroundColor: grayColor[0],
      color: whiteColor,
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.2)"
    }
  },
  facebookMessenger: {
    backgroundColor: whiteColor,
    color: "#0078FF",
    boxShadow: 'none',
    "&:hover,&:focus": {
      backgroundColor: "#0078FF",
      color: whiteColor,
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb("#0078FF") +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb("#0078FF") +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb("#0078FF") +
        ", 0.2)"
    }
  },
  share: {
    backgroundColor: whiteColor,
    color: primaryColor[0],
    boxShadow: 'none',
    "&:hover,&:focus": {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.2)"
    }
  },
  whatsapp: {
    backgroundColor: whiteColor,
    color: "#4FCE5D",
    boxShadow: 'none',
    "&:hover,&:focus": {
      backgroundColor: "#4FCE5D",
      color: whiteColor,
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb("#4FCE5D") +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb("#4FCE5D") +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb("#4FCE5D") +
        ", 0.2)"
    }
  },
  round: {
    borderRadius: "30px"
  },
};

export default buttonStyle;
