import {
  container,
  dangerColor,
  whiteColor,
  grayColor,
  title
} from "assets/jss/material-kit-pro-react.js";

const contactPageStyle = theme => ({
  title,
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
    flexGrow: 1,
  },
  container: {
    ...container,
    marginTop: "75px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "35px"
    }
  },
  textCenter: {
    textAlign: "center"
  },
  customCard: {
    paddingBottom: "20px",
    border: "1px solid #ddd",
    boxShadow: "none",
    minHeight: "548px",
    [theme.breakpoints.down("xs")]: {
      border: "none",
      minHeight: "none"
    }
  },
  sent: {
    paddingTop: "60px",
    fontSize: "16px",
    color: grayColor[0]
  },
  error: {
    color: dangerColor[1],
    textAlign: "center"
  }
});

export default contactPageStyle;
