import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
// @material-ui/icons
import Playlist from "@material-ui/icons/PlaylistAdd";
// @material-ui/core components
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from "components/CustomButtons/Button.jsx";

import withStyles from "@material-ui/core/styles/withStyles";


import createButtonStyle from "assets/jss/material-kit-pro-react/components/createButtonStyle.jsx";

class CreateButton extends React.Component {
  render() {
    const { classes, text, isCreating, ...rest } = this.props;

    return (
        <div className={classes.addList}>
          <div>
          {!isCreating
            ? <div>
                <div className={classes.centerButton}>
                  <Button {...rest} round justIcon color="info" size="lg">
                    <Playlist />
                  </Button>
                </div>
                <p className={classes.cardDescription}>
                  {text}
                </p>
              </div>
          : <div>
              <div className={classes.centerButton}>
                <Button {...rest} round justIcon color="info" size="lg" disabled>
                  <Playlist />
                </Button>
                <CircularProgress className={classes.progress} size={72}/>
              </div>
              <p className={classes.cardDescription}>
                Creating...
              </p>
            </div>
          }
        </div>
      </div>
    );
  }
}

CreateButton.propTypes = {
  classes: PropTypes.object,
  text: PropTypes.string,
  isCreating: PropTypes.bool
};

export default withStyles(createButtonStyle)(CreateButton);
