import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui icons
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Remove from "@material-ui/icons/Remove";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import config from 'config.js';

import styles from "assets/jss/custom/views/editListPage/addGiftsStyle.js";
const useStyles = makeStyles(styles);


export default function SectionAddGifts(props) {
  const classes = useStyles();
  const { listId } = props;

  const [desktop, setDesktop] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [searchUrl, setSearchUrl] = useState('');
  const [listUpdated, setListUpdated] = useState(false);
  // Notfound state
  const [notFoundBrand, setNotFoundBrand] = useState('');
  const [notFoundDetails, setNotFoundDetails] = useState('');
  const [notFoundQuantity, setNotFoundQuantity] = useState(1);
  const [notFoundUrl, setNotFoundUrl] = useState('');
  // product state
  const [productId, setProductId] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);

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

  const decreaseProductQuantity = () => {
    var quantity = productQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    setProductQuantity(quantity);
  }

  const decreaseNotFoundQuantity = () => {
    var quantity = notFoundQuantity;

    if (quantity > 1) {
      quantity = quantity - 1;
    }

    setNotFoundQuantity(quantity);
  }

  const searchProduct = async event => {
    let product;

    try {
      const response = await API.get("products", "/url/" + encodeURIComponent(searchUrl));
      product = response.product;
    } catch (e) {
      console.log('Unexpected error occurred when searching for product: ' + e);
      setErrorMessage('Product could not be found.');
      return false
    }

    setSearchResult(true);
    setListUpdated(false);
    setErrorMessage('');

    if (product.productId) {
      setSearchSuccess(true);
      setProductId(product.productId);
      setProductBrand(product.brand);
      setProductDetails(product.details);
      setProductUrl(product.productUrl);
      setProductImageUrl(product.imageUrl);
    } else {
      setSearchSuccess(false);
      setNotFoundUrl(searchUrl);
    }
  }

  const addProductToList = async event => {
    console.log("adding product (" + productId + ") to list: (" + listId + ")");

    let addDetails = {
      "quantity": productQuantity,
      "productType": "products"
    };

    let response;

    try {
      response = await API.post("lists", "/" + listId + "/product/" +  productId, {
        body: addDetails
      });
    } catch (e) {
      console.log('Error message: ' + e.response.data.error);

      if (e.response.data.error === 'Product already exists in list.') {
        setErrorMessage('Product already exists in your list.  If you wanted to change the quantity for this product, you can do this in Manage List.');
      } else {
        setErrorMessage('Product could not be added to your list.');
      }


      return false
    }

    console.log("Add response: " + response.message);

    let product = {
      productId: productId,
      quantity: productQuantity,
      reserved: 0,
      brand: productBrand,
      details: productDetails,
      type: 'products',
      productUrl: productUrl,
      imageUrl: productImageUrl
    }

    props.addProductToState(product)
    setListUpdated(true);
    setSearchUrl('');
  }

  const createProduct = async event => {
    let createResponse;
    let requestBody = {
      "brand": notFoundBrand,
      "details": notFoundDetails,
      "url": notFoundUrl,
    };

    try {
      createResponse = await API.post("notfound", "/", { body: requestBody });
    } catch (e) {
      console.log('Unexpected error occurred when creating product: ' + e);
      setErrorMessage('Product could not be added to your list.');
      return false
    }

    console.log("created product: " + createResponse.productId);

    // Update list with new product id
    let addDetails = {
      "quantity": notFoundQuantity,
      "productType": "notfound"
    };

    let updateListResponse;

    try {
      updateListResponse = await API.post("lists", "/" + listId + "/product/" +  createResponse.productId, {
        body: addDetails
      });
    } catch (e) {
      console.log('Unexpected error occurred when adding product to list: ' + e.updateListResponse.data.error);
      setErrorMessage('Product could not be added to your list.');
      return false
    }

    console.log("Add response: " + updateListResponse.message);

    // Update state
    var product = {
      productId: createResponse.productId,
      brand: notFoundBrand,
      details: notFoundDetails,
      type: 'notfound',
      url: notFoundUrl,
      imageUrl: config.imagePrefix + '/images/product-default.jpg',
      quantity: notFoundQuantity,
      reserved: 0
    }

    props.addProductToState(product)
    setListUpdated(true);
    setSearchUrl('');
  }

  const validateSearchForm = () => {
    return (
      searchUrl.length > 0 &&
      searchUrl.startsWith("http")
    );
  }

  const validateNotFoundForm = () => {
    return (
      notFoundBrand.length > 0 &&
      notFoundDetails.length > 0 &&
      notFoundUrl.length > 0 &&
      notFoundUrl.startsWith("http")
    );
  }

  const renderManualAdd = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={7} md={7} lg={7}
          className={classes.mrAuto + " " + classes.mlAuto}
        >
          <h5>
            We don't currently have any details for this product. Add the item with some basic details below and we'll update the item a.s.a.p.
          </h5>
          <form className={classes.form}>
            <CustomInput
              labelText="Brand"
              id="brand"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => setNotFoundBrand(event.target.value)
              }}
            />
            <CustomInput
              labelText="Details"
              id="details"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => setNotFoundDetails(event.target.value)
              }}
            />
            <CustomInput
              labelText="Link"
              id="url"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => setNotFoundUrl(event.target.value),
                defaultValue: searchUrl
              }}
            />
            <div className={classes.textCenter}>
              <Button color="primary" size="sm" simple onClick={() => decreaseNotFoundQuantity()}>
                <Remove />
              </Button>
              {` `}{notFoundQuantity}{` `}
              <Button color="primary" size="sm" simple onClick={() => setNotFoundQuantity(notFoundQuantity + 1)}>
                <Add />
              </Button>
            </div>
            <div className={classes.textCenter}>
              <Button round color="primary" onClick={() => createProduct()} disabled={!validateNotFoundForm()}>
                Add to list
              </Button>
            </div>
          </form>
        </GridItem>
      </GridContainer>
    )
  }

  const renderMobileSearchResultTable = () => {
    return (
      <Table
          tableHead={[
            "",
            ""
          ]}
          tableData={[
            [
              <div className={classes.textCenter}>
                <div className={classes.imgContainer}>
                  <a href={productUrl} target="_blank" rel="noopener noreferrer">
                    <img src={productImageUrl} alt="..." className={classes.img} />
                  </a>
                </div>
                <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
                  {productBrand}
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  {productDetails}
                </small>
              </div>,
              <div className={classes.textCenter}>
              <span>
                <Button color="primary" size="sm" simple onClick={() => decreaseProductQuantity()}>
                  <Remove />
                </Button>
                {` `}{productQuantity}{` `}
                <Button color="primary" size="sm" simple onClick={() => setProductQuantity(productQuantity + 1)}>
                  <Add />
                </Button>
              </span>
              <Button default size="sm" color="primary" className={classes.reserveButton}>
                Add to list
              </Button>
              </div>

            ],
            {
              addnew: true,
              colspan: "1",
              col: {
                colspan: 1,
              }
            }
          ]
          }
          tableShopping
          customHeadCellClasses={[
            classes.textCenter
          ]}
          customHeadClassesForCells={[2]}
          customCellClasses={[
            classes.tdName
          ]}
          customClassesForCells={[1]}
        />
    )
  }

  const renderDesktopSearchResultTable = () => {
    return (
      <Table
          tableHead={[
            "",
            "",
            "",
            ""
          ]}
          tableData={[
            [
              <div className={classes.imgContainer}>
                <a href={productUrl} target="_blank" rel="noopener noreferrer">
                  <img src={productImageUrl} alt="..." className={classes.img} />
                </a>
              </div>,
              <span key={1}>
                <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.tdNameAnchor}>
                  {productBrand}
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  {productDetails}
                </small>
              </span>,
              <span>
                <Button color="primary" size="sm" simple onClick={() => decreaseProductQuantity()}>
                  <Remove />
                </Button>
                {` `}{productQuantity}{` `}
                <Button color="primary" size="sm" simple onClick={() => setProductQuantity(productQuantity + 1)}>
                  <Add />
                </Button>
              </span>,
              <Button default color="primary" className={classes.reserveButton} onClick={() => addProductToList()}>
                Add to list
              </Button>
            ],
            {
              addnew: true,
              colspan: "2",
              col: {
                colspan: 2,
              }
            }
          ]
          }
          tableShopping
          customHeadCellClasses={[
            classes.textCenter
          ]}
          customHeadClassesForCells={[2]}
          customCellClasses={[
            classes.tdName
          ]}
          customClassesForCells={[1]}
        />
    )
  }

  const renderSearchResultTable = () => {
    return (
      <Card plain>
          <CardBody plain>
      {
        desktop
          ? renderDesktopSearchResultTable()
          : renderMobileSearchResultTable()
      }
      </CardBody>
    </Card>
    )
  }

  const renderAddMessage = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={7} md={7} lg={7}
          className={classes.mrAuto + " " + classes.mlAuto + " " + classes.textCenter}
        >
          <h5>
            Product was added to your list.
          </h5>
          <h5>
            To add more items to your list, just search for a new product link.
          </h5>
          <h5>
            Hit manage to view your list.
          </h5>
        </GridItem>
      </GridContainer>
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10} lg={9}
            className={classes.mrAuto + " " + classes.mlAuto}
          >
            <div className={classes.textCenter}>
              <CustomInput
                id="searchUrl"
                formControlProps={{
                  fullWidth: false,
                  className: classes.customFormControl
                }}
                inputProps={{
                  placeholder: "Enter url...",
                  onChange: event => setSearchUrl(event.target.value),
                  value: searchUrl
                }}
              />
              <Button color="primary" justIcon onClick={() => searchProduct()} disabled={!validateSearchForm()}>
                <Search />
              </Button>
              <Button justIcon onClick={() => setSearchUrl('')}>
                <Clear />
              </Button>
            </div>
            <div className={classes.results}>
              {listUpdated
                ? renderAddMessage()
                : searchResult
                  ? searchSuccess
                    ? renderSearchResultTable()
                    : renderManualAdd()
                  : null
              }
            </div>
            {errorMessage
              ?
                <div className={classes.errorContainer}>
                  {errorMessage}
                </div>
              : null
            }
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionAddGifts.propTypes = {
  listId: PropTypes.string,
};
