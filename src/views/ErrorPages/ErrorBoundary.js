import React from "react";
import { Link } from "react-router-dom";
// Libs
import { logError } from "libs/errorLib";
// Components
import Footer from "components/Footer/FooterGrey.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { withStyles } from '@material-ui/styles';
import styles from "assets/jss/material-kit-pro-react/views/errorPageStyle.js";

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
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={7}>
              <h1 className={classes.title}>Oops!</h1>
              <h2 className={classes.subTitle}>Sorry there was a problem loading this page.</h2>
              <div>
                You could head back to the
                <Link to="/"> home page</Link>
                , or if this keeps happening,
                <Link to="/contact"> drop us a line </Link>
                 so we can quickly fix it.
              </div>

            </GridItem>
          </GridContainer>
        </div>
        <div className={classes.flexer} />
        <Footer />
      </div>
    ) : (
      this.props.children
    );
  }
}


export default withStyles(styles)(ErrorBoundary);
