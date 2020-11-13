import {
  title,
  cardTitle,
  grayColor,
  primaryColor
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";

const style = theme => ({
  ...modalStyle(theme),
  logIn: {
    fontWeight: "400"
  },
  title: {
    ...title,
    marginBottom: "5px"
  },
  productImage: {
    [theme.breakpoints.down("xs")]: {
      maxHeight: "180px",
    },
    maxHeight: "250px",
    objectFit: "contain",
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
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    visibility: "visible",
    textAlign: "center",
    marginBottom: "3px"
  },
  reserveButton: {
    minWidth: "150px",
    marginTop: "12px"
  },
  customHeader: {
    textAlign: "center",
    position: "relative",
    marginBottom: "5px"
  },
  customCloseButton: {
    position: "absolute",
    right: "25px",
    top: "5px"
  },
  quantity: {
    paddingTop: "10px",
    textAlign: "center"
  },
  reserveContainer: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px"
    }
  },
  productCard: {
    marginBottom: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "25px",
    }
  },
  productDetails: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0px",
      paddingBottom: "0px"
    }
  },
  reservePopout: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "800px"
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "20px",
      marginRight: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "60px !important",
    }
  },
  reserveCard: {
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0px"
    }
  },
  centerText: {
    textAlign: "center",
  },
  desktop: {
    [theme.breakpoints.down("xs")]: {
      display: 'none'
    }
  },
  mobile: {
    [theme.breakpoints.up("sm")]: {
      display: 'none'
    }
  },
  label: {
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  labelQuantity: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.541176)",
    fontWeight: "normal",
    paddingTop: "10px"
  },
  formIntro: {
    fontSize: "1.2em",
    fontWeight: "400",
    color: primaryColor[0],
    lineHeight: "1.2",
    marginBottom: "15px",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2em",
      textAlign: "center"
    }
  },
  notesIntro: {
    fontSize: "1.2em",
    fontWeight: "400",
    color: primaryColor[0],
    lineHeight: "1.2",
    marginBottom: "3px",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2em",
      textAlign: "center"
    }
  },
  cardCategory: {
    color: "#6c757d",
    marginTop: "0px",
    marginBottom: "0px"
  },
  notes: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "400",
    color: "#495057"
  },
  spacer: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
  },
  retailerLink: {
    color: primaryColor[0],
    textDecoration: "underline"
  }
});

export default style;
