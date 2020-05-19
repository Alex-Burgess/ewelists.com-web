import {
  container,
  dangerColor
} from "assets/jss/material-kit-pro-react.js";

import contactUsStyles from "assets/jss/material-kit-pro-react/views/contactUsStyle.js";

const contactUsStyle = {
  ...contactUsStyles,
  container: {
    ...container,
    maxWidth: "600px !important"
  },
  parallax: {
    height: "40vh",
    minHeight: "40vh",
    maxHeight: "550px",
    display: "block"
  },
  contactContent: {
    paddingBottom: "80px",
    paddingTop: "40px"
  },
  title: {
    fontSize: "2.25rem",
    lineHeight: "1.5em",
    color: "#3C4858",
    minHeight: "32px",
    marginBottom: "25px"
  },
  subHeading: {
    fontSize: "14px",
    margin: "0 0 10px",
    color: "#3c4858"
  },
  textCenter: {
    textAlign: "center !important"
  },
  sent: {
    minHeight: "400px"
  },
  error: {
    // maxWidth: "280px",
    color: dangerColor[1],
    textAlign: "center"
  }
};

export default contactUsStyle;
