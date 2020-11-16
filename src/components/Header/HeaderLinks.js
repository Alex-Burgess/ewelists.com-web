import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
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
// libs
import { useAppContext } from "libs/contextLib";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-pro-react/components/header/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinksAuth(props) {
  const classes = useStyles();
  const { isAuthenticated, user, breakpoint } = useAppContext();

  const { dropdownHoverColor, headerColor } = props;

  const signUpClasses = classNames({
    [classes.navLink]: true,
    [classes.signupDark]: headerColor === "white",
    [classes.signupWhite]: headerColor === "dark",
    [classes.activeLinkDark]: headerColor === "white",
    [classes.activeLinkWhite]: headerColor === "dark"
  });

  const linkClasses = classNames({
    [classes.navLink]: true,
    [classes.activeLinkDark]: headerColor === "white",
    [classes.activeLinkWhite]: headerColor === "dark"
  });

  if (isAuthenticated) {
    if (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md') {
      return (
        <List className={classes.list + " " + classes.mlAuto}>
          <ListItem className={classes.listItem}>
            <Link to="/" className={linkClasses} data-cy="sidebar-link-your-lists">
              Your Lists
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/list-ideas" className={linkClasses} data-cy="sidebar-link-ideas">
              Ideas
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/" className={linkClasses} data-cy="sidebar-link-account">
              <AccountCircle /> {user.name}
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/logout" className={linkClasses} data-cy="sidebar-link-logout">
              <ExitToApp /> Sign Out
            </Link>
          </ListItem>
        </List>
      );
    } else {
      return (
        <List className={classes.list + " " + classes.mlAuto}>
          <ListItem className={classes.listItem}>
            <Link to="/" className={linkClasses} data-cy="header-link-your-lists">
              Your Lists
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/list-ideas" className={linkClasses} data-cy="header-link-ideas">
              Ideas
            </Link>
          </ListItem>
          <ListItem className={classes.listItem} data-cy="header-link-profile-dropdown">
            <CustomDropdown
              noLiPadding
              navDropdown
              hoverColor={dropdownHoverColor}
              buttonProps={{
                className: linkClasses,
                color: "transparent"
              }}
              buttonIcon={AccountCircle}
              dropdownList={[
                <Link to="/" className={classes.dropdownLink} data-cy="header-link-user-account">
                  <AccountCircle className={classes.dropdownIcons} /> {user.name}
                </Link>,
                <Link to="/logout" className={classes.dropdownLink} data-cy="header-link-logout">
                  <ExitToApp className={classes.dropdownIcons} /> Sign Out
                </Link>
              ]}
            />
          </ListItem>
        </List>
      );
    }
  } else {
    if (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md') {
      return (
        <List className={classes.list + " " + classes.mlAuto}>
          <ListItem className={classes.listItem}>
            <Link to="/how-it-works" className={linkClasses} data-cy="sidebar-link-how">
              How It Works
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/about" className={linkClasses} data-cy="sidebar-link-how">
              About
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/list-ideas" className={linkClasses} data-cy="sidebar-link-ideas">
              Ideas
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/login" className={linkClasses} data-cy="sidebar-link-login">
              Log In
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/signup" className={signUpClasses} data-cy="sidebar-link-signup">
              Sign Up
            </Link>
          </ListItem>
        </List>
      );
    } else {
      return (
        <List className={classes.list + " " + classes.mlAuto}>
          <ListItem className={classes.listItem}>
            <Link to="/how-it-works" className={linkClasses} data-cy="header-link-how">
              How It Works
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/about" className={linkClasses} data-cy="header-link-how">
              About
            </Link>
          <ListItem className={classes.listItem}>
            <Link to="/list-ideas" className={linkClasses} data-cy="header-link-ideas">
              Ideas
            </Link>
          </ListItem>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/login" className={linkClasses} data-cy="header-link-login">
              Log In
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/signup" className={signUpClasses} data-cy="header-link-signup">
              Sign Up
            </Link>
          </ListItem>
        </List>
      )
    }
  }
}

HeaderLinksAuth.defaultProps = {
  hoverColor: "blue"
};

HeaderLinksAuth.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "blue"
  ]),
  headerColor: PropTypes.oneOf([
    "white",
    "dark"
  ])
};
