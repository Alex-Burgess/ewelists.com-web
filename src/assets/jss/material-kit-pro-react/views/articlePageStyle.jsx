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
  container,
  title,
  main,
  grayColor,
  mainRaised,
  cardTitle,
  section
} from "assets/jss/material-kit-pro-react.jsx";

const blogPostPageStyle = theme => ({
  container: {
    ...container,
    zIndex: "2"
  },
  section: {
    ...section,
    paddingTop: "0",
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  },
  sectionSimilarLists: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0"
  },
  textCenter: {
    textAlign: "center"
  },
  title: {
    ...title,
    textAlign: "Center",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.75rem"
    }
  },
  subtitle: {
    paddingBottom: "30px",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.5rem",
        textAlign: "Center"
    }
  },
  main: {
    ...main,
    ...mainRaised
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
  articleBg: {
    height: "40vh"
  },
  content: {
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
      [theme.breakpoints.down("xs")]: {
          fontSize: "1.1rem",
          lineHeight: "1.4em"
      }
    }
  },
  description: {
    color: grayColor[0],
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important"
  },
  cardDescription: {
    color: grayColor[0],
    textAlign: "center"
  },
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "18px",
    color: grayColor[22]
  },
  productImage: {
    [theme.breakpoints.down("xs")]: {
      height: "82vw",
      maxHeight: "308px",
    },
    height: "18vw",
    maxHeight: "268px",
    objectFit: "contain",
  },
  productDetails: {
    height: "110px",
  }
});

export default blogPostPageStyle;
