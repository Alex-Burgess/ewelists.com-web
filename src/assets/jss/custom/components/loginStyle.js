import {
  cardTitle,
  description,
  whiteColor,
  grayColor,
  infoColor
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";

const javascriptStyles = theme => ({
  description,
  cardTitle,
  ...modalStyle(theme),
  icon: {
    width: "24px",
    height: "24px",
    color: grayColor[13]
  },
  textCenter: {
    textAlign: "center"
  },
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + "  !important",
    marginTop: "1.2rem !important",
    fontSize: "1.1rem"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  socialLineButton: {
    "&, &:hover": { color: whiteColor },
    marginLeft: "5px",
    marginRight: "5px"
  },
  cardLoginHeader: {
    marginTop: "-40px",
    padding: "20px 0",
    width: "100%",
    marginBottom: "15px",
    minHeight: "104px",
  },
  cardLoginBody: {
    paddingTop: "20px",
    paddingBottom: "0",
    textAlign: "center"
  },
  justifyContentLeft: {
    WebkitBoxPack: "left !important",
    MsFlexPack: "left !important",
    justifyContent: "left !important"
  },
  link: {
    fontSize: "13px",
    textDecoration: "none",
    "&,& *,& *:hover,& *:focus": {
      color: infoColor[2] + "  !important"
    }
  },
  resetLinkWrapper: {
    textAlign: "left !important",
    paddingTop: "20px !important",
    paddingBottom: "10px !important",
    paddingLeft: "40px !important"
  },
  loginMessage: {
    padding: "0 50px 40px !important"
  }
});

export default javascriptStyles;
