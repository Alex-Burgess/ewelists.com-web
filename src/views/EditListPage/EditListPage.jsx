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
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import Favorite from "@material-ui/icons/Favorite";
import Delete from "@material-ui/icons/DeleteOutline";
import Close from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InputLabel from "@material-ui/core/InputLabel";
// sections for this page
import SectionListDetails from "./Sections/ListDetails.jsx";

import articlePageStyle from "assets/jss/material-kit-pro-react/views/viewEditPageStyle.jsx";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      occasion: '',
      isEdit: false,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    try {
      console.log("Calling list API ")
      const response = await this.getList();
      console.log("Got details for list " + response.list.title)
      this.setState({
        title: response.list.title,
        description: response.list.description,
        occasion: response.list.occasion
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

  editDetails = event => {
    this.setState({ isEdit: true });
  }

  saveDetails = async event => {
    try {
      var requestBody = {
        "title": this.state.title,
        "description": this.state.description,
        "occasion": this.state.occasion
      };
      const response = await this.updateListRequest(requestBody);
      console.log("update response title: " + response[0].updates.title);
      console.log("update response description: " + response[0].updates.description);
      console.log("update response description: " + response[0].updates.occasion);

      this.setState({
        title: response[0].updates.title,
        description: response[0].updates.description,
        occasionSelect: response[0].updates.occasion,
        isEdit: false
       });
    } catch (e) {
      console.log('Unexpected error occurred when updating list: ' + e.response.data.error);
      this.setState({
        updateError: true,
        updateErrorMessage: 'Unexpected error occurred when updating list.  Please try again.'
      })
    }
  }

  updateListRequest(updateItem) {
    return API.put("lists", "/" + this.props.match.params.id, {
      body: updateItem
    });
  }

  handleChange = event => {
    var updateObj = {};
    updateObj[event.target.id] = event.target.value;
    this.setState( updateObj );
  }

  handleOccasionSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
        color="info"
        brand="ewelists"
          links={<HeaderLinksAuth dropdownHoverColor="info" />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "info"
          }}
        />
        <div className={classes.main}>
          <SectionListDetails
            title={this.state.title}
            description={this.state.description}
            occasion={this.state.occasion}
            isEdit={this.state.isEdit}
            saveDetails={this.saveDetails.bind(this)}
            editDetails={this.editDetails.bind(this)}
            handleChange={this.handleChange.bind(this)}
            handleOccasionSelect={this.handleOccasionSelect.bind(this)}
          />
        </div>
        <FooterLarge />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(articlePageStyle)(ArticlePage);
