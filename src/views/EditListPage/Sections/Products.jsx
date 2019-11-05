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

import styles from "assets/jss/material-kit-pro-react/views/editListSections/productsStyle.jsx";


class SectionProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
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

    const { products } = this.props;

    for (let product of products) {
      this.setState({ [product['productId']]: false });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  handleClickOpen(modal) {
    console.log("Opening product id: " + modal)
    var x = [];
    x[modal] = true;
    this.setState(x);
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
            this.renderProduct(classes, product['productId'], product['img'], product['brand'], product['details'], product['quantity'], product['reserved'])
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
            this.renderMobileProduct(classes, product['productId'], product['img'], product['brand'], product['details'], product['quantity'], product['reserved'])
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

  renderProduct(classes, productId, img, brand, details, quantity, reserved) {
    return (
      [
      <div className={classes.imgContainer} key={1}>
        <img src={img} alt="..." className={classes.img} />
      </div>,
      <span key={1}>
        <a href="#jacket" className={classes.tdNameAnchor}>
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
          <Button link className={classes.actionButton} onClick={() => this.handleClickOpen(productId)}>
            <Assignment />
          </Button>
        </Tooltip>
        <Tooltip
          id="edit"
          title="Edit item"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button link className={classes.actionButton} onClick={() => this.handleClickOpen(productId)}>
            <Edit />
          </Button>
        </Tooltip>
      </span>
      ]
    )
  }

  renderMobileProduct(classes, productId, img, brand, details, quantity, reserved) {
    return (
      [
          <div className={classes.textCenter}>
            <div className={classes.imgContainer} key={1}>
              <img src={img} alt="..." className={classes.img} />
            </div>
            <h4 className={classes.cardTitle}>{brand}</h4>
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
              <Button link className={classes.actionButton} onClick={() => this.handleClickOpen(productId)}>
                <Assignment />
              </Button>
            </Tooltip>
            <Tooltip
              id="edit"
              title="Edit item"
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button link className={classes.actionButton} onClick={() => this.handleClickOpen(productId)}>
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
            open={this.state[product['productId']] }
            productId={product['productId']}
            brand={product['brand']}
            description={product['details']}
            quantity={product['quantity']}
            url={product['url']}
            img={product['img']}
            handleClose={this.handleClose.bind(this)}
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
