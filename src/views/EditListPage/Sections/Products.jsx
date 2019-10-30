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
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// core components
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
// Sections
import SectionAdd from "./AddProductPopOut.jsx";
import SectionEdit from "./EditProductPopOut.jsx";

import styles from "assets/jss/material-kit-pro-react/views/editListSections/productsStyle.jsx";


class SectionProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      editModal: false
    };
  }

  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }

  renderProduct(classes, img, brand, details, price, quantity, reserved) {
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
        <small className={classes.tdNumberSmall}>£</small> {price}
      </span>,
      <span key={1}>
        {quantity}
      </span>,
      <span key={1}>
        {reserved}
      </span>,
      <Tooltip
        key={1}
        id="close1"
        title="Edit item"
        placement="left"
        classes={{ tooltip: classes.tooltip }}
      >
        <Button link className={classes.actionButton} onClick={() => this.handleClickOpen("editModal")}>
          <Edit />
        </Button>
      </Tooltip>
      ]
    )
  }

  renderProducts(classes, products: Products[]) {
    const allproducts = products.map(
      (product, i) =>
            this.renderProduct(classes, product['img'], product['brand'], product['details'], product['price'], product['quantity'], product['reserved'])
    )

    allproducts[products.length] =
      {
        addnew: true,
        colspan: "3",
        col: {
          colspan: 3,
          text: (
            <Button color="info" round onClick={() => this.handleClickOpen("addModal")}>
              Add New Item <KeyboardArrowRight />
            </Button>
          )
        }
      }

    return allproducts
  }



  render() {
    const { classes, products } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <Table
                tableHead={[
                  "",
                  "PRODUCT",
                  "PRICE",
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
            </CardBody>
          </Card>
          <SectionAdd open={this.state.addModal} handleClose={this.handleClose.bind(this)} />
          <SectionEdit open={this.state.editModal} handleClose={this.handleClose.bind(this)} />
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