/*!

=========================================================
* Material Kit PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui icons
// core components
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import styles from "assets/jss/custom/views/editListPage/reservedStyle.jsx";


class SectionProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: {},
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });

    if (window.innerWidth < 600){
      this.setState({ desktop: false });
    } else {
      this.setState({ desktop: true });
    }
  };

  componentWillMount() {
    if (window.innerWidth < 600){
      this.setState({ desktop: false });
    } else {
      this.setState({ desktop: true });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleEditClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState({ edit: x });
  }

  handleEditClickOpen(modal) {
    console.log("Opening product id: " + modal)
    var x = [];
    x[modal] = true;
    this.setState({ edit: x });
  }

  renderDesktopView(classes, reserved) {
    return (
      <Table
        tableHead={[
          "",
          "NAME",
          "QTY",
          "MESSAGE"
        ]}
        tableData={
          this.renderDesktopTable(classes, reserved)
        }
        tableShopping
        customHeadCellClasses={[
          classes.textCenter,
          classes.textCenter,
        ]}
        customHeadClassesForCells={[2, 3]}
        customCellClasses={[
          classes.tdNumber + " " + classes.textCenter,
          classes.textCenter + " " + classes.tdMessage
        ]}
        customClassesForCells={[2, 3]}
      />
    )
  }

  renderMobileView(classes, reserved) {
    return (
      <Table
        tableHead={[
          "", ""
        ]}
        tableData={
          this.renderMobileTable(classes, reserved)
        }
        tableShopping
      />
    )
  }

  renderDesktopTable(classes, reserved: Reserved[]) {
    const allRows = reserved.map(
      (row, i) =>
            this.renderDesktopRow(classes, this.props.products[row['productId']].productUrl, this.props.products[row['productId']].imageUrl, row['name'], row['message'], row['quantity'])
    )

    allRows[reserved.length] =
      {
        addnew: true,
        colspan: "1",
        col: {
          colspan: 3,
        }
      }

    return allRows
  }

  renderMobileTable(classes, reserved: Reserved[]) {
    const allRows = reserved.map(
      (row, i) =>
            this.renderMobileRow(classes, this.props.products[row['productId']].productUrl, this.props.products[row['productId']].imageUrl, row['name'], row['message'], row['quantity'])
    )

    allRows[reserved.length] =
      {
        addnew: true,
        colspan: "1",
        col: {
          colspan: 1,
        }
      }

    return allRows
  }

  renderDesktopRow(classes, productUrl, imageUrl, userName, message, quantity) {
    return (
      [
      <div className={classes.imgContainer} key={1}>
        <a href={productUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt="..." className={classes.img} />
        </a>
      </div>,
      <span>
        {userName}
      </span>,
      <span>
        {quantity}
      </span>,
      <span>
        {message}
      </span>
      ]
    )
  }

  renderMobileRow(classes, productUrl, imageUrl, userName, message, quantity) {
    return (
      [
          <div className={classes.textCenter}>
            <div className={classes.imgContainer} key={1}>
              <a href={productUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt="..." className={classes.img} />
              </a>
            </div>
            <small className={classes.quantities}>
              Quantity: {quantity}
            </small>
          </div>,
          <div className={classes.textCenter}>
            <h4 className={classes.cardTitle}>
              {userName}
            </h4>
            <small className={classes.mobileDescription}>
              {message}
            </small>
          </div>
      ]
    )
  }

  render() {
    const { classes, reserved } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              {
                this.state.desktop
                ? this.renderDesktopView(classes, reserved)
                : this.renderMobileView(classes, reserved)
              }
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

SectionProducts.propTypes = {
  classes: PropTypes.object,
  reserved: PropTypes.array,
  products: PropTypes.object
};

export default withStyles(styles)(SectionProducts);
