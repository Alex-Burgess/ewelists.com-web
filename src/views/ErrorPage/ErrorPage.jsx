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
/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import FooterTransparent from "components/Footer/FooterTransparent.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import errorPageStyle from "assets/jss/material-kit-pro-react/views/errorPageStyles.jsx";

import image from "assets/img/sheep-with-shoes.jpg";

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1]
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="ewelist"
          links={<HeaderLinks dropdownHoverColor="dark" />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.contentCenter}>
            <GridContainer>
              <GridItem md={12}>
                <h1 className={classes.title}>Page not found</h1>
                <h2 className={classes.subTitle}>The page you are looking for does not exist.</h2>
                <a href="/">Click to go back to the home page.</a>
              </GridItem>
            </GridContainer>
          </div>
        </div>

        <FooterTransparent />
      </div>
    );
  }
}

ErrorPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(errorPageStyle)(ErrorPage);
