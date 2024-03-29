import {
  primaryColor,
  dangerColor,
  successColor,
  whiteColor,
  grayColor,
  title,
  defaultFont
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderBottomColor: grayColor[11] + " !important",
      borderBottomWidth: "1px !important"
    },
    "&:after": {
      borderBottomColor: primaryColor[0]
    }
  },
  underlineError: {
    "&:after": {
      borderBottomColor: dangerColor[0]
    }
  },
  underlineSuccess: {
    "&:after": {
      borderBottomColor: successColor[0]
    }
  },
  labelRoot: {
    ...defaultFont,
    color: grayColor[12] + " !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px"
    }
  },
  labelRootError: {
    color: dangerColor[0] + " !important"
  },
  labelRootSuccess: {
    color: successColor[0] + " !important"
  },
  feedback: {
    position: "absolute",
    bottom: "4px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none"
  },
  formControl: {
    margin: "0 0 0px 0",
    paddingTop: "0px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[13]
    }
  },
  whiteUnderline: {
    "&:hover:not($disabled):before,&:before": {
      borderBottomColor: whiteColor
    },
    "&:after": {
      borderBottomColor: whiteColor
    }
  },
  input: {
    color: grayColor[13],
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1"
    },
    "&::placeholder": {
      color: grayColor[12]
    }
  },
  whiteInput: {
    "&,&::placeholder": {
      color: whiteColor,
      opacity: "1"
    }
  },
  title: {
    ...title,
    "&,&::placeholder": {
      paddingTop: "0px",
      paddingBottom: "5px",
      marginBottom: "0px",
      fontSize: "2.8rem",
      [theme.breakpoints.down("sm")]: {
          fontSize: "2rem"
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
        textAlign: "Center",
        fontSize: "1.75rem"
      }
    }
  },
  smallTitle: {
    "&,&::placeholder": {
      fontSize: "1.5rem"
    }
  },
  description: {
    "&,&::placeholder": {
      // fontSize: "1.188rem"
      fontSize: "1rem"
    }
  },
  smallDescription: {
    "&,&::placeholder": {
      fontSize: "0.9rem"
    }
  }
});

export default style;
