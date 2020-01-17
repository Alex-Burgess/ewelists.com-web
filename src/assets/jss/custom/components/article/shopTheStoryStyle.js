import {
  section,
  title,
  cardTitle,
  grayColor,
} from "assets/jss/material-kit-pro-react.js";

const blogPostPageStyle = theme => ({
  section: {
    ...section,
    paddingTop: "0",
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
  },
  title: {
    ...title,
    textAlign: "Center",
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.75rem"
    }
  },
  productImage: {
    [theme.breakpoints.down("xs")]: {
      height: "82vw",
      // maxHeight: "308px",
      maxHeight: "150px",
    },
    height: "18vw",
    maxHeight: "268px",
    objectFit: "contain",
  },
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    marginBottom: "0px !important"
  },
  description: {
    color: grayColor[0],
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "18px",
    color: grayColor[22]
  },
});

export default blogPostPageStyle;
