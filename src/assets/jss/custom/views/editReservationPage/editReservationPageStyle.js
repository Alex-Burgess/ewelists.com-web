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
    minHeight: "93vh",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      minHeight: "92vh",
    }
  },
  title: {
    ...title,
    marginBottom: "0px",
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
