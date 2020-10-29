import {
  container,
  mlAuto,
  mrAuto
} from "assets/jss/material-kit-pro-react.js";

const ideasSection = theme => ({
  mlAuto,
  mrAuto,
  section: {
    ...container,
    padding: "0px"
  },
  step: {
    marginTop: "20px",
    marginBottom: "90px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
  },
  title: {
    fontWeight: "500",
    lineHeight: "1.15",
    fontSize: "39px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "34px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "28px"
    }
  },
  description: {
    fontSize: "21px",
    fontWeight: "400",
    lineHeight: "1.5",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "17px"
    }
  }
});

export default ideasSection;
