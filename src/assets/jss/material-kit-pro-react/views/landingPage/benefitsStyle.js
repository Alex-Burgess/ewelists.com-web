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
    marginBottom: "90px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "60px",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "30px",
    }
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0rem bottom",
    backgroundSize: "400px",
    height: "290px",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "230px",
      backgroundSize: "300px",
      backgroundPosition: "center",
    }
  },
  image1: {
    backgroundSize: "370px",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "290px",
    },
  },
  image2: {
    backgroundPosition: "left 0rem bottom",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  imageMob2: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
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
  title: {
    fontWeight: "500",
    lineHeight: "1.15",
    fontSize: "39px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "34px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "28px"
    }
  },
  rightText: {
    paddingLeft: "40px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "15px"
    }
  }
});

export default ideasSection;
