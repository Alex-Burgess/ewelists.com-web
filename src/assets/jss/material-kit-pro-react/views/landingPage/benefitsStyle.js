import {
  container,
  mlAuto,
  mrAuto,
} from "assets/jss/material-kit-pro-react.js";

const ideasSection = theme => ({
  mlAuto,
  mrAuto,
  section: {
    ...container,
    padding: "0px"
  },
  benefit: {
    marginTop: "20px",
    marginBottom: "40px",
  }
});

export default ideasSection;
