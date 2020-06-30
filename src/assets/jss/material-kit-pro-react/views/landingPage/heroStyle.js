import {
  container,
  title,
  whiteColor,
  blackColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const heroStyle = theme => ({
  section: {
    marginTop: "70px",
    textAlign: "left",
  },
  createContainer: {
    padding: "30px 80px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 25px 0px 25px",
    },
    [theme.breakpoints.down("xs")]: {
      // paddingTop: "60px",
      padding: "60px 20px 0px 20px",
    }
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    minHeight: "32px",
    textDecoration: "none",
    zIndex: "2",
    color: whiteColor,
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
      textAlign: "center"
    }
  },
  image: {
    height: "540px",
    backgroundSize: "cover",
    backgroundPosition: "100%",
    backgroundRepeat: "no-repeat",
    position: "relative",
    "&:before": {
      background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%)",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: "''",
      zIndex: "0",
      left: "0px",
      top: "0px"
    },
    [theme.breakpoints.down("xs")]: {
      height: "500px",
      "&:before": {
        // background: "rgba(" + hexToRgb(blackColor) + ",0.30)",
        background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%)",
        position: "absolute",
        width: "100%",
        height: "100%",
        content: "''",
        zIndex: "0",
        left: "0px",
        top: "0px"
      }
    }
  },
  imgContainer: {
    "& img": {
      width: "100%"
    },
    paddingTop: "40px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "20px",
      paddingBottom: "20px",
    }

  },
  buttonContainer: {
    [theme.breakpoints.down("xs")]: {
      // paddingTop: "50px",
      // paddingBottom: "50px",
      textAlign: "center"
    }
  },
  downButton: {
    [theme.breakpoints.down("xs")]: {
      // paddingTop: "50px",
      paddingBottom: "10px",
      textAlign: "center"
    }
  },
  centerText: {
    textAlign: "center"
  }
});

export default heroStyle;
