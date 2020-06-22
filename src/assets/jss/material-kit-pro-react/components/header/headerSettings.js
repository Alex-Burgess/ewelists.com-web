import {
  title,
  whiteColor
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  arrow: {
    marginLeft: "10px",
  },
  title: {
    ...title,
    marginTop: "0px",
    marginBottom: "0px",
    color: whiteColor,
    textAlign: "center"
  },
  titleWrapper: {
    width: "280px",
    textAlign: "center"
  }
});

export default style;
