import {
  title
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
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
  shortText: {
    paddingTop: "13px",
    fontSize: "17px",
  },
});

export default style;
