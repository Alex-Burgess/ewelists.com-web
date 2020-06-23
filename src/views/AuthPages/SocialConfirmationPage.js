import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import qs from "qs";
// libs
import { onError } from "libs/errorLib";
import config from 'config.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FooterGrey from "components/Footer/FooterGrey.js";
import HeaderWhite from "components/Header/HeaderWhite.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Custom components
import LetsGoButton from "components/Buttons/LetsGoButton.js"

import styles from "assets/jss/material-kit-pro-react/views/authPageStyle.js";
const useStyles = makeStyles(styles);

const laptopImg = config.imagePrefix + "/images/create-list";

export default function LoginPage(props) {
  const classes = useStyles();
  const history = useHistory();

  const [account, setAccount] = useState('');

  useEffect( () => {
    function checkUrlParams() {
      const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

      if (params['account'] === 'Google' || params['account'] === 'Facebook') {
          setAccount(params['account']);
      } else {
        onError("No account type was provided for final social setup step.");

        history.push({
          pathname: '/login',
          search: '?error=true'
        })
      }
    };

    checkUrlParams();
  }, [props.location.search, history]);


  return (
    <div className={classes.page}>
      <HeaderWhite isAuthenticated={false} mobile={props.mobile}/>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={8} className={classes.gridLogin}>
            <Card className={classes.cardLogin}>
              <CardBody signup>
                <h3 className={classes.title + " " + classes.textCenter}>Welcome to Ewelists</h3>
                <h4 className={classes.textCenter}>
                  Lets get started with creating your first list!
                </h4>
                <div className={classes.imgContainer}>
                  <picture>
                    <source type="image/webp" srcSet={laptopImg + '.webp'} />
                    <source type="image/jpeg" srcSet={laptopImg + '.jpg'} />
                    <img src={laptopImg + '.jpg'} className={classes.createListImage} alt="..." />
                  </picture>
                </div>
                {account
                  ? <LetsGoButton account={account}/>
                : null
                }
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.flexer} />
      <FooterGrey />
    </div>
  );
}
