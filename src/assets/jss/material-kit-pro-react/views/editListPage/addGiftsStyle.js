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
      width: "100%",
      maxHeight: "100%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  customFormControl: {
    paddingTop: "14px",
    minWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "272px",
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
      fontSize: "14px",
    }
  },
  errorContainer: {
    textAlign: "center !important",
    minHeight: "0px",
    width: "60%",
    marginLeft: "Auto",
    marginRight: "Auto",
    [theme.breakpoints.down("xs")]: {
      width: "80%"
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
    paddingBottom: "10px",
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
      fontSize: "15px",
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
  },
  switchButton: {
    textAlign: "center",
    paddingTop: "30px"
  },
  description: {
    color: grayColor[0],
    fontWeight: "400",
    fontSize: "15px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
      marginBottom: "0px"
    },
  },
  searchInput: {
    backgroundColor: "#f2f2f2",
    boxShadow: "none",
    width: "600px",
    display: "inline-flex",
    // maxWidth: "600px",
    "&:focus-within": {
      border: "1px solid black"
    },
    [theme.breakpoints.down("sm")]: {
      width: "550px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      width: "100%"
    }
  },
  searchButton: {
    height: "46px",
    margin: "0px 0px 0px 3px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px"
    }
  },
  notes: {
    marginTop: "30px"
  },
  searchResult: {
    border: "1px solid #d3d3d3",
    padding: "10px 0px"
  }
});

export default style;
