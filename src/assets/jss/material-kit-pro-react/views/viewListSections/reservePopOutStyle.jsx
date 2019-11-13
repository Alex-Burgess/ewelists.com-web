/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  dangerColor,
  title,
  cardTitle,
  grayColor,
  whiteColor,
} from "assets/jss/material-kit-pro-react.jsx";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.jsx";

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
      maxHeight: "276.59px",
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
  remaining: {
    textAlign: "center",
    paddingTop: "20px"
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
  }
});

export default sectionStyle;
