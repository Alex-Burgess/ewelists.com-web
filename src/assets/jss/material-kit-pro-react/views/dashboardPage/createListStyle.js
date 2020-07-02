import {
  cardTitle,
  grayColor,
  successColor,
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.js";

const style = theme => ({
  cardTitle,
  ...modalStyle(theme),
  ...customSelectStyle,
  modalCustom: {
    marginTop: "145px !important",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px !important",
    }
  },
  textCenter: {
    textAlign: "Center",
  },
  label: {
    paddingTop: "10px",
    color: grayColor[12],
    fontSize: "14px"
  },
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    position: 'relative',
    margin: "0 auto"
  },
  buttonSuccess: {
    backgroundColor: successColor[500],
    '&:hover': {
      backgroundColor: successColor[700],
    },
  },
  buttonProgress: {
    color: successColor[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  createFormControl: {
    paddingTop: "10px"
  },
  dateField: {
    paddingTop: "10px"
  },
  errorContainer: {
    margin: "0 auto",
    maxWidth: "280px",
    textAlign: "center"
  },
  selectGrid: {
    paddingTop: "20px",
    paddingBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0px",
      paddingBottom: "0px"
    },
  },
  occasionGrid: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: "15px",
    }
  }
});

export default style;
