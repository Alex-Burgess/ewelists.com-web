import {
  main,
  mainRaised,
  primaryColor,
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  main: {
    ...main,
    ...mainRaised
  },
  articleBg: {
    maxHeight: "320px",
    "&:before": {
      background: "0"
    },
    "&:after": {
      background: "0"
    },
    backgroundColor: primaryColor[1],
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    },
    [theme.breakpoints.down("xs")]: {
      maxHeight: "250px",
    }
  },
  spacer: {
    height: "30px"
  },
  bannerWrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "20px"
  }
});

export default style;
