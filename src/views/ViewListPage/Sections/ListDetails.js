import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Today from "@material-ui/icons/Today";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-pro-react/views/viewListPage/listDetailsStyle.js";
const useStyles = makeStyles(styles);

export default function SectionDetails(props) {
  const classes = useStyles();

  const { title, description, date, imageUrl } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <div className={classes.profile}>
            <div>
              <img src={imageUrl} alt="..." className={imageClasses} />
            </div>
            <div className={classes.name}>
              <h1 className={classes.title}>
                {title}
              </h1>
                <p>
                  {description}
                </p>
              { date
                ? <h6 className={classes.date}>
                    <Today /> {date}
                  </h6>
                : null
              }
            </div>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  )
}

SectionDetails.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  imageUrl: PropTypes.string
};
