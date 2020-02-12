import {
  grayColor,
  container,
  title
} from "assets/jss/material-kit-pro-react.js";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";
import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.js";

const sectionDetailsStyle = theme => ({
  container,
  ...customSelectStyle,
  ...imagesStyles,
  section: {
    paddingBottom: "40",
    paddingTop: "20px",
    paddingLeft: "10px",
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
  lessGridPadding: {
    paddingLeft: "8px",
    paddingRight: "8px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "15px",
      paddingRight: "15px",
    }
  },
  cogMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      paddingLeft: "5px",
      paddingRight: "15px",
    }
  },
  cogDesktop: {
    display: "block",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    }
  },
  title: {
    ...title,
    textAlign: "Left",
    marginTop: "30px",
    marginBottom: "10px",
    fontSize: "2.8rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem"
    },
    [theme.breakpoints.down("xs")]: {
        // textAlign: "Center",
        fontSize: "1.75rem",
        marginTop: "10px",
        marginBottom: "10px",
    }
  },
  description: {
    paddingBottom: "10px",
    minHeight: "48px",
    color: grayColor[0],
    [theme.breakpoints.down("xs")]: {
        // textAlign: "Center",
    }
  },
  event: {
    color: grayColor[0],
    [theme.breakpoints.down("xs")]: {
        // textAlign: "Center",
    }
  },
  listImage: {
    maxHeight: "233.188px",
    maxWidth: "340px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "270px",
      maxHeight: "210px",
    },
    [theme.breakpoints.down("xs")]: {
      // marginTop: "10px",
      maxWidth: "320px",
      maxHeight: "225px",
    }
  },
  customProfile: {
    marginBottom: "5px",
    [theme.breakpoints.down("xs")]: {
      // marginTop: "10px",
      marginTop: "20px",
      marginBottom: "0px",
    }
  },
  centerMobileText: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "Center",
    }
  },
  shareText: {
    textTransform: "capitalize",
    fontSize: "14px"
  }
});

export default sectionDetailsStyle;
