import {
  container,
  title,
  whiteColor,
  blackColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  title,
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("xs")]: {
      padding: "0px"
    }
  },
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    [theme.breakpoints.down("xs")]: {
      backgroundColor: whiteColor
    }
  },
  flexer: {
    flexGrow: 1
  },
  textCenter: {
    textAlign: "center"
  },
  emailFormTitle: {
    marginBottom: "0px",
    marginTop: "25px"
  },
  emailFormSpacer: {
    minWidth: "30px",
    display: "inline-block"
  },
  gridLogin: {
    maxWidth: "80%",
    minWidth: "450px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      minWidth: "300px",
    }
  },
  cardLogin: {
    marginTop: "120px",
    paddingBottom: "20px",
    border: "1px solid #ddd",
    boxShadow: "none",
    [theme.breakpoints.down("xs")]: {
      border: "none",
      marginTop: "70px"
    }
  },
  signUpButton: {
    marginTop: "30px",
    marginBottom: "30px"
  },
  seperatorLine: {
    borderTop: "1px solid #ddd",
    margin: "30px 0px 10px 0px",
    position: "relative"
  },
  seperatorText: {
    position: "absolute",
    top: "-12px",
    color: "#777",
    textAlign: "center",
    left: "41%",
    padding: "0px 16px",
    background: "#fff",
    fontWeight: "400"
  },
  accountCheck: {
    paddingTop: "10px"
  },
  terms: {
    paddingBottom: "10px"
  },
  passwordRules: {
    paddingBottom: "20px"
  },
  newPassword: {
    paddingTop: "20px"
  },
  imgContainer: {
    "& img": {
      width: "95%"
    },
    paddingTop: "30px",
    paddingBottom: "30px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "20px",
      paddingBottom: "20px",
    }

  },
  createListImage: {
    boxShadow:
      "0 5px 15px -8px rgba(" +
      hexToRgb(blackColor) +
      ", 0.24), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
  }
});

export default style;
