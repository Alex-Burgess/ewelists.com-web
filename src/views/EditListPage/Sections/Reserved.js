import React, { useState, useEffect } from 'react';
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
  const { reserved, products } = props;
  const [desktop, setDesktop] = useState(true);

  useEffect( () => {
    function updateDimensions() {
      if (window.innerWidth < 600){
        setDesktop(false);
      } else {
        setDesktop(true);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  const renderDesktopView = () => {
    return (
      <Table
        tableHead={[
          "",
          "NAME",
          "QTY",
          "MESSAGE"
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
          classes.tdNumber + " " + classes.textCenter,
          classes.textCenter + " " + classes.tdMessage
        ]}
        customClassesForCells={[2, 3]}
      />
    )
  }

  const renderMobileView = () => {
    return (
      <Table
        tableHead={[
          "", ""
        ]}
        tableData={
          renderMobileTable()
        }
        tableShopping
      />
    )
  }

  const renderDesktopTable = () => {
    const allRows = reserved.map(
      (row, i) =>
            renderDesktopRow(products[row['productId']].productUrl, products[row['productId']].imageUrl, row['name'], row['message'], row['quantity'])
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

  const renderMobileTable = () => {
    const allRows = reserved.map(
      (row, i) =>
            renderMobileRow(products[row['productId']].productUrl, products[row['productId']].imageUrl, row['name'], row['message'], row['quantity'])
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

  const renderDesktopRow = (productUrl, imageUrl, userName, message, quantity) => {
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

  const renderMobileRow = (productUrl, imageUrl, userName, message, quantity) => {
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

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Card plain>
          <CardBody plain>
            {
              desktop
              ? renderDesktopView()
              : renderMobileView()
            }
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

SectionProducts.propTypes = {
  reserved: PropTypes.array,
  products: PropTypes.object
};