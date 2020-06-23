import {
  primaryColor,
  secondaryColor,
  whiteColor,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const navPillsStyle = theme => ({
  root: {
    marginTop: "20px",
    paddingLeft: "0",
    marginBottom: "0",
    overflow: "visible !important"
  },
  flexContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap"
    }
  },
  displayNone: {
    display: "none !important"
  },
  fixed: {
    overflow: "visible !important"
  },
  horizontalDisplay: {
    display: "block"
  },
  pills: {
    float: "left",
    position: "relative",
    display: "block",
    borderRadius: "30px",
    minWidth: "100px",
    textAlign: "center",
    transition: "all .3s",
    padding: "10px 15px",
    color: grayColor[15],
    height: "auto",
    opacity: "1",
    maxWidth: "100%",
    margin: "0 5px",
    minHeight: "unset",
    lineHeight: "24px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    // Custom Style for mobile edit nav bar
    [theme.breakpoints.down("xs")]: {
      maxWidth: "95px",
      minWidth: "95px",
      padding: "10px 5px",
    }
  },
  pillsWithIcons: {
    borderRadius: "4px"
  },
  tabIcon: {
    width: "30px",
    height: "30px",
    display: "block",
    margin: "15px 0 !important"
  },
  horizontalPills: {
    width: "100%",
    float: "none !important",
    "& + button": {
      margin: "10px 0"
    }
  },
  contentWrapper: {
    marginTop: "20px",
    "& .react-swipeable-view-container > div > div": {
      paddingLeft: "15px",
      paddingRight: "15px"
    }
  },
  primary: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: primaryColor[2],
    }
  },
  secondary: {
    "&,&:hover": {
      color: whiteColor,
      backgroundColor: secondaryColor[0],
    }
  },
  notActive:{
    color: "inherit",
    backgroundColor: "transparent",
    "&$primary": {
      "&:hover": {
        color: whiteColor,
        backgroundColor: primaryColor[1],
      }
    },
    "&$secondary": {
      "&:hover": {
        color: whiteColor,
        backgroundColor: secondaryColor[2],
      }
    }
  },
  active:{
    "&$primary": {
      "&,&:hover": {
        color: whiteColor,
        backgroundColor: primaryColor[2]
      }
    },
    "&$secondary": {
      "&,&:hover": {
        color: whiteColor,
        backgroundColor: secondaryColor[0],
      }
    },
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center"
  },
  tabLabelContainer: {
    padding: "unset !important"
  }
});

export default navPillsStyle;
