import {
  container,
  title,
  whiteColor,
  blackColor,
  grayColor,
  coloredShadow,
  description,
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  coloredShadow,
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
    paddingTop: "70px",
    paddingBottom: "20px",
    textAlign: "left"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: blackColor,
    textDecoration: "none",
    fontSize: "2.3125rem"
  },
  cardCategory: {
    marginTop: "10px",
    "& svg": {
      position: "relative",
      top: "8px"
    }
  },
  cardDescription: {
    ...description
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  listImage: {
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "211.44px",
    },
    height: "16vw",
    maxHeight: "174.5px",
    objectFit: "cover"
  },
  customButton: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  centerButton: {
    textAlign: "center"
  },
  addList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  createText: {
    ...description
  },
});

export default style;
