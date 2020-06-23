import {
  container,
  defaultFont,
  transition,
  boxShadow,
  drawerWidth,
  blackColor,
  whiteColor,
  grayColor,
  primaryColor,
  title,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const headerStyle = theme => ({
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "none",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: grayColor[15],
    width: "100%",
    backgroundColor: whiteColor,
    boxShadow:
      "0px 1px 2px rgba(" + hexToRgb(blackColor) + ", 0.18)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative"
  },
  absolute: {
    position: "absolute",
    top: "auto"
  },
  fixed: {
    position: "fixed"
  },
  container: {
    ...container,
    minHeight: "50px",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap"
  },
  containerBack: {
    ...container,
    minHeight: "50px",
  },
  logoButton: {
    letterSpacing: "unset",
    "&,& a": {
      ...defaultFont,
      minWidth: "unset",
      lineHeight: "30px",
      fontSize: "18px",
      borderRadius: "3px",
      textTransform: "none",
      whiteSpace: "nowrap",
      color: "inherit",
      "&:hover,&:focus": {
        color: "inherit",
        background: "transparent"
      }
    },
    // Custom styles to make logo button smaller
    padding: "0px"
  },
  arrow: {
    marginLeft: "10px",
    color: whiteColor
  },
  mobileTitle: {
    ...title,
    marginTop: "0px",
    marginBottom: "0px",
    color: whiteColor,
    textAlign: "center",
    fontSize: "1.375rem",
    lineHeight: "1.1em"
  },
  titleWrapper: {
    width: "280px",
    textAlign: "center"
  },
  appResponsive: {
    margin: "20px 10px",
    marginTop: "0px"
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: whiteColor
  },
  dark: {
    color: whiteColor,
    backgroundColor: primaryColor[0] + " !important"
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: grayColor[15],
    backgroundColor: whiteColor + " !important",
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition
  },
  hidden: {
    width: "100%"
  },
  collapse: {
    [theme.breakpoints.up("md")]: {
      display: "flex !important",
      MsFlexPreferredSize: "auto",
      flexBasis: "auto"
    },
    WebkitBoxFlex: "1",
    MsFlexPositive: "1",
    flexGrow: "1",
    WebkitBoxAlign: "center",
    MsFlexAlign: "center",
    alignItems: "center"
  },
  closeButtonDrawer: {
    position: "absolute",
    right: "8px",
    top: "9px",
    zIndex: "1"
  },
  // Custpm style - Added logo
  logo: {
    height: "45px",
    verticalAlign: "middle"
  }
});

export default headerStyle;
