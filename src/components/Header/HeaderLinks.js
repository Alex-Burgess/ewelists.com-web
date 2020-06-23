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
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-pro-react/components/header/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinksAuth(props) {
  const classes = useStyles();
  const { dropdownHoverColor, isAuthenticated, user, mobile, headerColor } = props;

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
    return (
      <List className={classes.list + " " + classes.mlAuto}>
        <ListItem className={classes.listItem}>
          <Link to="/" className={linkClasses}>
            Your Lists
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/list-ideas" className={linkClasses}>
            Ideas
          </Link>
        </ListItem>
        {mobile
          ? <div><ListItem className={classes.listItem}>
              <Link to="/" className={linkClasses}>
                <AccountCircle /> {user.name}
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link to="/logout" className={linkClasses}>
                <ExitToApp /> Sign Out
              </Link>
            </ListItem></div>
          : <ListItem className={classes.listItem}>
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
                  <Link to="/" className={classes.dropdownLink}>
                    <AccountCircle className={classes.dropdownIcons} /> {user.name}
                  </Link>,
                  <Link to="/logout" className={classes.dropdownLink}>
                    <ExitToApp className={classes.dropdownIcons} /> Sign Out
                  </Link>
                ]}
              />
            </ListItem>
        }
      </List>
    );
  } else {
    return (
      <List className={classes.list + " " + classes.mlAuto}>
        <ListItem className={classes.listItem}>
          <Link to="/list-ideas" className={linkClasses}>
            Ideas
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/login" className={linkClasses}>
            Log In
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/signup" className={signUpClasses}>
            Sign Up
          </Link>
        </ListItem>
      </List>
    );
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
  ]),
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  mobile: PropTypes.bool
};
