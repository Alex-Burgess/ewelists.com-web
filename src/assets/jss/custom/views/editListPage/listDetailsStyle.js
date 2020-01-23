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
        textAlign: "Center",
        fontSize: "1.75rem",
        // marginTop: "30px",
        marginTop: "10px",
        marginBottom: "10px",
    }
  },
  description: {
    paddingBottom: "10px",
    minHeight: "48px"
  },
  descriptionEditWrapper: {
    paddingTop: "10px",
  },
  label: {
    paddingTop: "25px",
    paddingBottom: "5px",
    color: grayColor[12],
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0",
      paddingBottom: "10px",
      textAlign: "Center",
    }
  },
  labelEdit: {
    paddingTop: "10px",
    paddingBottom: "0",
    color: grayColor[12],
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0",
      paddingBottom: "0",
    }
  },
  labelWrapper: {
    [theme.breakpoints.down("xs")]: {
      display: "inline-flex",
    }
  },
  labelValue: {
    display: "inline-flex",
    maxWidth: "125px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "7px"
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
      maxHeight: "200px",
    }
  },
  customProfile: {
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
  viewButtons: {
    paddingTop: "20px",
    // paddingLeft: "22px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0",
      paddingLeft: "0",
      textAlign: "Center",
    }
  },
  editButtons: {
    paddingTop: "32px",
    paddingLeft: "22px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0",
      paddingLeft: "0",
      textAlign: "Center",
    }
  },
  occasionSelect: {
    paddingTop: "0px",
    minWidth: "100px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "5px"
    }
  },
  dateSelect: {
    paddingTop: "0px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "5px"
    }
  },
  customButton: {
    [theme.breakpoints.down("sm")]: {
      padding: "12px 15px",
    }
  }
});

export default sectionDetailsStyle;
