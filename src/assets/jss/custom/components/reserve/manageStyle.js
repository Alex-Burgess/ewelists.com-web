import {
  title,
  dangerColor
} from "assets/jss/material-kit-pro-react.js";

const productDetailsStyle = theme => ({
  section: {
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 20px",
    },
  },
  title: {
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
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      flexDirection: "row",
    },
  },
  customButton: {
    width: "120px",
    [theme.breakpoints.down("xs")]: {
      width: "320px"
    },
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
    color: dangerColor[1],
    textAlign: 'center',
    paddingTop: "10px"
  },
  editRow: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "30px"
    },
  }
});

export default productDetailsStyle;
