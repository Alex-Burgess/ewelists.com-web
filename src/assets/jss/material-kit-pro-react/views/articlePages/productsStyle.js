import {
  section,
  title,
  cardTitle,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  section: {
    ...section,
    paddingTop: "0",
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    marginLeft: "-80px",
    marginRight: "-80px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
      marginRight: "0"
    }
  },
  title: {
    ...title,
    textAlign: "Center",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.75rem"
    }
  },
  productImage: {
    height: "18vw",
    maxHeight: "268px",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      height: "82vw",
      // maxHeight: "308px",
      maxHeight: "130px",
    }
  },
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important",
    fontSize: "1rem"
  },
  description: {
    color: grayColor[0],
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    marginBottom: "5px",
    height: "50px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px"
    },
  },
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "18px",
    color: grayColor[22]
  },
  customProduct: {
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
    }
  },
  customHeader: {
    height: "320px",
    [theme.breakpoints.down("xs")]: {
      height: "245px"
    }
  },
  amazonButton: {
    backgroundColor: "#FF9900",
    width: "100%"
  },
  button: {
    width: "100%"
  }

});

export default style;
