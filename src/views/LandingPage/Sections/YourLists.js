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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Info from "components/Typography/Info.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CircularProgress from '@material-ui/core/CircularProgress';
// Custom Buttons
import CreateButton from "custom/Buttons/CreateButton.js";


import createStyle from "assets/jss/custom/views/landingPage/yourListsStyle.js";
import config from 'config.js';

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
      ownedLists: [],
      shareLists: [],
      createModal: false,
      title: '',
      description: '',
      occasion: '',
      occasionList: ['Baby Shower', 'Birthday', 'Christmas', 'Baptism', 'Christening', 'Other']
    };
  }

  async componentDidMount() {
    const response = await this.getLists();
    this.setState({ ownedLists: response.owned });
    this.setState({ sharedLists: response.shared });
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

  validateForm() {
    return (
      this.state.title.length > 0 &&
      this.state.description.length > 0 &&
      this.state.occasion.length > 0
    );
  }

  createList = async event => {
    this.setState({ isCreating: true });

    const occasion_parsed = this.state.occasion.toLowerCase().replace(/\s/g,'');
    const new_image_url = config.imagePrefix + '/images/' + occasion_parsed + '-default.jpg';

    console.log("Creating list with values: title: " + this.state.title + ", description: " + this.state.description + ", occasion: " + this.state.occasion + ", imageUrl: " + new_image_url);

    var createList = {
      "title": this.state.title,
      "description": this.state.description,
      "occasion": this.state.occasion,
      "imageUrl": new_image_url
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

  renderYourLists(classes, lists: Lists[], shared) {
    let allLists: Lists[] = [];

    return allLists.concat(lists).map (
      (list, i) =>
        <GridItem xs={12} sm={4} md={4} key={i}>
          <Card profile>
            <CardHeader image>
              <a href={"/lists/" + list.listId}>
                <img src={list.imageUrl} className={classes.listImage} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${list.imageUrl})`,
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody>
              <Info>
                <a href={"/lists/" + list.listId}>
                  <h6 className={classes.cardCategory}>{list.title}</h6>
                </a>
              </Info>
              <p className={classes.cardDescription}>
                {list.occasion}
              </p>
            </CardBody>
            {shared
              ? <CardFooter profile className={classes.justifyContentCenter}>
                  <a href={"/lists/" + list.listId}>
                    <Button round color="info" className={classes.reserveButton2}>
                      Shop List
                    </Button>
                  </a>
                </CardFooter>
              : <CardFooter profile className={classes.justifyContentCenter}>
                  <a href={"/lists/" + list.listId}>
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
            }
          </Card>
        </GridItem>
    )
  }

  renderOccasionSelect(classes) {
    return (
      <FormControl fullWidth className={classes.selectFormControl}>
        <Select
          MenuProps={{className: classes.selectMenu}}
          classes={{select: classes.select}}
          value={this.state.occasion}
          onChange={this.handleSimple}
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

  renderCreatePopOut(classes){
    return (
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
                {this.renderOccasionSelect(classes)}
                <div className={classes.root}>
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonSuccess}
                      disabled={!this.validateForm() || this.state.isCreating}
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
                {!this.state.isLoading && this.renderYourLists(classes, this.state.ownedLists, false)}
                <GridItem xs={12} sm={4} md={4}>
                  <CreateButton
                    text="Create a New List"
                    onClick={() => this.handleClickOpen("createModal")}
                  />
                  {this.renderCreatePopOut(classes)}
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>Lists Shared With You</h1>
              <br />
              <GridContainer>
                {!this.state.isLoading && this.renderYourLists(classes, this.state.sharedLists, true)}
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
