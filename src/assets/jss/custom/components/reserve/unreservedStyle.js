import {
  whiteColor
} from "assets/jss/material-kit-pro-react.js";

const productDetailsStyle = theme => ({
  section: {
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 20px",
    },
  },
  link: {
    fontWeight: "700",
    color: whiteColor
  },
  message: {
    fontSize: "16px"
  }
});

export default productDetailsStyle;
