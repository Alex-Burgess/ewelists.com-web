import {
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

const footerDarkStyle = theme => ({
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
  spacer: {
    height: "4vh",
    minHeight: "20px",
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
});
export default footerDarkStyle;
