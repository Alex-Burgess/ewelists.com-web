import {
  container,
  mrAuto,
  mlAuto,
  dangerColor
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  container,
  mrAuto,
  mlAuto,
  customFormControl: {
    paddingTop: "14px",
    minWidth: "400px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "270px",
    }
  },
  customQuanityFormControl: {
    width: "80px"
  },
  textCenter: {
    textAlign: "center !important"
  },
  rightText: {
    textAlign: "Right",
  },
  actionButton: {
    padding: "12px 10px"
  },
  errorContainer: {
    color: dangerColor[1],
    textAlign: "center !important",
    minHeight: "40px"
  },
});

export default style;
