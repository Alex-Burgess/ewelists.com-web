import {
  container,
  title,
  main,
  whiteColor
} from "assets/jss/material-kit-pro-react.js";

const pageStyle = {
  container: {
    ...container,
    zIndex: "2"
  },
  textCenter: {
    textAlign: "center"
  },
  title: {
    ...title,
    color: whiteColor
  },
  subtitle: {
    color: whiteColor
  },
  main: {
    ...main,
    paddingTop: "70px"
  },
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
  profileTabs: {
    marginTop: "2rem"
  },
};

export default pageStyle;
