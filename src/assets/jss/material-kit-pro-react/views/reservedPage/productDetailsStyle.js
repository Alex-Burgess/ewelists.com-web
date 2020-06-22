import {
  cardTitle,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  leftGrid: {
    paddingRight: "3px"
  },
  rightGrid: {
    paddingLeft: "3px"
  },
  image: {
    [theme.breakpoints.down("xs")]: {
      maxHeight: "180px",
    },
    maxHeight: "175px",
    objectFit: "contain",
  },
  imageWrapper: {
    marginBottom: "5px"
  },
  detailsWrapper: {
    display: "flex",
    alignItems: "center"
  },
  brand: {
    ...cardTitle,
    textAlign: "left",
    marginBottom: "0px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      marginTop: "0px"
    }
  },
  description: {
    color: grayColor[0],
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    visibility: "visible",
    textAlign: "left",
    marginBottom: "3px",
    [theme.breakpoints.down("xs")]: {
      WebkitLineClamp: "3",
      fontSize: "13px"
    },
  },
  quantity: {
    fontSize: "0.85rem",
    color: "#6c757d"
  },
});

export default style;
