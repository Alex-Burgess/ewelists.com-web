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
import { API } from "aws-amplify";
import { withRouter } from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Today from "@material-ui/icons/Today";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import sectionDetailsStyle from "assets/jss/material-kit-pro-react/views/viewListSections/sectionDetailsStyle.jsx";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      title: '',
      description: '',
      occasion: ''
    };
  }

  async componentDidMount() {
    try {
      const response = await this.getList();
      this.setState({
        title: response.title.S,
        description: response.description.S,
        occasion: response.occasion.S
      });
      this.setState({ isLoading: false });
    } catch (e) {
      console.log("List ID " + this.props.match.params.id + " does not exist for the user.")
      this.props.history.push('/error/' + this.props.match.params.id);
    }
  }

  getList() {
    return API.get("lists", "/" + this.props.match.params.id);
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.section}>
        {!this.state.isLoading &&
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>
                {this.state.title}
              </h1>
              <h5 className={classes.date}>
                <Today /> Date: 31/10/2019
              </h5>
              <p className={classes.description}>
                {this.state.description}
              </p>
            </GridItem>
          </GridContainer>
        }
      </div>
    );
  }
}

SectionDetails.propTypes = {
  classes: PropTypes.object
};

export default withRouter(withStyles(sectionDetailsStyle)(SectionDetails));
