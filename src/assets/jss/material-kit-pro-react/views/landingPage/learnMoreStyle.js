import {
  title
} from "assets/jss/material-kit-pro-react.js";

const createStyle = theme => ({
  container: {
    zIndex: "2",
    paddingTop: "35px",
    paddingBottom: "70px",
    // backgroundColor: "#e5e5e5"
  },
  subTitle: {
    ...title,
  },
  textCenter: {
    textAlign: "center"
  }
});

export default createStyle;
