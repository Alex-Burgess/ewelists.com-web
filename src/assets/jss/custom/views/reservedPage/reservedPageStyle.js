import {
  container,
  main,
  title
} from "assets/jss/material-kit-pro-react.js";

const pageStyle = theme => ({
  container: {
    ...container,
    zIndex: "2",
    width: "60%",
    marginTop: "12px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  main: {
    ...main,
    paddingTop: "70px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
    }
  },
  title: {
    ...title,
    marginTop: "15px",
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
      marginTop: "0px",
      fontSize: "2rem"
    }
  },
  textCenter: {
    textAlign: "center !important"
  }
});

export default pageStyle;
