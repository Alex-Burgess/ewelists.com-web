import {
  cardTitle,
  grayColor,
  dangerColor
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";

const style = theme => ({
  ...modalStyle(theme),
  productImage: {
    maxWidth: "180px",
    maxHeight: "180px",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "150px",
      maxHeight: "150px"
    }
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
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    }
  },
  description: {
    color: grayColor[0],
    textAlign: "center",
    overflow: "hidden",
    paddingBottom: "20px"
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "1.1em",
    fontWeight: "300",
  },
  listText: {
    paddingLeft: "40px !important",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "8px !important",
    }
  },
  successButton: {
    opacity: "1"
  },
  progressWrapper: {
    position: 'relative',
  },
  fabProgress: {
    color: grayColor[0],
    position: 'absolute',
    top: "0px",
    left: "4px",
    zIndex: 1,
  },
  buttonCell: {
    textAlign: "center",
    width: "75px"
  },
  addError: {
    color: dangerColor[1]
  }
});

export default style;
