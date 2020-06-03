import {
  grayColor,
  primaryColor,
  container,
} from "assets/jss/material-kit-pro-react.js";

const sectionDetailsStyle = theme => ({
  container,
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
      width: "200px",
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
  actionButton: {
    margin: "0px",
    padding: "5px"
  },
  mobileDescription: {
    fontSize: "1.1em",
    fontWeight: "300"
  },
  quantities: {
    fontSize: "1.1em",
    fontWeight: "300",
    lineHeight: "2.2em"
  },
  addItemButton: {
    textAlign: "center",
    paddingTop: "20px"
  },
  brand: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    // textDecoration: "underline",
    display: "inline",
    margin: "0",
    padding: "0",
    color: grayColor[1],
    fontWeight: "400",
    fontSize: "1em",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    "&:hover, &:focus": {
      color: primaryColor[2] + "  !important"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.35em",
    }
  },
  undoButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    display: "inline",
    margin: "0",
    padding: "0",
  },
  price: {
    paddingTop: "15px",
    fontSize: "18px",
    fontWeight: "300",
    color: grayColor[22]
  },
});

export default sectionDetailsStyle;
