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
      fontSize: "27px"
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
    backgroundColor: "#CDD7E0",
    borderRadius: "8px",
    paddingTop: "10px",
    marginBottom: "10px"
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
    objectPosition: "top",
    paddingBottom: "50px",
    marginLeft: "auto",
    marginRight: "auto",
    objectFit: "cover",
    maxHeight: "600px",
    width: "190px",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "600px",
      width: "190px"
    },
    [theme.breakpoints.down("xs")]: {
      maxHeight: "600px",
      width: "230px"
    }
  },
  leftText: {
    display: 'none',
    [theme.breakpoints.down("xs")]: {
      display: 'inline'
    }
  },
  rightText: {
    display: 'inline',
    [theme.breakpoints.down("xs")]: {
      display: 'none'
    }
  }
});

export default ideasSection;
