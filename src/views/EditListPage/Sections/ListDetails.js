import React, { useState } from 'react';
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// Custom components
import ShareButton from "custom/Buttons/ShareButton.js";
import { Facebook } from "custom/Share/Share.js";
import config from 'config.js';

import styles from "assets/jss/custom/views/editListPage/listDetailsStyle.js";
const useStyles = makeStyles(styles);

const copy = require('clipboard-copy')

export default function SectionDetails(props) {
  const classes = useStyles();

  const { listId, title, description, occasion, date, imageUrl, mobile, user, closed } = props;

  const listUrl = config.rootDomain + "/lists/" + listId;
  const mailToText = "mailto:?subject=" + user.name + " shared a gift list with you&body=Hi!%0D%0A%0D%0AYou can view " + title + " at the link below if you wish to buy a gift:%0D%0A%0D%0A" + listUrl;
  const whatsAppLink = "whatsapp://send?text=View " + title + " here: " + listUrl;
  const fbMobileLink = "fb-messenger://share/?link=" + encodeURIComponent(listUrl) + "&app_id=1053511994854271";

  const [showCopied, setShowCopied] = useState(false);

  const copyLink = () => {
    copy(listUrl);
    setShowCopied(true);

    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer >
          <GridItem xs={12} sm={7} md={7}>
            <GridContainer >
              <GridItem xs={10} sm={12} md={12}>
                <h1 className={classes.title}>
                  {title}
                </h1>
              </GridItem>
              <GridItem xs={2} sm={12} md={12} className={classes.cogMobile}>
                <Link to={"/settings/" + listId}>
                  <Button round justIcon simple>
                    <i className="fas fa-cog"></i>
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
            <h6 className={classes.event}>
              {occasion}, {date}
            </h6>
            <div className={classes.description}>
              {description}
            </div>
            {closed
              ? <SnackbarContent
                  message={
                    <span className={classes.message}>
                      This list is now closed.
                    </span>
                  }
                  color="success"
                  icon="info_outline"
                />
              : <GridContainer >
                  <GridItem xs={12} sm={8} md={9}>
                    <div className={classes.centerMobileText}>
                      <a href={mailToText}>
                        <ShareButton color="default" round simple justIcon>
                          <i className="far fa-envelope" />
                        </ShareButton>
                      </a>
                      { mobile
                        ? <span>
                            <a href={fbMobileLink}>
                              <ShareButton color="facebookMessenger" round simple justIcon>
                                <i className="fab fa-facebook-messenger" />
                              </ShareButton>
                            </a>
                            <a href={whatsAppLink} data-action="share/whatsapp/share">
                              <ShareButton color="whatsapp" round simple justIcon>
                                <i className="fab fa-whatsapp" />
                              </ShareButton>
                            </a>
                          </span>
                        : <ShareButton color="facebookMessenger" round simple justIcon onClick={() => Facebook(listUrl)}>
                            <i className="fab fa-facebook-messenger" />
                          </ShareButton>
                      }
                      <ShareButton color="share" round simple onClick={() => copyLink() }>
                        <i className="fas fa-share-alt" />
                        <span className={classes.shareText}>
                          { showCopied
                            ? 'Copied!'
                            : 'Share'
                          }
                        </span>
                      </ShareButton>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3} className={classes.cogDesktop}>
                    <Link to={"/settings/" + listId}>
                      <Button round simple>
                        <i className="fas fa-cog"></i>
                        <span className={classes.shareText}>
                          Settings
                        </span>
                      </Button>
                    </Link>
                  </GridItem>
                </GridContainer>
            }
          </GridItem>
          <GridItem xs={12} sm={5} md={5} className={classes.lessGridPadding}>
            <Card profile plain className={classes.customProfile}>
              <CardHeader image plain>
                <img src={imageUrl} className={classes.listImage} alt="..." />
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
    </div>
  )
}

SectionDetails.propTypes = {
  listId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  occasion: PropTypes.string,
  date: PropTypes.string,
  imageUrl: PropTypes.string,
  mobile: PropTypes.bool,
  user: PropTypes.object
};
