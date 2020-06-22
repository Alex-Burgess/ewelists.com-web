import {
  container,
  mrAuto,
  mlAuto,
  grayColor,
  dangerColor,
  successColor,
  primaryColor
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  container,
  mrAuto,
  mlAuto,
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    "& img": {
      width: "100%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "160px",
      maxHeight: "100%"
    }
  },
  customFormControl: {
    paddingTop: "14px",
    minWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "310px",
    }
  },
  customQuanityFormControl: {
    width: "80px"
  },
  textCenter: {
    textAlign: "center !important"
  },
  rightText: {
    textAlign: "Right",
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.9em",
    fontWeight: "300",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.85em",
    }
  },
  errorContainer: {
    color: dangerColor[1],
    textAlign: "center !important",
    minHeight: "50px",
    width: "60%",
    marginLeft: "Auto",
    marginRight: "Auto",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      minHeight: "20px",
    }
  },
  messageContainer: {
    color: successColor[1],
    textAlign: "center !important"
  },
  results: {
    minHeight: "390px",
    marginTop: "30px"
  },
  price: {
    paddingTop: "15px",
    fontSize: "18px",
    fontWeight: "300",
    color: grayColor[22]
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
    fontSize: "1.2em",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    "&:hover, &:focus": {
      color: primaryColor[2] + "  !important"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.05em",
    }
  },
  tdQuantity: {
    minWidth: "130px",
    [theme.breakpoints.down("md")]: {
      minWidth: "130px"
    }
  }
});

export default style;
