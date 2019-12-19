import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import config from 'config.js';

import styles from "assets/jss/custom/views/landingPage/yourListsStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const occasionList = ['Baby Shower', 'Birthday', 'Christmas', 'Baptism', 'Christening', 'Other'];

function CreatePopOut(props) {
  const classes = useStyles();
  const { open } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const validateForm = () => {
    return (
      title.length > 0 &&
      description.length > 0 &&
      occasion.length > 0
    );
  }

  const createList = async () => {
    setIsCreating(true);

    const occasion_parsed = occasion.toLowerCase().replace(/\s/g,'');
    const new_image_url = config.imagePrefix + '/images/' + occasion_parsed + '-default.jpg';

    console.log("Creating list with values: title: " + title + ", description: " + description + ", occasion: " + occasion + ", imageUrl: " + new_image_url);

    var createList = {
      "title": title,
      "description": description,
      "occasion": occasion,
      "imageUrl": new_image_url
    }

    const response = await createListRequest(createList);

    const listId = response.listId;
    console.log("List was created with ID (" + listId + "), redirecting to edit page for list.")

    setIsCreating(false);
    props.history.push('/edit/' + listId);
  }

  const createListRequest = (createList) => {
    return API.post("lists", "/", {
      body: createList
    });
  }

  const renderOccasionSelect = () => {
    return (
      <FormControl fullWidth className={classes.selectFormControl}>
        <Select
          MenuProps={{className: classes.selectMenu}}
          classes={{select: classes.select}}
          value={occasion}
          onChange={event => setOccasion(event.target.value)}
          inputProps={{name: "occasion", id: "simple-select"}}
        >
          <MenuItem disabled classes={{root: classes.selectMenuItem}}>
            Select Type
          </MenuItem>
          {renderMenuItems()}
        </Select>
      </FormControl>
    )
  }

  const renderMenuItems = () => {
    return occasionList.map(
      (label, i) =>
          <MenuItem classes={{root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}} value={label} key={i}>
            {label}
          </MenuItem>
    )
  }

  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal + " " + classes.modalClassic
      }}
      open={open}
      TransitionComponent={Transition}
      onClose={() => props.setCreateModal(false)}
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
          onClick={() => props.setCreateModal(false)}
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
                  onChange: event => setTitle(event.target.value)
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
                  onChange: event => setDescription(event.target.value)
                }}
              />
              <InputLabel className={classes.label + " " + classes.date}>
                Occasion:
              </InputLabel>
              {renderOccasionSelect()}
              <div className={classes.root}>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonSuccess}
                    disabled={!validateForm() || isCreating}
                    onClick={createList}
                  >
                    Create
                  </Button>
                  {isCreating && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </div>
            </form>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  )
}

CreatePopOut.propTypes = {
  open: PropTypes.bool,
};

export default withRouter(CreatePopOut);
