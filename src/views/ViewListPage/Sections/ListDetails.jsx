/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { withRouter } from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import withStyles from "@material-ui/core/styles/withStyles";
import Today from "@material-ui/icons/Today";
import classNames from "classnames";
// @material-ui/core components
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import sectionDetailsStyle from "assets/jss/custom/views/viewListPage/listDetailsStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  render() {
    const { classes, title, description, date, imageUrl } = this.props;
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
}

SectionDetails.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  imageUrl: PropTypes.string
};

export default withRouter(withStyles(sectionDetailsStyle)(SectionDetails));
