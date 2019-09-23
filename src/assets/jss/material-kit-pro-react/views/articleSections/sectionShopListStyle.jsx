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
  grayColor,
  title,
  section,
  container,
  cardTitle,
} from "assets/jss/material-kit-pro-react.jsx";

const SectionShopListStyle = theme => ({
  title: {
    ...title,
    textAlign: "Center"
    // color: whiteColor
  },
  container: {
    ...container
  },
  section: {
    ...section,
    paddingTop: "0",
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  },
  description: {
    color: grayColor[0]
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
  }
});

export default SectionShopListStyle;
