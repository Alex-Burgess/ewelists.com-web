import {
  container,
  whiteColor,
  primaryColor,
  title
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: whiteColor
  },
  flexer: {
    flexGrow: 1,
  },
  container: {
    ...container,
    marginTop: "75px",
    marginBottom: "25px"
  },
  title: {
    marginTop: "50px",
    marginBottom: "10px",
    fontWeight: "500",
    lineHeight: "1.15",
    fontSize: "45px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "34px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "32px"
    }
  },
  heading: {
    ...title,
    color: primaryColor[0],
    marginBottom: "0px",
    marginTop: "5px"
  },
  sectionHeading: {
    ...title,
    color: primaryColor[0],
    marginBottom: "0px",
    marginTop: "45px"
  },
  paragraph: {
    fontSize: "18px",
    textAlign: "justify",
    lineHeight: "1.6rem"
  },
  headingLine: {
    marginTop: "0px"
  },
  list: {
    marginBottom: "0px"
  }
});

export default style;
