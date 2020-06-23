import {
  primaryColor,
  secondaryColor,
  greenColor,
  lightGreenColor,
  yellowOrangeColor,
  orangeRedColor,
  redColor,
  grayColor,
  title
} from "assets/jss/material-kit-pro-react.js";

const infoStyle = {
  infoArea: {
    maxWidth: "360px",
    margin: "0 auto",
    padding: "70px 0 30px"
  },
  iconWrapper: {
    float: "left",
    marginTop: "24px",
    marginRight: "10px"
  },
  blue: {
    color: primaryColor[0]
  },
  green: {
    color: greenColor[0]
  },
  lightGreen: {
    color: lightGreenColor[0]
  },
  yellow: {
    color: secondaryColor[0]
  },
  yellowOrange: {
    color: yellowOrangeColor[0]
  },
  orangeRed: {
    color: orangeRedColor[0]
  },
  red:{
    color: redColor[0]
  },
  gray: {
    color: grayColor[0]
  },
  icon: {
    width: "2.25rem",
    height: "2.25rem",
    fontSize: "2.25rem"
  },
  descriptionWrapper: {
    color: grayColor[0],
    overflow: "hidden"
  },
  title: {
    ...title,
    margin: "1.75rem 0 0.875rem !important",
    minHeight: "unset"
  },
  description: {
    color: grayColor[0],
    overflow: "hidden",
    marginTop: "0px",
    "& p": {
      color: grayColor[0],
      fontSize: "14px"
    }
  },
  iconWrapperVertical: {
    float: "none"
  },
  iconVertical: {
    width: "61px",
    height: "61px"
  }
};

export default infoStyle;
