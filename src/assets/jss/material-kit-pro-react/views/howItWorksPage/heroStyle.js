import {
  title,
  primaryColor,
  whiteColor
} from "assets/jss/material-kit-pro-react.js";

const heroStyle = theme => ({
  container: {
    zIndex: "2",
    paddingTop: "85px",
    paddingBottom: "30px",
    backgroundColor: primaryColor[0]
  },
  title: {
    ...title,
    color: whiteColor,
    fontSize: "2.4rem"
  },
  subTitle: {
    ...title,
    color: whiteColor
  },
  textCenter: {
    textAlign: "center"
  },
  details: {
    paddingLeft: "35px",
    paddingRight: "35px"
  }
});

export default heroStyle;
