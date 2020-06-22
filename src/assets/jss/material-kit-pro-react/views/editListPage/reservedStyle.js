import {
  grayColor,
  container,
  cardTitle,
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  container,
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important",
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    margin: "auto",
    "& img": {
      width: "100%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100px",
      maxHeight: "100%",
    }
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  description: {
    maxWidth: "150px"
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.2em"
  },
  tdNameAnchor: {
    color: grayColor[1]
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300"
  },
  tdNumber: {
    // textAlign: "right",
    minWidth: "100px",
    fontWeight: "300",
    fontSize: "1.125em !important"
  },
  tdNumberSmall: {
    marginRight: "3px"
  },
  tdState: {
    minWidth: "110px"
  },
  actionButton: {
    margin: "0px",
    padding: "5px"
  },
  mobileMessage: {
    fontSize: "1.1em",
    fontWeight: "300"
  },
  quantities: {
    fontSize: "1.1em",
    fontWeight: "300"
  },
  messageContainer: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  loading: {
    paddingTop: "20px",
    width: "8%",
    margin: "0 auto"
  }
});

export default style;
