import {
  title,
  primaryColor
} from "assets/jss/material-kit-pro-react.js";

const createStyle = theme => ({
  container: {
    zIndex: "2",
    paddingTop: "45px",
    paddingBottom: "50px",
    backgroundColor: primaryColor[1]
  },
  subTitle: {
    ...title,
  },
  textCenter: {
    textAlign: "center"
  }
});

export default createStyle;
