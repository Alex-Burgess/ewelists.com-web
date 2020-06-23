import {
  container,
  title,
  whiteColor,
  blackColor,
} from "assets/jss/material-kit-pro-react.js";

const createStyle = theme => ({
  section: {
    paddingTop: "150px",
    paddingBottom: "70px",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "70px",
      paddingBottom: "0",
    }
  },
  container: {
    color: whiteColor,
    ...container,
    zIndex: "2"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: blackColor,
    textDecoration: "none",
    fontSize: "1.8rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
      textAlign: "center"
    }
  },
  imgContainer: {
    "& img": {
      width: "100%"
    },
    paddingTop: "40px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "20px",
      paddingBottom: "20px",
    }

  },
  buttonContainer: {
    [theme.breakpoints.down("xs")]: {
      // paddingTop: "50px",
      // paddingBottom: "50px",
      textAlign: "center"
    }
  },
  downButton: {
    [theme.breakpoints.down("xs")]: {
      // paddingTop: "50px",
      paddingBottom: "10px",
      textAlign: "center"
    }
  }
});

export default createStyle;
