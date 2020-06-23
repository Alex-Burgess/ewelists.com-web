import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
// libs
import { onError, debugError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
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
import Input from "components/Input/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import ErrorText from "components/Typography/Error.js";

import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/views/dashboardPage/createListStyle.js";
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const occasionList = ['Baby Shower', 'Birthday', 'Christmas', 'Baptism', 'Christening', 'Other'];

function CreatePopOut(props) {
  const classes = useStyles();
  const history = useHistory();

  const { open } = props;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const changeDate = (d) => {
    if (d) {
      const t = typeof d;
      if ( t === 'string') {
        debugError("Date string: " + d + "(" + t + ")")
        setDate('');
      } else {
        setDate(d.format('DD MMMM YYYY'));
      }
    } else {
      setDate('');
    }
  }

  const validateForm = () => {
    return (
      title.length > 0 &&
      description.length > 0 &&
      date.length > 0 &&
      occasion.length > 0
    );
  }

  const createList = async () => {
    setIsCreating(true);

    const occasion_parsed = occasion.toLowerCase().replace(/\s/g,'');
    const new_image_url = config.imagePrefix + '/images/' + occasion_parsed + '-default.jpg';

    debugError("Creating list with values: title: " + title + ", description: " + description + ", date: " + date + ", occasion: " + occasion + ", imageUrl: " + new_image_url);

    var createList = {
      "title": title,
      "description": description,
      "eventDate": date,
      "occasion": occasion,
      "imageUrl": new_image_url
    }

    let response;
    try {
      response = await createListRequest(createList);
      const listId = response.listId;
      debugError("List was created with ID (" + listId + "), redirecting to edit page for list.")

      setIsCreating(false);
      history.push('/edit/' + listId);
    } catch (e) {
      console.log('Response: ' + JSON.stringify(e.response.data.error));
      onError(e);
      setIsCreating(false);
      setError('There was an unexpected error, if this persists please contact us.');
    }
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
        paper: classes.modal + " " + classes.modalCustom
      }}
      open={open}
      TransitionComponent={Transition}
      onClose={() => props.setCreate(false)}
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
          onClick={() => props.setCreate(false)}
        >
          {" "}
          <Close className={classes.modalClose} />
        </Button>
        <h3
          className={
            classes.cardTitle + " " + classes.modalTitle + " " + classes.textCenter
          }
        >
          Enter List Details
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
              <Input
                labelText="Title"
                id="title"
                formControlProps={{
                  fullWidth: true,
                  value: title,
                  onChange: event => setTitle(event.target.value),
                  className: classes.inputProps
                }}
              />
              <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={6} className={classes.selectGrid}>
                  <InputLabel className={classes.label}>
                    Date:
                  </InputLabel>
                  <FormControl fullWidth>
                    <Datetime
                      className={classes.dateField}
                      dateFormat="DD MMMM YYYY"
                      timeFormat={false}
                      inputProps={{name: "date", placeholder: "Select a date" }}
                      value={date}
                      onChange={changeDate}
                      closeOnSelect={true}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} className={classes.selectGrid + " " + classes.occasionGrid}>
                  <InputLabel className={classes.label + " " + classes.date}>
                    Occasion:
                  </InputLabel>
                  {renderOccasionSelect()}
                </GridItem>
              </GridContainer>
              <Input
                labelText="Description"
                id="description"
                formControlProps={{
                  fullWidth: true,
                  className: classes.createFormControl
                }}
                inputProps={{
                  onChange: event => setDescription(event.target.value),
                  multiline: true,
                  rows: 3,
                }}
              />
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
            {error
              ? <div className={classes.errorContainer}>
                  <ErrorText>
                    <p>{error}</p>
                  </ErrorText>
                </div>
              : null
            }
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  )
}

CreatePopOut.propTypes = {
  open: PropTypes.bool,
};

export default CreatePopOut;
