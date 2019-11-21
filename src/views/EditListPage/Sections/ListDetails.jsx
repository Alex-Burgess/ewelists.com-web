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
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// nodejs library that concatenates classes
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// import classNames from "classnames";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import Delete from "@material-ui/icons/DeleteOutline";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
// Sections
import SectionDelete from "./DeletePopOut.jsx";

import sectionDetailsStyle from "assets/jss/material-kit-pro-react/views/editListSections/listDetailsStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smallModal: false,
      deleteErrorMessage: null,
      occasionList: ['Baby Shower', 'Birthday', 'Christmas', 'Baptism', 'Christening', 'Other']
    };
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }

  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  deleteList = async event => {
    try {
      const response = await API.del("lists", "/" + this.props.match.params.id);

      console.log(response.message);
      this.props.history.push('/');
    } catch (e) {
      if (e.response.data.error === 'List does not exist.') {
        console.log('list does not exist.');

        this.setState({
          deleteErrorMessage: 'The list could not be deleted as it did not exist.'
        })
      } else {
        console.log('Unexpected error occurred when deleting list: ' + e.response.data.error);
        this.setState({
          deleteErrorMessage: 'Unexpected error occurred when deleting list.'
        })
      }
    }
  }

  renderOccasionSelect(classes, occasion) {
    return (
      <FormControl fullWidth className={classes.selectFormControl}>
        <Select
          MenuProps={{className: classes.selectMenu}}
          classes={{select: classes.select}}
          value={occasion}
          onChange={this.props.handleOccasionSelect}
          inputProps={{name: "occasion", id: "simple-select"}}
        >
          <MenuItem disabled classes={{root: classes.selectMenuItem}}>
            Select Type
          </MenuItem>
          {this.renderMenuItems(classes, this.state.occasionList)}
        </Select>
      </FormControl>
    )
  }

  renderMenuItems(classes, occasionList: Occasions[]) {
    return occasionList.map(
      (label, i) =>
          <MenuItem classes={{root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}} value={label} key={i}>
            {label}
          </MenuItem>
    )
  }

  render() {
    const { classes, title, description, occasion, date, imageUrl, isEdit } = this.props;
    return (
      <div className={classes.section}>
        { isEdit
          ? this.renderEdit(classes, title, description, occasion, date, imageUrl)
          : this.renderView(classes, title, description, occasion, date, imageUrl)
        }
        <SectionDelete open={this.state.smallModal} handleClose={this.handleClose.bind(this)} deleteList={this.deleteList.bind(this)} deleteError={this.state.deleteErrorMessage}/>
      </div>
    )
  }

  renderView(classes, title, description, occasion, date, imageUrl){
    return (
      <div className={classes.container}>
        <GridContainer >
          <GridItem xs={12} sm={7} md={7}>
            <h1 className={classes.title}>
              {title}
            </h1>
            <InputLabel className={classes.label}>
              Description:
            </InputLabel>
            <div className={classes.description}>
              {description}
            </div>
            <GridContainer >
              <GridItem xs={12} sm={5} md={5}>
                <InputLabel className={classes.label}>
                  Date:
                </InputLabel>
                {date}
              </GridItem>
              <GridItem xs={7} sm={4} md={4} className={classes.detailsPadding}>
                <InputLabel className={classes.label}>
                  Occasion:
                </InputLabel>
                {occasion}
              </GridItem>
              <GridItem xs={5} sm={3} md={3} className={classes.detailsPadding}>
                <div className={classes.editButtons}>
                  <Button round justIcon color="info" onClick={this.props.setEditState}>
                    <Icon>mode_edit</Icon>
                  </Button>
                  <Button round justIcon color="default" onClick={() => this.handleClickOpen("smallModal")}>
                    <Delete />
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={5} md={5} className={classes.detailsPadding}>
            <Card profile plain>
              <CardHeader image plain>
                <a href="#img" onClick={e => e.preventDefault()}>
                  <img src={imageUrl} className={classes.listImage} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    opacity: "1"
                  }}
                />
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }

  renderEdit(classes, title, description, occasion, date, imageUrl){
    return (
      <div className={classes.container}>
        <GridContainer >
          <GridItem xs={12} sm={7} md={7}>
            <CustomInput
              id="title"
              title
              inputProps={{
                placeholder: "Enter your title here...",
                defaultValue: title,
                onChange: this.props.handleChange
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
            <InputLabel className={classes.labelEdit}>
              Description:
            </InputLabel>
            <CustomInput
              id="description"
              description
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Add your description here...",
                defaultValue: description,
                multiline: true,
                rows: 2,
                onChange: this.props.handleChange
              }}
            />
            <GridContainer >
              <GridItem xs={12} sm={5} md={5} className={classes.detailsPadding}>
                <InputLabel className={classes.labelEdit}>
                  Date:
                </InputLabel>
                <FormControl fullWidth>
                  <Datetime
                    className={classes.dateField}
                    dateFormat="DD MMMM YYYY"
                    timeFormat={false}
                    inputProps={{ placeholder: "Select a date" }}
                    value={date}
                    onChange={this.props.changeDate}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={7} sm={4} md={4} className={classes.detailsPadding}>
                <InputLabel className={classes.labelEdit}>
                  Occasion:
                </InputLabel>
                {this.renderOccasionSelect(classes, occasion)}
              </GridItem>
              <GridItem xs={5} sm={3} md={3} className={classes.detailsPadding}>
                <div className={classes.editButtons}>
                  <Button round justIcon color="success" onClick={this.props.saveDetails}>
                    <Icon>save_alt</Icon>
                  </Button>
                  <Button round justIcon color="default" onClick={this.props.cancelEdit}>
                    <Close />
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={5} md={5}>
            <Card profile plain>
              <CardHeader image plain>
                <a href="#img" onClick={e => e.preventDefault()}>
                  <img src={imageUrl} className={classes.listImage} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    opacity: "1"
                  }}
                />
              </CardHeader>
            </Card>
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
  occasion: PropTypes.string,
  date: PropTypes.string,
  imageUrl: PropTypes.string,
  isEdit: PropTypes.bool
};

export default withRouter(withStyles(sectionDetailsStyle)(SectionDetails));
