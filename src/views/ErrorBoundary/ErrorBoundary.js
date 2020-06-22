import React from "react";
import { logError } from "libs/errorLib";
import HeaderFixed from "components/Header/HeaderFixed.js";
import FooterGrey from "components/Footer/FooterGrey.js";

import { withStyles } from '@material-ui/styles';
import styles from "assets/jss/material-kit-pro-react/views/errorBoundaryStyle.js";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    const { classes } = this.props;

    return this.state.hasError ? (
      <div className={classes.page}>
        <HeaderFixed isAuthenticated={false} mobile={this.props.mobile}/>
          <div className={classes.main}>
            <div className={classes.section}>
              <div className={classes.container}>
                <h3>Sorry there was a problem loading this page</h3>
              </div>
            </div>
          </div>
        <div className={classes.flexer} />
        <FooterGrey />
      </div>
    ) : (
      this.props.children
    );
  }
}


export default withStyles(styles)(ErrorBoundary);
