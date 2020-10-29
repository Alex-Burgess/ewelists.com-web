import {
  container,
  mlAuto,
  mrAuto,
  title
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
    marginBottom: "20px",
    display: "flex",
    alignItems: "center"
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
  },
  stepContainer: {
    backgroundColor: "#feebec",
    borderRadius: "8px",
    paddingTop: "10px",
  },
  stepDetails:{
    paddingLeft: "20px",
    display: "flex",
  },
  stepTitle: {
    ...title,
    marginTop: "10px",
    marginBottom: "15px"
  },
  icon: {
    width: "33px",
    height: "33px",
    marginRight: "14px",
    marginTop: "10px",
    top: "1px",
    verticalAlign: "middle",
    fontSize: "24px",
    position: "relative"
  },
  imageContainer:{
    position: "relative",
    padding: "0",
    zIndex: "1",
    textAlign: "center !important"
  },
  image: {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    boxShadow: "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    objectFit: "cover",
    objectPosition: "top",
    width: "200px",
    maxHeight: "580px",
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      maxHeight: "580px"
    },
    [theme.breakpoints.down("xs")]: {
      width: "270px",
      maxHeight: "580px"
    }
  }
});

export default ideasSection;
