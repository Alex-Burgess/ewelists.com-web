import {
  grayColor,
  primaryColor,
  secondaryColor,
  successColor,
  warningColor,
  dangerColor,
  blackColor,
  whiteColor,
  facebookColor,
  googleColor,
  messengerColor,
  whatsappColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const buttonStyle = {
  button: {
    minHeight: "auto",
    minWidth: "auto",
    backgroundColor: grayColor[0],
    color: whiteColor,

    border: "none",
    borderRadius: "3px",
    position: "relative",
    padding: "12px 30px",
    margin: ".3125rem 1px",
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    "&:hover,&:focus": {
      color: whiteColor,
      backgroundColor: grayColor[0],
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      display: "inline-block",
      top: "0",
      marginTop: "-1em",
      marginBottom: "-1em",
      fontSize: "1.1rem",
      marginRight: "10px",
      verticalAlign: "middle"
    },
    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      width: "18px",
      height: "18px",
      marginRight: "4px",
      verticalAlign: "middle"
    },
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginTop: "0px",
        marginRight: "0px",
        position: "absolute",
        width: "100%",
        transform: "none",
        left: "0px",
        top: "0px",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px"
      }
    }
  },
  fullWidth: {
    width: "100%"
  },
  primary: {
    backgroundColor: primaryColor[0],
    "&:hover,&:focus": {
      backgroundColor: primaryColor[2],
    }
  },
  primary2: {
    backgroundColor: whiteColor,
    color: primaryColor[0],
    border: "solid 2px " + primaryColor[0],
    padding: "10px 30px",
    "&:hover,&:focus": {
      backgroundColor: primaryColor[2],
      color: whiteColor,
      border: "solid 2px " + primaryColor[2],
    }
  },
  messenger: {
    backgroundColor: messengerColor,
    "&:hover,&:focus": {
      backgroundColor: messengerColor
    }
  },
  whatsapp: {
    backgroundColor: whatsappColor,
    "&:hover,&:focus": {
      backgroundColor: whatsappColor
    }
  },
  secondary: {
    color: "rgba(" + hexToRgb(blackColor) + ",.87)",
    backgroundColor: secondaryColor[0],
    "&:hover,&:focus": {
      color: "rgba(" + hexToRgb(blackColor) + ",.87)",
      backgroundColor: secondaryColor[2]
    }
  },
  success: {
    backgroundColor: successColor[0],
    "&:hover,&:focus": {
      backgroundColor: successColor[0]
    }
  },
  warning: {
    backgroundColor: warningColor[0],
    "&:hover,&:focus": {
      backgroundColor: warningColor[0]
    }
  },
  danger: {
    backgroundColor: dangerColor[0],
    "&:hover,&:focus": {
      backgroundColor: dangerColor[0]
    }
  },
  white: {
    "&,&:focus,&:hover": {
      backgroundColor: whiteColor,
      color: grayColor[0]
    }
  },
  facebook: {
    backgroundColor: facebookColor,
    color: whiteColor,
    "&:hover,&:focus": {
      backgroundColor: facebookColor,
      color: whiteColor
    }
  },
  google: {
    backgroundColor: googleColor,
    color: whiteColor,
    "&:hover,&:focus": {
      backgroundColor: googleColor,
      color: whiteColor
    }
  },
  simple: {
    "&,&:focus,&:hover": {
      // color: whiteColor,
      color: grayColor[0],
      background: "transparent",
      boxShadow: "none"
    },
    "&$primary": {
      "&,&:focus,&:hover,&:visited": {
        color: primaryColor[0]
      }
    },
    "&$success": {
      "&,&:focus,&:hover,&:visited": {
        color: successColor[0]
      }
    },
    "&$warning": {
      "&,&:focus,&:hover,&:visited": {
        color: warningColor[0]
      }
    },
    "&$danger": {
      "&,&:focus,&:hover,&:visited": {
        color: dangerColor[0]
      }
    },
    "&$facebook": {
      "&,&:focus,&:hover,&:visited": {
        color: facebookColor
      }
    },
    "&$google": {
      "&,&:focus,&:hover,&:visited": {
        color: googleColor
      }
    }
  },
  transparent: {
    "&,&:focus,&:hover": {
      color: "inherit",
      background: "transparent",
      boxShadow: "none"
    }
  },
  auth: {
    backgroundColor: whiteColor,
    color: grayColor[8],
    boxShadow: "none",
    border: "solid 1px #ddd",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "Capitalize",
    "&:hover,&:focus": {
      backgroundColor: whiteColor,
      color: grayColor[8],
      boxShadow: "none",
      border: "solid 1px #999",
    },
    "& .fa-google": {
      color: googleColor
    },
    "& .fa-facebook": {
      color: facebookColor
    },
  },
  share: {
    backgroundColor: whiteColor,
    color: grayColor[4],
    boxShadow: 'none',
    padding: "12px 12px",
    textTransform: "Capitalize",
    fontSize: "14px",
    "&:hover,&:focus": {
      backgroundColor: grayColor[0],
      color: whiteColor
    },
    "&$primary": {
      color: primaryColor[0],
      boxShadow: 'none',
      backgroundColor: whiteColor,
      "&:hover,&:focus": {
        backgroundColor: primaryColor[0],
        color: whiteColor
      }
    },
    "&$secondary": {
      color: secondaryColor[0],
      boxShadow: 'none',
      backgroundColor: whiteColor,
      "&:hover,&:focus": {
        backgroundColor: secondaryColor[0],
        color: whiteColor
      }
    },
    "&$whatsapp": {
      color: whatsappColor,
      boxShadow: 'none',
      backgroundColor: whiteColor,
      "&:hover,&:focus": {
        backgroundColor: whatsappColor,
        color: whiteColor
      }
    },
    "&$messenger": {
      color: messengerColor,
      boxShadow: 'none',
      backgroundColor: whiteColor,
      "&:hover,&:focus": {
        backgroundColor: messengerColor,
        color: whiteColor
      }
    }
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none"
  },
  lg: {
    padding: "1.125rem 2.25rem",
    fontSize: "0.875rem",
    lineHeight: "1.333333",
    borderRadius: "0.2rem",
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
        // marginTop: "-4px"
      }
    }
  },
  sm: {
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
        marginTop: "1px"
      }
    },
    // padding: "0.40625rem 1.25rem",
    padding: "0.40625rem 0.75rem",
    fontSize: "0.6875rem",
    lineHeight: "1.5",
    borderRadius: "0.2rem"
  },
  round: {
    borderRadius: "30px"
  },
  block: {
    width: "100% !important"
  },
  link: {
    "&,&:hover,&:focus": {
      backgroundColor: "transparent",
      color: grayColor[0],
      boxShadow: "none"
    }
  },
  justIcon: {
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "20px",
    height: "41px",
    minWidth: "41px",
    width: "41px",
    "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
      marginRight: "0px"
    },
    "&$lg": {
      height: "57px",
      minWidth: "57px",
      width: "57px",
      lineHeight: "56px",
      padding: "0 !important",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "32px",
        lineHeight: "56px"
      },
      "& svg": {
        width: "38px",
        height: "38px",
      }
    },
    "&$sm": {
      height: "30px",
      minWidth: "30px",
      width: "30px",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "17px",
        lineHeight: "29px"
      },
      "& svg": {
        width: "17px",
        height: "17px"
      }
    }
  }
};

export default buttonStyle;
