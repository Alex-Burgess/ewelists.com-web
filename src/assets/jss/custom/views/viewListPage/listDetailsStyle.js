import {
  container,
  title,
} from "assets/jss/material-kit-pro-react.js";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";

const sectionDetailsStyle = theme => ({
  container,
  ...imagesStyles,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "380px",
      maxHeight: "260px",
      objectFit: "cover",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "320px",
        maxHeight: "230px",
      }
    }
  },
  name: {
    marginTop: "-140px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "-120px"
    }
  },
  title: {
    ...title,
    marginTop: "30px",
    marginBottom: "10px",
    fontSize: "2.2rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem"
    },
    [theme.breakpoints.down("xs")]: {
        textAlign: "Center",
        fontSize: "1.75rem"
    }
  },
  date: {
    paddingBottom: "20px",
    paddingTop: "0px",
    "& svg": {
      position: "relative",
      top: "8px"
    }
  },
});

export default sectionDetailsStyle;
