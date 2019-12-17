import {
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const footerDarkStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
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
    paddingTop: "5px",
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
  footer: {
    background: grayColor[14]
  },
  spacer: {
    height: "4vh",
    minHeight: "20px",
  },
  rightLinks: {
    fontSize: "20px",
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
      fontSize: "15px"
    }
  },
};
export default footerDarkStyle;
