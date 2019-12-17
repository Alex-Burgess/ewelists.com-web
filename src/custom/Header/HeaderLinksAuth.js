import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
// core components

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks({ ...props }) {
  const classes = useStyles();
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Link to="/" className={classes.navLink}>
          My Lists
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/listideas" className={classes.navLink}>
          Gift List Ideas
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/logout" className={classes.navLink}>
          Sign Out
        </Link>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
