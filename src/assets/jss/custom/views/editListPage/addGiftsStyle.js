import {
  container,
  mrAuto,
  mlAuto,
  grayColor,
  dangerColor,
  successColor
} from "assets/jss/material-kit-pro-react.js";

const sectionDetailsStyle = theme => ({
  container,
  mrAuto,
  mlAuto,
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    "& img": {
      width: "140px"
    },
    [theme.breakpoints.down("xs")]: {
      width: "160px"
    }
  },
  customFormControl: {
    paddingTop: "14px",
    minWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "270px",
    }
  },
  customQuanityFormControl: {
    width: "80px"
  },
  textCenter: {
    textAlign: "center !important"
  },
  rightText: {
    textAlign: "Right",
  },
  tdNameAnchor: {
    color: grayColor[1]
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300"
  },
  errorContainer: {
    color: dangerColor[1],
    textAlign: "center !important",
    minHeight: "50px",
    width: "60%",
    marginLeft: "Auto",
    marginRight: "Auto"
  },
  messageContainer: {
    color: successColor[1],
    textAlign: "center !important"
  },
  results: {
    minHeight: "390px",
    marginTop: "30px"
  }
});

export default sectionDetailsStyle;
