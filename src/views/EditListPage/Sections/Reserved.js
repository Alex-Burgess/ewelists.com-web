import React from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui icons
// core components
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/custom/views/editListPage/reservedStyle.js";
const useStyles = makeStyles(styles);

export default function SectionProducts(props) {
  const classes = useStyles();
  const { mobile, reserved, products } = props;

  const renderDesktopView = () => {
    return (
      <Table
        tableHead={[
          "",
          "ITEM",
          "QTY",
          "RESERVED BY"
        ]}
        tableData={
          renderDesktopTable()
        }
        tableShopping
        customHeadCellClasses={[
          classes.textCenter,
          classes.textCenter,
        ]}
        customHeadClassesForCells={[2, 3]}
        customCellClasses={[
          classes.tdName,
          classes.tdNumber + " " + classes.textCenter,
          classes.textCenter + " " + classes.tdName
        ]}
        customClassesForCells={[1, 2, 3, 4]}
      />
    )
  }

  const renderMobileView = () => {
    return (
      <Table
        tableHead={[
          "RESERVED ITEMS"
        ]}
        tableData={
          renderMobileTable()
        }
        tableShopping
        customHeadCellClasses={[
          classes.textCenter
        ]}
        customHeadClassesForCells={[0]}
      />
    )
  }

  const renderDesktopTable = () => {
    const allRows = reserved.map(
      (row, i) =>
            renderDesktopRow(products[row['productId']].productUrl, products[row['productId']].imageUrl, products[row['productId']].brand, products[row['productId']].details, row['name'], row['message'], row['quantity'])
    )

    return allRows
  }

  const renderMobileTable = () => {
    const allRows = reserved.map(
      (row, i) =>
            renderMobileRow(products[row['productId']].productUrl, products[row['productId']].imageUrl, products[row['productId']].brand, products[row['productId']].details, row['name'], row['message'], row['quantity'])
    )

    return allRows
  }

  const renderDesktopRow = (productUrl, imageUrl, brand, details, userName, message, quantity) => {
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
      <span>
        {quantity}
      </span>,
      <span>
        {userName}
        <br />
        <small className={classes.tdNameSmall}>
          {message}
        </small>
      </span>
      ]
    )
  }

  const renderMobileRow = (productUrl, imageUrl, brand, details, userName, message, quantity) => {
    return (
      [
          <div className={classes.textCenter}>
            <div className={classes.imgContainer} key={1}>
              <a href={productUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt="..." className={classes.img} />
              </a>
            </div>
            <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
              {brand}
            </a>
            <br />
            <small className={classes.tdNameSmall}>
              {details}
            </small>
          </div>,
          <div className={classes.textCenter}>
            <h4 className={classes.cardTitle}>
              {userName}
            </h4>
            <div className={classes.messageContainer}>
              <small className={classes.mobileMessage}>
                {message}
              </small>
            </div>
            <small className={classes.quantities}>
              Quantity: {quantity}
            </small>
          </div>
      ]
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Card plain>
          <CardBody plain>
            {
              mobile
              ? renderMobileView()
              : renderDesktopView()
            }
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

SectionProducts.propTypes = {
  mobile: PropTypes.bool,
  reserved: PropTypes.array,
  products: PropTypes.object
};
