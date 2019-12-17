import {
  main,
  mainRaised,
  infoColor,
} from "assets/jss/material-kit-pro-react.js";

const blogPostPageStyle = {
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
    backgroundColor: infoColor[0],
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
  spacer: {
    height: "30px"
  }
};

export default blogPostPageStyle;
