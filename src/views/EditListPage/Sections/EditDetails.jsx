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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
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

import sectionDetailsStyle from "assets/jss/material-kit-pro-react/views/editListSections/editDetailsStyle.jsx";

import christmasCard from "assets/img/examples/christmas-card.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      smallModal: false,
      deleteError: false,
      deleteErrorMessage: null,
      isEdit: false,
      updateError: false,
      updateErrorMessage: null,
      title: "Title When Created"
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

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteList = async event => {
    try {
      const response = await this.deleteListRequest();
      console.log(response.message);
      this.props.history.push('/');
    } catch (e) {
      if (e.response.data.error === 'List does not exist.') {
        console.log('list does not exist.');

        this.setState({
          deleteError: true,
          deleteErrorMessage: 'The list could not be deleted as it did not exist.'
        })
      } else {
        console.log('Unexpected error occurred when deleting list: ' + e.response.data.error);
        this.setState({
          deleteError: true,
          deleteErrorMessage: 'Unexpected error occurred when deleting list.'
        })
      }
    }
  }

  saveDetails = async event => {
    try {
      var requestBody = {
        "title": "My new title hardcoded2",
        "description": "My new description hardcoded",
        "occasion": "Birthday"
      };
      const response = await this.updateListRequest(requestBody);
      console.log("update response title: " + response.title.S);
      console.log("update response description: " + response.description.S);

      this.setState({ title: response.title.S });
      this.setState({ isEdit: false });
    } catch (e) {
      console.log('Unexpected error occurred when updating list: ' + e.response.data.error);
      this.setState({
        updateError: true,
        updateErrorMessage: 'Unexpected error occurred when updating list.  Please try again.'
      })
    }
  }

  editDetails = event => {
    this.setState({ isEdit: true });
  }

  updateListRequest(updateItem) {
    return API.put("lists", "/" + this.props.match.params.id, {
      body: updateItem
    });
  }

  deleteListRequest() {
    return API.del("lists", "/" + this.props.match.params.id);
  }

  renderTitle(classes){
    return (
      <div>
      { this.state.isEdit
        ? <div>
            <InputLabel className={classes.label}>
              Title:
            </InputLabel>
              <CustomInput
                id="title"
                title
                inputProps={{
                  placeholder: "Enter your title here...",
                  defaultValue: this.state.title,
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
          </div>
        : <div>
            <InputLabel className={classes.label}>
              Title:
            </InputLabel>
            <h1>{this.state.title}</h1>
          </div>
      }
      </div>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer >
            <GridItem xs={12} sm={12} md={8}>
              {this.renderTitle(classes)}
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            { this.state.isEdit
              ? <div className={classes.deleteContainer}>
                  <Button round justIcon color="success" onClick={this.saveDetails}>
                    <Icon>save_alt</Icon>
                  </Button>
                </div>
              : <div className={classes.deleteContainer}>
                  <Button round justIcon color="info" onClick={this.editDetails}>
                    <Icon>mode_edit</Icon>
                  </Button>
                  <Button round justIcon color="default" onClick={() => this.handleClickOpen("smallModal")}>
                    <Delete />
                  </Button>
                </div>
            }
              {/* SMALL MODAL START */}
              <Dialog
                classes={{
                  root: classes.modalRoot,
                  paper: classes.modal + " " + classes.modalSmall
                }}
                open={this.state.smallModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.handleClose("smallModal")}
                aria-labelledby="small-modal-slide-title"
                aria-describedby="small-modal-slide-description"
              >
                <DialogTitle
                  id="small-modal-slide-title"
                  disableTypography
                  className={classes.modalHeader}
                >
                  <Button
                    simple
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    onClick={() => this.handleClose("smallModal")}
                  >
                    {" "}
                    <Close className={classes.modalClose} />
                  </Button>
                </DialogTitle>
                <DialogContent
                  id="small-modal-slide-description"
                  className={
                    classes.modalBody + " " + classes.modalSmallBody + " " + classes.centerText
                  }
                >
                  <h5><b>Are you sure you want to delete this list?</b></h5>
                  <h5>This cannot be undone.</h5>
                </DialogContent>
                <DialogActions
                  className={
                    classes.modalFooter + " " + classes.modalFooterCenter
                  }
                >
                  <Button
                    onClick={() => this.handleClose("smallModal")}
                    color="success"
                    block
                    round
                    className={classes.modalSmallFooterFirstButton}
                  >
                    No
                  </Button>
                  <Button
                    onClick={this.deleteList}
                    color="default"
                    block
                    round
                    className={
                      classes.modalSmallFooterFirstButton +
                      " " +
                      classes.modalSmallFooterSecondButton
                    }
                  >
                    Yes
                  </Button>
                </DialogActions>
                <DialogContent
                  id="small-modal-slide-description"
                  className={
                    classes.modalFooter + " " + classes.centerText + " " + classes.error
                  }
                >
                  {this.state.deleteError
                    ?
                      <div className={classes.errorContainer}>
                        {this.state.deleteErrorMessage}
                        <a href="/"> Click here to go back to your lists.</a>
                      </div>
                    : null
                  }
                </DialogContent>
              </Dialog>
              {/* SMALL MODAL END */}
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel className={classes.label + " " + classes.date}>
                    Date:
                  </InputLabel>
                  <FormControl fullWidth>
                    <Datetime
                      className={classes.dateField}
                      dateFormat="DD/MM/YYYY"
                      timeFormat={false}
                      inputProps={{ placeholder: "Select a date" }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel className={classes.label + " " + classes.date}>
                    Occasion:
                  </InputLabel>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={this.state.simpleSelect}
                      onChange={this.handleSimple}
                      inputProps={{
                        name: "simpleSelect",
                        id: "simple-select"
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Select Type
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="2"
                      >
                        Baby Shower
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="3"
                      >
                        Birthday
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="4"
                      >
                        Christmas
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="5"
                      >
                        Baptism
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="6"
                      >
                        Christening
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="7"
                      >
                        Other
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <InputLabel className={classes.label}>
                Description:
              </InputLabel>
              <CustomInput
                id="textarea-input"
                description
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: "Add your description here...",
                  multiline: true,
                  rows: 5
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InputLabel className={classes.label}>
                Image:
              </InputLabel>
              <Card profile plain>
                <CardHeader image plain>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={christmasCard} className={classes.listImage} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${christmasCard})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionDetails.propTypes = {
  classes: PropTypes.object
};

export default withRouter(withStyles(sectionDetailsStyle)(SectionDetails));
