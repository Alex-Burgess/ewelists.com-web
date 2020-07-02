import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// libs
import { onError } from "libs/errorLib";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Update from "@material-ui/icons/ListAlt";
import ViewIcon from "@material-ui/icons/Visibility";
import Add from "@material-ui/icons/Add";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Primary from "components/Typography/Primary.js";
// Sections
import CreateList from "./CreateList.js";

import { GetLists } from "./YourListsApi";

import styles from "assets/jss/material-kit-pro-react/views/dashboardPage/yourListsStyle.js";
const useStyles = makeStyles(styles);

export default function YourLists(props) {
  const classes = useStyles();

  const { showCreate } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [openLists, setOpenLists] = useState([]);
  const [closedLists, setClosedLists] = useState([]);

  useEffect( () => {
    async function getLists(){
      let response;
      try {
        response = await GetLists();
        setOpenLists(response.owned);
        setClosedLists(response.closed);
      } catch (e) {
        onError(e);
      }
    }

    function updateTab(){
      props.setTabTitle('Your Lists');
    }

    getLists();
    updateTab();
    setIsLoading(false);
  }, [props]);

  const renderOpenLists = (lists: Lists[]) => {
    let allLists: Lists[] = [];

    return allLists.concat(lists).map (
      (list, i) =>
        <GridItem xs={12} sm={4} md={4} key={i}>
          <Card profile>
            <CardHeader image>
              <Link to={"/edit/" + list.listId}>
                <img src={list.imageUrl} className={classes.listImage} alt="..." />
              </Link>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${list.imageUrl})`,
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody>
              <Primary>
                <Link to={"/edit/" + list.listId}>
                  <h6 className={classes.cardCategory}>{list.title}</h6>
                </Link>
              </Primary>
              <p className={classes.cardDescription}>
                {list.occasion}
              </p>
            </CardBody>
              <CardFooter profile className={classes.justifyContentCenter}>
                <Link to={"/lists/" + list.listId}>
                  <Button round color="primary2" className={classes.customButton}>
                    <ViewIcon /> View
                  </Button>
                </Link>
                <Link to={"/edit/" + list.listId}>
                  <Button round color="primary" className={classes.customButton}>
                    <Icon>mode_edit</Icon> Edit
                  </Button>
                </Link>
              </CardFooter>
          </Card>
        </GridItem>
    )
  }

  const renderClosedLists = (lists: Lists[]) => {
    let allLists: Lists[] = [];

    return allLists.concat(lists).map (
      (list, i) =>
        <GridItem xs={12} sm={4} md={4} key={i}>
          <Card profile>
            <CardHeader image>
              <Link to={"/edit/" + list.listId}>
                <img src={list.imageUrl} className={classes.listImage} alt="..." />
              </Link>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${list.imageUrl})`,
                  opacity: "1"
                }}
              />
            </CardHeader>
            <CardBody>
              <Primary>
                <Link to={"/edit/" + list.listId}>
                  <h6 className={classes.cardCategory}>{list.title}</h6>
                </Link>
              </Primary>
              <p className={classes.cardDescription}>
                {list.occasion} - closed
              </p>
            </CardBody>
              <CardFooter profile className={classes.justifyContentCenter}>
                <Link to={"/edit/" + list.listId}>
                  <Button round color="primary" className={classes.customButton}>
                    <Icon>mode_edit</Icon> Details
                  </Button>
                </Link>
              </CardFooter>
          </Card>
        </GridItem>
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2 className={classes.title}><Update className={classes.icon}/>Your Lists</h2>
        <br />
        <GridContainer>
          {!isLoading && renderOpenLists(openLists)}
          {!isLoading && renderClosedLists(closedLists)}
          <GridItem xs={12} sm={4} md={4} className={classes.addList}>
              <div className={classes.centerButton}>
                <Button round justIcon color="secondary" size="lg" onClick={() => props.setCreate(true)}>
                  <Add />
                </Button>
                <div className={classes.createText}>
                  Create a New List
                </div>
              </div>
          </GridItem>
        </GridContainer>
        <CreateList open={showCreate} setCreate={props.setCreate} />
      </div>
    </div>
  );
}

YourLists.propTypes = {
  showCreate: PropTypes.bool,
};
