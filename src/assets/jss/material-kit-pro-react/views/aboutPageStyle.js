import {
  container,
  whiteColor,
  title
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: whiteColor
  },
  flexer: {
    flexGrow: 1,
  },
  container: {
    ...container,
    marginTop: "75px"
  },
  title: {
    ...title,
    // fontSize: "4em",
    // fontWeight: "700"
    // marginBottom: "5px"
  },
  paragraph: {
    fontSize: "16px",
    textAlign: "justify"
  },
  quote: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  imgContainer: {
    textAlign: "center",
    "& img": {
      width: "80%",
      paddingTop: "100px",
      paddingLeft: "100px",
      [theme.breakpoints.down("sm")]: {
        width: "40%",
        paddingTop: "10px",
        paddingLeft: "0px",
        paddingBottom: "40px"
      }
    }
  },
});

export default style;
