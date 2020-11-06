import {
  container,
  mrAuto,
  mlAuto,
  grayColor,
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
      maxHeight: "100%",
      marginLeft: "auto",
      marginRight: "auto"
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
      fontSize: "1.15em",
    }
  },
  errorContainer: {
    textAlign: "center !important",
    minHeight: "50px",
    width: "60%",
    marginLeft: "Auto",
    marginRight: "Auto",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      minHeight: "0px",
    }
  },
  messageContainer: {
    color: successColor[1],
    textAlign: "center !important"
  },
  results: {
    minHeight: "390px",
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    }
  },
  price: {
    paddingTop: "5px",
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
      fontSize: "1.45em",
    }
  },
  tdQuantity: {
    minWidth: "130px",
    maxWidth: "250px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      minWidth: "130px",
      // maxWidth: "unset",
    }
  },
  reserveButton: {
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  quantityContainer: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: "10px"
    }
  }
});

export default style;
