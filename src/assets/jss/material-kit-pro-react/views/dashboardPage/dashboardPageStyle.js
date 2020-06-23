import {
  main
} from "assets/jss/material-kit-pro-react.js";

const style = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  flexer: {
    background: "white",
    flexGrow: 1
  },
  main: {
    ...main
  }
};

export default style;
