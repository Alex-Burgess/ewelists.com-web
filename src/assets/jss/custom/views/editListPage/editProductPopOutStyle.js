import {
  dangerColor,
  title,
  cardTitle,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.js";

const sectionStyle = theme => ({
  ...modalStyle(theme),
  ...buttonGroup,
  centerText: {
    textAlign: "Center",
  },
  error: {
    color: dangerColor[1]
  },
  title: {
    ...title,
    marginBottom: 0
  },
  mainPrice: {
    margin: "10px 0px 25px"
  },
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    }
  },
  description: {
    color: grayColor[0],
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  productImage: {
    [theme.breakpoints.down("xs")]: {
      height: "50vw",
      maxHeight: "276.59px",
    },
    height: "28vw",
    // maxHeight: "180.05px",
    objectFit: "contain",
  },
  productImageContainer:{
    position: "relative",
    padding: "0",
    zIndex: "1",
    "& a": {
      display: "block"
    },
    textAlign: "center !important"
  },
  textCenter: {
    textAlign: "center !important"
  },
  errorContainer: {
    paddingTop: "20px",
    fontSize: "14px"
  }
});

export default sectionStyle;