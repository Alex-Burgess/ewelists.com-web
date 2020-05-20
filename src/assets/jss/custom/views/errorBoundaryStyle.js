import {
  main,
  container
} from "assets/jss/material-kit-pro-react.js";

const landingPageStyle = {
  main: {
    ...main
  },
  section: {
    paddingTop: "70px",
    paddingBottom: "20px",
    // textAlign: "left"
  },
  container: {
    ...container,
    zIndex: "2"
  },
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  flexer: {
    background: "white",
    flexGrow: 1
  },
};

export default landingPageStyle;
