import {
  container,
  whiteColor,
  grayColor,
  primaryColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const footerStyle = theme => ({
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  rightLinks: {
    float: "right!important",
    "& ul": {
      marginBottom: 0,
      marginTop: 10,
      padding: 0,
      listStyle: "none",
      height: 38,
      "& li": {
        display: "inline-block"
      }
    },
    "& i": {
      fontSize: "20px"
    }
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative",
    "& ul": {
      marginBottom: "0",
      padding: 0,
      listStyle: "none"
    }
  },
  big: {
    padding: "1.875rem 0",
    "& h5, & h4": {
      fontWeight: 700,
      fontFamily: "Roboto Slab,Times New Roman,serif",
      marginBottom: "15px"
    },
    "& p": {
      color: grayColor[0]
    }
  },
  content: {
    textAlign: "left"
  },
  a: {
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  dark: {
    background: primaryColor[0],
    color: whiteColor,
    "& p": {
      color: whiteColor,
      fontSize: "16px",
      fontWeight: "400"
    },
    "& i": {
      color: whiteColor
    },
    "& a": {
      color: whiteColor,
      fontWeight: "400",
      "&:visited": {
        color: whiteColor
      },
      "&:focus, &:hover": {
        opacity: 1,
        fontWeight: "500"
      }
    },
    "& hr": {
      borderColor: "rgba(" + hexToRgb(whiteColor) + ",0.2)"
    }
  },
  grey: {
    backgroundColor: grayColor[14],
    textDecoration: "none",
    "& a": {
      fontSize: "12px",
      fontWeight: "500",
      textTransform: "uppercase",
      padding: "0.9375rem",
      display: "block",
      [theme.breakpoints.down("xs")]: {
        padding: "0.9375rem 0.5rem",
      },
      "&:visited": {
        color: grayColor[1]
      },
      "&:hover, &:focus": {
        fontWeight: "600"
      }
    }
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  clearFix: {
    clear: "both"
  },
  socialButtons: {
    "& li": {
      display: "inline-block"
    }
  }
});
export default footerStyle;
