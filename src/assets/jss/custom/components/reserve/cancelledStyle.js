import {
  
} from "assets/jss/material-kit-pro-react.js";

const productDetailsStyle = theme => ({
  section: {
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 20px",
    },
  },
  shortText: {
    paddingTop: "13px",
    fontSize: "17px",
    textAlign: "center"
  },
  centerContent: {
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default productDetailsStyle;
