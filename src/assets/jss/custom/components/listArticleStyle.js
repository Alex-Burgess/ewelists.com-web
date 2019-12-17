import {
  container,
  title,
  main,
  grayColor,
  mainRaised,
  section,
  hexToRgb,
  blackColor
} from "assets/jss/material-kit-pro-react.js";

const blogPostPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "2"
  },
  section: {
    ...section,
    paddingTop: "0",
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  },
  title: {
    ...title,
    textAlign: "Center",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.75rem"
    }
  },
  subtitle: {
    paddingBottom: "30px",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.5rem",
        textAlign: "Center"
    }
  },
  main: {
    ...main,
    ...mainRaised
  },
  articleBg: {
    height: "40vh"
  },
  content: {
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
      [theme.breakpoints.down("xs")]: {
          fontSize: "1.1rem",
          lineHeight: "1.4em"
      }
    }
  },
  darkFilter: {
    "&:before": {
      background: "rgba(" + hexToRgb(blackColor) + ", 0.2)"
    },
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

export default blogPostPageStyle;
