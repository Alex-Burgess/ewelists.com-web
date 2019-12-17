import {
  container,
  title,
  whiteColor,
  blackColor,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";

const createStyle = {
  container: {
    color: whiteColor,
    ...container,
    zIndex: "2"
  },
  description: {
    color: grayColor[0],
    fontSize: "20px"
  },
  section: {
    paddingTop: "150px",
    paddingBottom: "70px",
    textAlign: "left"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: blackColor,
    textDecoration: "none"
  },
  sheepContainer: {
    "& img": {
      width: "100%"
    }
  },
  infoArea: {
    maxWidth: "none",
    margin: "0 auto",
    padding: "10px 0 0px"
  }
};

export default createStyle;
