import {
  container,
  title,
  grayColor,
  whiteColor
} from "assets/jss/material-kit-pro-react.js";

const productStyle = {
  container: {
    color: whiteColor,
    ...container,
    zIndex: "2"
  },
  section: {
    paddingTop: "20px",
    paddingRight: "0px",
    paddingBottom: "70px",
    paddingLeft: "0px",
    textAlign: "center"
  },
  sectionGray: {
    background: grayColor[14]
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: grayColor[0],
    fontSize: "16px"
  },
  infoArea: {
    padding: "0px 0 30px"
  }
};

export default productStyle;
