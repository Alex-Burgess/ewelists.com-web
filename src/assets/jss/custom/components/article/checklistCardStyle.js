import {
  title,
  successColor,
  hexToRgb,
  whiteColor
} from "assets/jss/material-kit-pro-react.js";

const blogPostPageStyle = theme => ({
  ulCustom: {
    paddingLeft: "20px",
    marginBottom: "0px"
  },
  listSpacing: {
    margin: "0 0 0px 0",
  },
  title: {
    ...title
  },
  cardCategorySocialWhite: {
    marginTop: "10px",
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)",
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      fontSize: "22px",
      position: "relative",
      marginTop: "-4px",
      top: "2px",
      marginRight: "5px"
    },
    "& svg": {
      position: "relative",
      top: "5px"
    }
  },
  cardTitleWhite: {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0",
    minHeight: "auto",
    color: whiteColor + " !important"
  },
  checklistCard: {
    backgroundColor: successColor[1]
  }
});

export default blogPostPageStyle;
