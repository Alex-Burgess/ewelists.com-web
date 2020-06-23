import {
  container,
  main,
  title,
  cardTitle,
  grayColor,
  whiteColor
} from "assets/jss/material-kit-pro-react.js";

const pageStyle = theme => ({
  container: {
    ...container,
    zIndex: "2",
    width: "60%",
    marginTop: "12px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  section: {
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 20px",
    },
  },
  main: {
    ...main,
    paddingTop: "70px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
    }
  },
  title: {
    ...title,
    marginTop: "15px",
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
      marginTop: "0px",
      fontSize: "2rem"
    }
  },
  subTitle: {
    ...title,
    marginBottom: "0px"
  },
  sectionHeading: {
    marginTop: "0px",
    marginBottom: "10px",
    fontSize: "1.3rem",
    verticalAlign: "center",
  },
  icon: {
    fontSize: "2.2rem",
    paddingRight: "5px",
    verticalAlign: "bottom",
  },
  textCenter: {
    textAlign: "center !important"
  },
  link: {
    fontWeight: "700",
    color: whiteColor
  },
  message: {
    fontSize: "16px"
  },
  customButton: {
    width: "99%",
  },
  buttonWrapper: {
    display: "flex",
    // justifyContent: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      flexDirection: "row",
    },
  },
  linkWidth: {
    width: "100%"
  },
  longText: {
    fontSize: "15px",
  },
  shortText: {
    paddingTop: "13px",
    fontSize: "17px",
  },
  extraMargin: {
    marginTop: "15px"
  },
  error: {
    textAlign: 'center',
    paddingTop: "10px"
  },
  editRow: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "30px"
    },
  },
  leftGrid: {
    paddingRight: "3px"
  },
  rightGrid: {
    paddingLeft: "3px"
  },
  image: {
    [theme.breakpoints.down("xs")]: {
      maxHeight: "180px",
    },
    maxHeight: "175px",
    objectFit: "contain",
  },
  imageWrapper: {
    marginBottom: "5px"
  },
  detailsWrapper: {
    display: "flex",
    alignItems: "center"
  },
  brand: {
    ...cardTitle,
    textAlign: "left",
    marginBottom: "0px !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      marginTop: "0px"
    }
  },
  description: {
    color: grayColor[0],
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    visibility: "visible",
    textAlign: "left",
    marginBottom: "3px",
    [theme.breakpoints.down("xs")]: {
      WebkitLineClamp: "3",
      fontSize: "13px"
    },
  },
  quantity: {
    fontSize: "0.85rem",
    color: "#6c757d"
  }
});

export default pageStyle;
