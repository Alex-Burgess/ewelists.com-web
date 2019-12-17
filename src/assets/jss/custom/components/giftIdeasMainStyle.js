import {
  container,
  title,
  main,
  whiteColor,
  infoColor,
  mainRaised
} from "assets/jss/material-kit-pro-react.js";

const blogPostsPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "2",
    position: "relative"
  },
  textCenter: {
    textAlign: "center"
  },
  title: {
    ...title,
    color: whiteColor,
    fontSize: "2.25rem",
    lineHeight: "1.5em"
  },
  main: {
    ...main,
    ...mainRaised
  },
  parallaxSize: {
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
});

export default blogPostsPageStyle;
