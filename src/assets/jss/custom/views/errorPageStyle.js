import {
  container,
  whiteColor,
  title
} from "assets/jss/material-kit-pro-react.js";

const errorPageCustomStyle = {
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
    marginTop: "75px"
  },
  title: {
    ...title,
    fontSize: "4em",
    fontWeight: "700"
  },
  subTitle: {
    fontSize: "2.25rem",
    marginTop: "0",
    marginBottom: "20px"
  }
};

export default errorPageCustomStyle;
