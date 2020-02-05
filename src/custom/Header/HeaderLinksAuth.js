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
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Settings from "@material-ui/icons/Settings";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { dropdownHoverColor, user } = props;

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <Link to="/" className={classes.navLink}>
          My Lists
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/list-ideas" className={classes.navLink}>
          Gift List Ideas
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Settings}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              <AccountCircle className={classes.dropdownIcons} /> {user.name}
            </Link>,
            <Link to="/logout" className={classes.dropdownLink}>
              <ExitToApp className={classes.dropdownIcons} /> Sign Out
            </Link>
          ]}
        />
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
