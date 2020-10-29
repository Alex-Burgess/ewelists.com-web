import {
  title
} from "assets/jss/material-kit-pro-react.js";

const howItWorksStyle = theme => ({
  container: {
    zIndex: "2",
    paddingTop: "35px",
    paddingBottom: "70px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "30px",
    }
  },
  subTitle: {
    ...title,
  },
  textCenter: {
    textAlign: "center"
  }
});

export default howItWorksStyle;
