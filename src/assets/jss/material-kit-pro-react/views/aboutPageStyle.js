import {
  container,
  whiteColor,
  grayColor,
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
    color: primaryColor[0],
    marginTop: "50px",
    marginBottom: "10px",
    fontWeight: "500",
    lineHeight: "1.15",
    fontSize: "45px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "34px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "32px"
    }
  },
  heading: {
    ...title,
    color: primaryColor[0]
  },
  subtitle: {
    fontSize: "28px",
    fontWeight: "400",
    color: grayColor[10],
    marginTop: "10px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "24px",
    }
  },
  paragraph: {
    fontSize: "18px",
    textAlign: "justify",
    lineHeight: "1.6rem"
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "320px",
    marginTop: "20px",
    marginBottom: "40px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
      backgroundSize: "450px"
    },
    [theme.breakpoints.down("xs")]: {
      height: "220px",
      backgroundSize: "contain",
    }
  }
});

export default style;
