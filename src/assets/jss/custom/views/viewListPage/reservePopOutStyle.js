import {
  dangerColor,
  title,
  cardTitle,
  grayColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";

const sectionStyle = theme => ({
  ...modalStyle(theme),
  centerText: {
    textAlign: "Center",
  },
  error: {
    color: dangerColor[1]
  },
  title: {
    ...title,
    paddingTop: "10px",
    marginBottom: 0
  },
  mainPrice: {
    margin: "10px 0px 25px"
  },
  productImage: {
    [theme.breakpoints.down("xs")]: {
      // height: "82vw",
      maxHeight: "220px",
    },
    // height: "18vw",
    maxHeight: "400px",
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
    textAlign: "center"
  },
  purchase: {
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  textCenter: {
    textAlign: "center",
  },
  reserveButton: {
    minWidth: "150px",
    // width: "100%",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   minWidth: "123px",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   minWidth: "285px",
    //   width: "100%",
    //   marginBottom: "30px"
    // }
  },
  quantity: {
    paddingTop: "10px"
  },
  reserveContainer: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px"
    }
  },
  productCard: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "25px",
      marginBottom: "0px"
    }
  },
  productDetails: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0px",
      paddingBottom: "0px"
    }
  },
  reservePopout: {
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
  stepOne: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px"
    }
  },
  mobileCenter: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    }
  },
  buttonLink: {
    color: whiteColor,
    "&:hover": {
      color: whiteColor,
    }
  },
  label: {
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  extraPadding: {
    paddingTop: "10px",
  },
  labelQuantity: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.541176)",
    fontWeight: "normal",
    paddingTop: "10px"
  }
});

export default sectionStyle;
