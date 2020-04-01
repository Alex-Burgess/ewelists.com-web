import {
  section,
  container,
  cardTitle,
  mlAuto,
  mrAuto,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

import customCheckboxRadioSwitch from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const styles = theme => ({
  ...customCheckboxRadioSwitch,
  ...tooltipsStyle,
  checkRoot: {
    padding: "14px",
    "&:hover": {
      backgroundColor: "unset"
    }
  },
  mlAuto,
  mrAuto,
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.125rem"
    }
  },
  container: {
    ...container,
    [theme.breakpoints.up("md")]: {
      paddingLeft: "0px",
      paddingRight: "0px",
      maxWidth: "1000px"
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "5px",
      paddingRight: "5px",
    }
  },
  description: {
    color: grayColor[0],
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px"
    },
  },
  section: {
    ...section,
    padding: "20px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0px",
    }
  },
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "16px",
    color: grayColor[22]
  },
  pullRight: {
    float: "right"
  },
  justifyContentBetween: {
    WebkitBoxPack: "justify!important",
    justifyContent: "space-between !important"
  },
  customExpandPanel: {
    maxHeight: "273px",
    overflowY: "scroll",
    "&  label": {
      display: "block"
    }
  },
  refineButton: {
    margin: "-3px 0"
  },
  cardBodyRefine: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  textLeft: {
    textAlign: "left"
  },
  productImage: {
    [theme.breakpoints.down("xs")]: {
      height: "82vw",
      maxHeight: "276.59px",
      minWidth: "295px"
    },
    height: "18vw",
    maxHeight: "180.05px",
    objectFit: "contain",
  },
  productDetails: {
    height: "110px",
  },
  filterButtonContainer: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  },
  filterButton: {
    width: "280px"
  },
  filterCard: {
    marginBottom: "0px",
    marginTop: "0px"
  },
  footer: {
    display: "block"
  },
  textCenter: {
    textAlign: "center"
  },
  reserveButton: {
    minWidth: "192px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "123px",
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: "285px",
      width: "100%",
      marginBottom: "30px"
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
  customProduct: {
    marginTop: "15px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0px",
    }
  },
  cardCategory: {
    color: "#6c757d",
    marginTop: "0px",
    marginBottom: "0px"
  },
  remaining: {
    minHeight: "18px"
  }
});

export default styles;
