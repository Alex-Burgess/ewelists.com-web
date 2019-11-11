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
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui icons
import Edit from "@material-ui/icons/Edit";
import Assignment from "@material-ui/icons/AssignmentInd";
// core components
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
// Sections
import SectionEdit from "./EditProductPopOut.jsx";
import SectionReserve from "./ReserveDetailsPopOut.jsx";

import styles from "assets/jss/material-kit-pro-react/views/editListSections/productsStyle.jsx";


class SectionProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: {},
      reserve: {},
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

  handleReserveClickOpen(modal) {
    console.log("Opening product id: " + modal)
    var x = [];
    x[modal] = true;
    this.setState({ reserve: x });
  }

  handleReserveClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState({ reserve: x });
  }

  renderDesktopProductView(classes, products) {
    return (
      <Table
        tableHead={[
          "",
          "PRODUCT",
          "QTY",
          "RESERVED",
          ""
        ]}
        tableData={
          this.renderProducts(classes, products)
        }
        tableShopping
        customHeadCellClasses={[
          classes.textCenter,
          classes.textCenter,
          classes.textCenter,

        ]}
        customHeadClassesForCells={[2, 3, 4]}
        customCellClasses={[
          classes.tdName,
          classes.tdNumber + " " + classes.textCenter,
          classes.tdNumber + " " + classes.textCenter,
          classes.tdNumber + " " + classes.textCenter,
          classes.textCenter,
        ]}
        customClassesForCells={[1, 2, 3, 4, 5]}
      />
    )
  }

  renderMobileProductView(classes, products) {
    return (
      <Table
        tableHead={[
          ""
        ]}
        tableData={
          this.renderMobileProducts(classes, products)
        }
        tableShopping
      />
    )
  }

  renderProducts(classes, products: Products[]) {
    const allproducts = products.map(
      (product, i) =>
            this.renderProduct(classes, product['productId'], product['productUrl'], product['imageUrl'], product['brand'], product['details'], product['quantity'], product['reserved'])
    )

    allproducts[products.length] =
      {
        addnew: true,
        colspan: "3",
        col: {
          colspan: 3,
        }
      }

    return allproducts
  }

  renderMobileProducts(classes, products: Products[]) {
    const allproducts = products.map(
      (product, i) =>
            this.renderMobileProduct(classes, product['productId'], product['productUrl'], product['imageUrl'], product['brand'], product['details'], product['quantity'], product['reserved'])
    )

    allproducts[products.length] =
      {
        addnew: true,
        colspan: "3",
        col: {
          colspan: 3,
        }
      }

    return allproducts
  }

  renderProduct(classes, productId, productUrl, imageUrl, brand, details, quantity, reserved) {
    return (
      [
      <div className={classes.imgContainer} key={1}>
        <a href={productUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt="..." className={classes.img} />
        </a>
      </div>,
      <span key={1}>
        <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
          {brand}
        </a>
        <br />
        <small className={classes.tdNameSmall}>
          {details}
        </small>
      </span>,
      <span key={1}>
        {quantity}
      </span>,
      <span key={1}>
        {reserved}
      </span>,
      <span>
        <Tooltip
          id="reserved"
          title="See reserved details"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button link className={classes.actionButton} onClick={() => this.handleReserveClickOpen(productId)}>
            <Assignment />
          </Button>
        </Tooltip>
        <Tooltip
          id="edit"
          title="Edit item"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button link className={classes.actionButton} onClick={() => this.handleEditClickOpen(productId)}>
            <Edit />
          </Button>
        </Tooltip>
      </span>
      ]
    )
  }

  renderMobileProduct(classes, productId, productUrl, imageUrl, brand, details, quantity, reserved) {
    return (
      [
          <div className={classes.textCenter}>
            <div className={classes.imgContainer} key={1}>
              <a href={productUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt="..." className={classes.img} />
              </a>
            </div>
            <h4 className={classes.cardTitle}>
              <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
                {brand}
              </a>
            </h4>
            <small className={classes.mobileDescription}>
              {details}
            </small>
            <br />
            <small className={classes.quantities}>
              Quantity: {quantity}
            </small>
            <br />
            <small className={classes.quantities}>
              Reserved: {reserved}
            </small>
            <br />
            <Tooltip
              id="reserved"
              title="See reserved details"
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button link className={classes.actionButton} onClick={() => this.handleReserveClickOpen(productId)}>
                <Assignment />
              </Button>
            </Tooltip>
            <Tooltip
              id="edit"
              title="Edit item"
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button link className={classes.actionButton} onClick={() => this.handleEditClickOpen(productId)}>
                <Edit />
              </Button>
            </Tooltip>
          </div>
      ]
    )
  }

  renderEditPopOuts(classes, products: Products[]) {
    return products.map(
      (product, i) =>
          <SectionEdit
            open={this.state.edit[product['productId']]
              ? this.state.edit[product['productId']]
              : false }
            product={product}
            handleClose={this.handleEditClose.bind(this)}
            deleteProductFromState={this.props.deleteProductFromState.bind(this)}
            updateProductToState={this.props.updateProductToState.bind(this)}
            getListId={this.props.getListId.bind(this)}
            key={i}
          />
    )
  }

  renderReservePopOuts(classes, products: Products[]) {
    return products.map(
      (product, i) =>
          <SectionReserve
            open={this.state.reserve[product['productId']]
              ? this.state.reserve[product['productId']]
              : false}
            product={product}
            handleClose={this.handleReserveClose.bind(this)}
            key={i}
          />
    )
  }

  render() {
    const { classes, products } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              {
                this.state.desktop
                ? this.renderDesktopProductView(classes, products)
                : this.renderMobileProductView(classes, products)
              }

            </CardBody>
          </Card>
          {this.renderEditPopOuts(classes, products)}
          {this.renderReservePopOuts(classes, products)}
        </div>
      </div>
    );
  }
}

SectionProducts.propTypes = {
  classes: PropTypes.object,
  products: PropTypes.array
};

export default withStyles(styles)(SectionProducts);
