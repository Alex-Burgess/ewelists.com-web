import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// libs
import { useAppContext } from "libs/contextLib";
import { onError, debugError } from "libs/errorLib";
import { getList, updateList } from "libs/apiLib";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// @material-ui/icons
import Settings from "@material-ui/icons/Settings";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Clear from "@material-ui/icons/Clear";
import Done from "@material-ui/icons/Done";
// core components
import Input from "components/Input/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// Custom components
import HeaderMobileBar from "components/Header/HeaderMobileBar.js";
import Footer from "components/Footer/FooterDark.js";
import ErrorText from "components/Typography/Error.js";
// Sections
import SectionDelete from "./Sections/DeleteListPopOut.js";

import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/views/listSettingsPage/listSettingsPageStyle.js";
const useStyles = makeStyles(styles);

const occasionList = ['Baby Shower', 'Birthday', 'Christmas', 'Baptism', 'Christening', 'Other'];


export default function SectionDetails(props) {
  const classes = useStyles();
  const { setTabTitle } = useAppContext();

  const listId = props.match.params.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState({});
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showDeletePopOut, setShowDeletePopOut] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect( () => {
    function setListState(response) {
      setTabTitle('Editing ' + response.list.title);
      setTitle(response.list.title);
      setDescription(response.list.description);
      setOccasion(response.list.occasion);
      setImageUrl(response.list.imageUrl);
      setProducts(response.products);

      setNewTitle(response.list.title);
      setNewDescription(response.list.description);
      setNewOccasion(response.list.occasion);
      setNewImageUrl(response.list.imageUrl);

      if (('eventDate' in response.list) && (response.list.eventDate !== 'None')) {
        setDate(response.list.eventDate);
        setNewDate(response.list.eventDate);
      } else {
        setDate('');
        setNewDate('');
      }
    }

    const setListDetails = async () => {
      try {
        const response = await getList(listId);
        setListState(response);
      } catch (e) {
        setLoadError(true);
      }
    };

    setListDetails();
    setLoaded(true);
  }, [listId, setTabTitle]);

  const saveDetails = async () => {
    try {
      await updateList(listId, newTitle, newDescription, newDate, newOccasion, newImageUrl)

      setTitle(newTitle);
      setDescription(newDescription);
      setOccasion(newOccasion);
      setDate(newDate);
      setImageUrl(newImageUrl);
      setEdit(false);
    } catch (e) {
      onError(e);
    }
  }

  const cancelEdit = async () => {
    setNewTitle(title);
    setNewDescription(description);
    setNewOccasion(occasion);
    setNewDate(date);
    setNewImageUrl(imageUrl);
    setEdit(false);
  }

  const changeDate = (d) => {
    if (d) {
      const t = typeof d;
      if ( t === 'string') {
        debugError("Date string: " + d + "(" + t + ")")
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

  const renderMenuItems = () => {
    return occasionList.map(
      (label, i) =>
          <MenuItem classes={{root: classes.selectMenuItem, selected: classes.selectMenuItemSelected}} value={label} key={i}>
            {label}
          </MenuItem>
    )
  }

  const renderDetailsSection = () => {
    return (
      <div>
        <GridContainer>
          <GridItem xs={8}>
            <h3 className={classes.title + " " + classes.sectionHeading}>Details</h3>
          </GridItem>
          <GridItem xs={4} className={classes.mobileButtons}>
            { edit
              ? <div>
                  <Button justIcon size="sm" className={classes.alignButtonToBottom} onClick={() => cancelEdit(false)} data-cy="button-mobile-cancel">
                    <Clear />
                  </Button>
                  <Button justIcon size="sm" color="success" className={classes.alignButtonToBottom} onClick={() => saveDetails()} data-cy="button-mobile-save" >
                    <Done />
                  </Button>
                </div>
              : <Button size="sm" color="primary" className={classes.alignButtonToBottom} onClick={() => setEdit(true)} data-cy="button-mobile-edit" >
                  Edit
                </Button>
            }
          </GridItem>
        </GridContainer>
        <hr className={classes.sectionRule}/>
        <GridContainer>
          <GridItem md={9} sm={9}>
            <InputLabel>
              Title:
            </InputLabel>
            <Input
              id="title"
              formControlProps={{
                fullWidth: true,
                className: classes.formControl
              }}
              inputProps={{
                value: newTitle,
                disabled: edit ? false : true ,
                className: edit ? null : classes.inputCustom,
                onChange: event => setNewTitle(event.target.value)
              }}
            />
            <InputLabel>
              Description:
            </InputLabel>
            <Input
              id="description"
              formControlProps={{
                fullWidth: true,
                className: classes.formControl
              }}
              inputProps={{
                value: newDescription,
                multiline: true,
                rows: 4,
                disabled: edit ? false : true ,
                className: edit ? null : classes.inputCustom,
                onChange: event => setNewDescription(event.target.value)
              }}
            />
            <GridContainer>
              <GridItem xs={12} sm={5} md={5}>
                <GridContainer>
                  <GridItem xs={6} sm={12} md={12}>
                    <InputLabel className={classes.dateLabel}>
                      Date:
                    </InputLabel>
                    { edit
                      ? <FormControl fullWidth>
                          <Datetime
                            className={classes.dateField + " datepicker"}
                            dateFormat="DD MMMM YYYY"
                            timeFormat={false}
                            inputProps={{ placeholder: "Select a date" }}
                            value={newDate}
                            onChange={changeDate}
                            closeOnSelect={true}
                          />
                        </FormControl>
                      : <p>{newDate}</p>
                    }
                  </GridItem>
                  <GridItem xs={6} sm={12} md={12}>
                    <InputLabel className={classes.occasionLabel}>
                      Occasion:
                    </InputLabel>
                    { edit
                      ? <FormControl fullWidth>
                          <Select
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
                      : <p>{newOccasion}</p>
                    }
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={7} md={7}>
                <Card profile plain className={classes.customProfile}>
                  <CardHeader image plain>
                    <img src={newImageUrl} className={classes.listImage} alt="..." />
                    <div
                      style={{
                        backgroundImage: `url(${newImageUrl})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem md={3} sm={3} className={classes.sectionButtons}>
            { edit
              ? <div>
                  <Button onClick={() => cancelEdit(false)} data-cy="button-cancel">
                    Cancel
                  </Button>
                  <Button color="success" onClick={() => saveDetails()} data-cy="button-save">
                    Save
                  </Button>
                </div>
              : <Button color="primary" onClick={() => setEdit(true)} data-cy="button-edit" >
                  Edit
                </Button>
            }
          </GridItem>
        </GridContainer>
      </div>
    )
  }

  const renderStatusSection = () => {
    return (
      <div>
        <GridContainer>
          <GridItem xs={9}>
            <h3 className={classes.title + " " + classes.sectionHeading}>Status</h3>
          </GridItem>
          <GridItem xs={3} className={classes.mobileButtons}>
            <Button size="sm" color="primary" disabled className={classes.alignButtonToBottom} >
              Close
            </Button>
          </GridItem>
        </GridContainer>
        <hr className={classes.sectionRule}/>
        <GridContainer>
          <GridItem md={9} sm={9}>
            <p>
              Your list is currently active! The friends and family that you have shared this list with, can view this list.
            </p>
            <p>
              If you would like this list to no longer be available to your friends and family you can close it.
            </p>
            <p>
              The list will remain available to you.
            </p>
          </GridItem>
          <GridItem md={3} sm={3} className={classes.sectionButtons}>
            <Button color="primary" disabled>
              Close
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    )
  }

  const renderDeleteSection = () => {
    return (
      <div>
        <GridContainer>
          <GridItem xs={9}>
            <h3 className={classes.title + " " + classes.sectionHeading}>Delete</h3>
          </GridItem>
          <GridItem xs={3} className={classes.mobileButtons}>
            <Button size="sm" color="danger" className={classes.alignButtonToBottom} onClick={() => setShowDeletePopOut(true)} data-cy="button-mobile-delete">
              Delete
            </Button>
          </GridItem>
        </GridContainer>
        <hr className={classes.sectionRule}/>
        <GridContainer>
          <GridItem md={9} sm={9}>
            <p>
              Deleting a list is <b>permenant</b>, so please be certain this is what you want to do.
            </p>
          </GridItem>
          <GridItem md={3} sm={3} className={classes.sectionButtons}>
            <Button color="danger" onClick={() => setShowDeletePopOut(true)} data-cy="button-delete">
              Delete
            </Button>
          </GridItem>
        </GridContainer>
        <div className={classes.spacer} />
      </div>
    )
  }

  return (
    <div>
      <HeaderMobileBar url={"/edit/" + listId} title='List Settings' />
      <div className={classes.main}>
        <div className={classes.container}>
          <h2 className={classes.title + " " + classes.textCenter + " " + classes.mobileHide}><Settings className={classes.icon}/> Settings</h2>
          <Link to={"/edit/" + listId} className={classes.mobileHide}>
            <Button color="primary" simple className={classes.backButton}>
              <ArrowBackIos /> Back to list
            </Button>
          </Link>
          {loadError
            ? <div className={classes.textCenter}>
                <ErrorText>
                  There was an unexpected error.
                </ErrorText>
              </div>
            : loaded
              ? <div>
                  {renderDetailsSection()}
                  {renderStatusSection()}
                  {renderDeleteSection()}
                </div>
              : null
          }
        </div>
        <div className={classes.flexer} />
      </div>
      <Footer />
      <SectionDelete open={showDeletePopOut} listId={listId} setShowDeletePopOut={setShowDeletePopOut} products={products}/>
    </div>
  )
}
