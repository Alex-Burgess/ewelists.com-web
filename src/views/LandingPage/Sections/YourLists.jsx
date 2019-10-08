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
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// @material-ui/icons
import Subject from "@material-ui/icons/Subject";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CreateButton from "components/CreateButton/CreateButton.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Info from "components/Typography/Info.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';

import createStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/yourListsStyle.jsx";

import oscar1 from "assets/img/examples/oscar-birthday.jpg";
// import oscar2 from "assets/img/examples/oscar-christmas.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

class SectionLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreating: false,
      isLoading: true,
      lists: [],
      createModal: false,
      title: '',
      description: '',
      occasion: ''
    };
  }

  async componentDidMount() {
    const response = await this.getLists();
    this.setState({ lists: response.lists });
    this.setState({ isLoading: false });
  }

  getLists() {
    return API.get("lists", "/");
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
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  createList = async event => {
    this.setState({ isCreating: true });

    console.log("Creating list with values: " + this.state.title + " " + this.state.description + " " + this.state.occasion);

    var createList = {
      "title": this.state.title,
      "description": this.state.description,
      "occasion": this.state.occasion
    }

    const response = await this.createListRequest(createList);

    const listId = response.listId;
    console.log("List was created with ID (" + listId + "), redirecting to edit page for list.")

    this.props.history.push('/edit/' + listId);
  }

  createListRequest(createList) {
    return API.post("lists", "/", {
      body: createList
    });
  }

  renderYourLists(classes, lists: Lists[]) {
    let allLists: Lists[] = [];

    return allLists.concat(lists).map (
      (list, i) =>
        <GridItem xs={12} sm={4} md={4} key={i}>
          <Card profile>
            <CardHeader image>
              <a href="/lists/viewexample">
                <img src={oscar1} className={classes.listImage} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${oscar1})`,
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody>
              <Info>
                <a href="/lists/viewexample">
                  <h6 className={classes.cardCategory}>{list.title}</h6>
                </a>
              </Info>
              <p className={classes.cardDescription}>
                {list.description}
              </p>
            </CardBody>
            <CardFooter
              profile
              className={classes.justifyContentCenter}
            >
              <a href="/lists/viewexample">
                <Button round justIcon color="info">
                  <Subject />
                </Button>
              </a>
              <a href={"/edit/" + list.listId}>
                <Button round justIcon color="success">
                  <Icon>mode_edit</Icon>
                </Button>
              </a>
            </CardFooter>
          </Card>
        </GridItem>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>Your lists</h1>
              <br />
              <GridContainer>
                {!this.state.isLoading && this.renderYourLists(classes, this.state.lists)}
                <GridItem xs={12} sm={4} md={4}>
                  <CreateButton
                    text="Create a New List"
                    onClick={() => this.handleClickOpen("createModal")}
                  />
                  {/* CREATE MODAL START */}
                  <Dialog
                    classes={{
                      root: classes.modalRoot,
                      paper: classes.modal + " " + classes.modalClassic
                    }}
                    open={this.state.createModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose("createModal")}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <Button
                        simple
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        onClick={() => this.handleClose("createModal")}
                      >
                        {" "}
                        <Close className={classes.modalClose} />
                      </Button>
                      <h3
                        className={
                          classes.cardTitle + " " + classes.modalTitle + " " + classes.textCenter
                        }
                      >
                        Create New List
                      </h3>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      <GridContainer>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          className={classes.mrAuto}
                        >
                          <form className={classes.form}>
                            <InputLabel className={classes.label}>
                              Title:
                            </InputLabel>
                            <CustomInput
                              id="title"
                              smallTitle
                              inputProps={{
                                placeholder: "Enter your title here...",
                                onChange: this.changeHandler
                              }}
                              formControlProps={{
                                fullWidth: true
                              }}
                            />
                            <InputLabel className={classes.label}>
                              Description:
                            </InputLabel>
                            <CustomInput
                              id="description"
                              smallDescription
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: "Add your description here...",
                                onChange: this.changeHandler
                              }}
                            />
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
                                value={this.state.occasion}
                                onChange={this.handleSimple}
                                inputProps={{
                                  name: "occasion",
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
                                  value="Baby Shower"
                                >
                                  Baby Shower
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value="Birthday"
                                >
                                  Birthday
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value="Christmas"
                                >
                                  Christmas
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value="Baptism"
                                >
                                  Baptism
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value="Christening"
                                >
                                  Christening
                                </MenuItem>
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value="Other"
                                >
                                  Other
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <div className={classes.root}>
                              <div className={classes.wrapper}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.buttonSuccess}
                                  disabled={this.state.isCreating}
                                  onClick={this.createList}
                                >
                                  Create
                                </Button>
                                {this.state.isCreating && <CircularProgress size={24} className={classes.buttonProgress} />}
                              </div>
                            </div>
                          </form>
                        </GridItem>
                      </GridContainer>
                    </DialogContent>
                  </Dialog>
                  {/* CREATE MODAL END */}
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionLists.propTypes = {
  classes: PropTypes.object
};

export default withRouter(withStyles(createStyle)(SectionLists));
