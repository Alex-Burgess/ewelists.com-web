import {
  description,
  cardTitle,
  mlAuto,
  mrAuto,
} from "assets/jss/material-kit-pro-react.js";

const blogPostPageStyle = theme => ({
  mlAuto,
  mrAuto,
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "15px 0"
  },
  cardTitle,
  cardCategory: {
    fontSize: "0.75rem",
    marginBottom: "0",
    marginTop: "10px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "8px",
      lineHeight: "0"
    }
  },
  description1: {
    ...description,
    lineHeight: "1.313rem"
  },
  leftImage: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    height: "18vw",
    maxHeight: "202.47px",
    objectFit: "cover"
  },
  leftImageMobile: {
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "230.28px",
      objectFit: "cover",
      display: "inline"
    },
    display: "none"
  },
  rightImage: {
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "230.28px",
      objectFit: "cover",
      display: "inline"
    },
    height: "18vw",
    maxHeight: "202.47px",
    objectFit: "cover"
  }
});

export default blogPostPageStyle;
