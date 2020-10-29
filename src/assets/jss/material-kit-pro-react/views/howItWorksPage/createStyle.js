import {
  title,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const createStyle = theme => ({
  container: {
    zIndex: "2",
    paddingTop: "45px",
    paddingBottom: "50px",
    backgroundColor: grayColor[14]
  },
  subTitle: {
    ...title,
  },
  textCenter: {
    textAlign: "center"
  }
});

export default createStyle;
