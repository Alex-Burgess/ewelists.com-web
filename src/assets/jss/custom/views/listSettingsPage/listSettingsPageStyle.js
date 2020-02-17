import {
  container,
  title,
  main
} from "assets/jss/material-kit-pro-react.js";

import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.js";

const pageStyle = theme => ({
  ...customSelectStyle,
  container: {
    ...container,
    zIndex: "2",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    }
  },
  main: {
    ...main,
    paddingTop: "70px",
    minHeight: "93vh",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      minHeight: "92vh",
    }
  },
  title: {
    ...title,
    marginBottom: "0px"
  },
  textCenter: {
    textAlign: "center !important"
  },
  sectionButtons: {
    textAlign: "right !important",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  mobileButtons: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "inline",
      textAlign: "right"
    }
  },
  alignButtonToBottom: {
    marginBottom: "-65px"
  },
  sectionHeading: {
    marginTop: "30px",
    marginBottom: "1px"
  },
  sectionRule: {
    marginTop: "0px",
    marginBottom: "20px"
  },
  formControl: {
    paddingTop: "1px",
    marginBottom: "25px"
  },
  inputCustom: {
    fontWeight: "300",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px"
    }
  },
  flexer: {
    background: "white",
    flexGrow: 1
  },
  spacer: {
    minHeight: "50px"
  },
  icon: {
    fontSize: "2.9rem",
    verticalAlign: "bottom",
    color: "grey"
  },
  mobileHide: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  backButton: {
    paddingLeft: "0px",
    paddingBottom: "0px"
  },
  listImage: {
    maxHeight: "160px",
    maxWidth: "230px",
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
    marginTop: "0px",
    marginBottom: "5px",
    [theme.breakpoints.down("xs")]: {
      // marginTop: "10px",
      marginTop: "20px",
      marginBottom: "0px",
    }
  },
  dateLabel: {
    marginTop: "10px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    }
  },
  occasionLabel: {
    marginTop: "25px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    }
  },
  error: {
    textAlign: "center",
    color: "red"
  }
});

export default pageStyle;
