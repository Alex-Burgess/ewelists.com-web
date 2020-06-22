import {
  description,
  cardTitle,
  mlAuto,
  mrAuto,
} from "assets/jss/material-kit-pro-react.js";

const style = theme => ({
  mlAuto,
  mrAuto,
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "15px 0"
  },
  card: {
    marginTop: "60px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
      marginBottom: "40px",
    },
  },
  cardTitle: {
    ...cardTitle,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    }
  },
  cardCategory: {
    fontSize: "0.75rem",
    marginBottom: "0",
    marginTop: "10px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "8px",
      lineHeight: "0"
    }
  },
  description: {
    ...description,
    lineHeight: "1.313rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      lineHeight: "1.45rem",
    },
  },
  image: {
    height: "18vw",
    maxHeight: "202.47px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "19vw",
      maxHeight: "150.28px",
      objectFit: "cover",
      display: "inline"
    },
    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      maxHeight: "230.28px",
      objectFit: "cover",
      display: "inline"
    }
  },
  imageDesktop: {
    display: "inline",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    }
  },
  imageRight: {
    display: "inline",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "inline",
    }
  },
  imageTablet: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "inline",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    }
  },
  imageMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "inline",
    }
  }
});

export default style;
