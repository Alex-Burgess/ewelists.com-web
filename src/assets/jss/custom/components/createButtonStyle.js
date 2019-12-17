import {
  successColor,
  description
} from "assets/jss/material-kit-pro-react.js";

const buttonStyle = {
  addList: {
    width: "100%",
    height: "330px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardDescription: {
    ...description
  },
  centerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    color: successColor[1],
    marginLeft: -66,
  }
};

export default buttonStyle;
