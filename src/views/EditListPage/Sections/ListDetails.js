import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icons
import Delete from "@material-ui/icons/DeleteOutline";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
// Custom components
import ListsInput from "custom/Inputs/ListsInput.js";
// Sections
import SectionDelete from "./DeleteListPopOut.js";

import config from 'config.js';

import styles from "assets/jss/custom/views/editListPage/listDetailsStyle.js";
const useStyles = makeStyles(styles);

const occasionList = ['Baby Shower', 'Birthday', 'Christmas', 'Baptism', 'Christening', 'Other'];

export default function SectionDetails(props) {
  const classes = useStyles();

  const { listId, title, description, occasion, date, imageUrl } = props;

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [showDeletePopOut, setShowDeletePopOut] = useState(false);

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
    setNewOccasion(occasion);
    setNewDate(date);
    setNewImageUrl(imageUrl);
  }, [title, description, occasion, date, imageUrl])

  const cancelEdit = async () => {
    setNewTitle(title);
    setNewDescription(description);
    setNewOccasion(occasion);
    setNewDate(date);
    setNewImageUrl(imageUrl);
    setIsEdit(false);
  }

  const changeDate = (d) => {
    if (d) {
      const t = typeof d;
      if ( t === 'string') {
        console.log("Date string: " + d + "(" + t + ")")
        setNewDate('');
      } else {
        setNewDate(d.format('DD MMMM YYYY'));
      }
    } else {
      setNewDate('');
    }
  }

  const changeOccasion = (event) => {
    let newOccasion = event.target.value;

    const occasion_parsed = newOccasion.toLowerCase().replace(/\s/g,'');
    let newImageUrl = config.imagePrefix + '/images/' + occasion_parsed + '-default.jpg';

    setNewOccasion(newOccasion);
    setNewImageUrl(newImageUrl);
  }

  const renderOccasionSelect = () => {
    return (
      <FormControl fullWidth className={classes.occasionSelect}>
        <Select
          MenuProps={{className: classes.selectMenu}}
          classes={{select: classes.select}}
          value={newOccasion}
          onChange={changeOccasion}
          inputProps={{name: "occasion", id: "simple-select"}}
        >
          <MenuItem disabled classes={{root: classes.selectMenuItem}}>
            Select Type
          </MenuItem>
          {renderMenuItems(occasionList)}
        </Select>
      </FormControl>
    )
  }

  const saveDetails = async () => {
    try {
      var requestBody = {
        "title": newTitle,
        "description": newDescription,
        "eventDate": newDate,
        "occasion": newOccasion,
        "imageUrl":  newImageUrl,
      };

      console.log('Updating list details: ' + JSON.stringify(requestBody));

      await API.put("lists", "/" + listId, {
        body: requestBody
      });

      setIsEdit(false);
    } catch (e) {
      console.log('Unexpected error occurred when updating list: ' + e.response.data.error);
    }
  }

  const renderMenuItems = () => {
    return occasionList.map(
      (label, i) =>
          <MenuItem classes={{root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}} value={label} key={i}>
            {label}
          </MenuItem>
    )
  }

  const renderView = () => {
    return (
      <div className={classes.container}>
        <GridContainer >
          <GridItem xs={12} sm={7} md={7}>
            <h1 className={classes.title}>
              {newTitle}
            </h1>
            <div className={classes.description}>
              {newDescription}
            </div>
            <GridContainer >
              <GridItem xs={12} sm={4} md={4}>
                <div className={classes.centerMobileText}>
                  <div className={classes.labelWrapper}>
                    <InputLabel className={classes.label}>
                      Date:
                    </InputLabel>
                  </div>
                  <div className={classes.labelValue}>
                    {newDate}
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <div className={classes.centerMobileText}>
                  <div className={classes.labelWrapper}>
                    <InputLabel className={classes.label}>
                      Occasion:
                    </InputLabel>
                  </div>
                  <div className={classes.labelValue}>
                    {newOccasion}
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6} md={6} className={classes.lessGridPadding}>
                <div className={classes.viewButtons}>
                  <Button round color="info" onClick={() => setIsEdit(true)} >
                    <Icon>mode_edit</Icon> Edit
                  </Button>
                  <Button round onClick={() => setShowDeletePopOut(true)} >
                    <Delete /> Delete
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={5} md={5} className={classes.lessGridPadding}>
            <Card profile plain className={classes.customProfile}>
              <CardHeader image plain>
                <a href="#img" onClick={e => e.preventDefault()}>
                  <img src={newImageUrl} className={classes.listImage} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${newImageUrl})`,
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

  const renderEdit = () => {
    return (
      <div className={classes.container}>
        <GridContainer >
          <GridItem xs={12} sm={7} md={7}>
            <ListsInput
              id="title"
              title
              inputProps={{
                placeholder: "Enter your title here...",
                defaultValue: newTitle,
                onChange: event => setNewTitle(event.target.value)
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
            <div className={classes.descriptionEditWrapper}>
              <ListsInput
                id="description"
                description
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: "Add your description here...",
                  defaultValue: newDescription,
                  multiline: true,
                  rows: 2,
                  onChange: event => setNewDescription(event.target.value)
                }}
              />
          </div>
            <GridContainer >
              <GridItem xs={12} sm={4} md={4}>
                <div className={classes.centerMobileText}>
                  <div className={classes.labelWrapper}>
                    <InputLabel className={classes.label}>
                      Date:
                    </InputLabel>
                  </div>
                  <div className={classes.labelValue}>
                    <FormControl fullWidth>
                      <Datetime
                        className={classes.dateSelect}
                        dateFormat="DD MMMM YYYY"
                        timeFormat={false}
                        inputProps={{ placeholder: "Select a date" }}
                        value={newDate}
                        onChange={changeDate}
                        closeOnSelect={true}
                      />
                    </FormControl>
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={2} md={2}>
                <div className={classes.centerMobileText}>
                  <div className={classes.labelWrapper}>
                    <InputLabel className={classes.label}>
                      Occasion:
                    </InputLabel>
                  </div>
                  <div className={classes.labelValue}>
                    {renderOccasionSelect()}
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6} md={6} className={classes.lessGridPadding}>
                <div className={classes.editButtons}>
                  <Button round color="success" onClick={() => saveDetails()} >
                    <Icon>save_alt</Icon> Save
                  </Button>
                  <Button round onClick={() => cancelEdit()} >
                    <Close /> Cancel
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={5} md={5}>
            <Card profile plain className={classes.customProfile}>
              <CardHeader image plain>
                <a href="#img" onClick={e => e.preventDefault()}>
                  <img src={newImageUrl} className={classes.listImage} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${newImageUrl})`,
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

  return (
    <div className={classes.section}>
      { isEdit
        ? renderEdit()
        : renderView()
      }
      <SectionDelete open={showDeletePopOut} listId={listId} setShowDeletePopOut={setShowDeletePopOut}/>
    </div>
  )
}

SectionDetails.propTypes = {
  listId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  occasion: PropTypes.string,
  date: PropTypes.string,
  imageUrl: PropTypes.string
};
