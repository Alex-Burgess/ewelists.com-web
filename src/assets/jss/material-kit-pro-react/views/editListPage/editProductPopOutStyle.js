import {
  title,
  cardTitle,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.js";

const style = theme => ({
  ...modalStyle(theme),
  ...buttonGroup,
  centerText: {
    textAlign: "Center",
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
    width: "100%",
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
  },
  quantity: {
    fontSize: "0.85rem",
    color: "#6c757d",
    textAlign: "center"
  },
  labelQuantity: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.541176)",
    fontWeight: "normal",
    paddingTop: "10px"
  },
});

export default style;
