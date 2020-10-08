import React, { useState } from 'react';
// libs
import { useAppContext } from "libs/contextLib";
import { addToList, createProduct, searchByUrl } from "libs/apiLib";
import { debugError } from "libs/errorLib";
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
import Input from "components/Input/CustomInput.js";
import Table from "components/Table/Table.js";
import Button from "components/Buttons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ErrorText from "components/Typography/Error.js";

import config from 'config.js';

import styles from "assets/jss/material-kit-pro-react/views/editListPage/addGiftsStyle.js";
const useStyles = makeStyles(styles);


export default function SectionAddGifts(props) {
  const classes = useStyles();
  const { mobile } = useAppContext();
  const { listId, addProductToState, setActive } = props;

  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [searchUrl, setSearchUrl] = useState('');
  const [listUpdated, setListUpdated] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  // Notfound state
  const [notFoundBrand, setNotFoundBrand] = useState('');
  const [notFoundDetails, setNotFoundDetails] = useState('');
  const [notFoundQuantity, setNotFoundQuantity] = useState(1);
  const [notFoundUrl, setNotFoundUrl] = useState('');
  // product state
  const [productId, setProductId] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);

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
    setError('');
    setIsSearching(true);
    let product;
    let url = parseUrl(searchUrl);

    try {
      const response = await searchByUrl(url);
      product = response.product;
    } catch (e) {
      setError('Product could not be found.');
      setIsSearching(false);
      return false
    }

    if (product.productId) {
      setSearchSuccess(true);
      setProductId(product.productId);
      setProductBrand(product.brand);
      setProductDetails(product.details);
      setProductPrice(product.price);
      setProductUrl(product.productUrl);
      setProductImageUrl(product.imageUrl);
    } else {
      debugError("Notfound url: " + url);
      setNotFoundUrl(url);
      setSearchSuccess(false);
    }

    setSearchResult(true);
    setListUpdated(false);
    setIsSearching(false);
    setError('');
  }

  const addProductToList = async event => {
    setIsAdding(true);
    setError('');
    debugError("adding product (" + productId + ") to list: (" + listId + ")");

    try {
      const response = await addToList(listId, productId, productQuantity, "products")
      debugError("Add response: " + response.message);
    } catch (e) {
      if (e.response.data.error === 'Product already exists in list.') {
        setError('Product already exists in your list.  You can change the quantity in Manage List.');
      } else {
        setError('Product could not be added to your list.');
      }

      setIsAdding(false);
      return false
    }

    let product = {
      productId: productId,
      quantity: productQuantity,
      reserved: 0,
      purchased: 0,
      price: productPrice,
      brand: productBrand,
      details: productDetails,
      type: 'products',
      productUrl: productUrl,
      imageUrl: productImageUrl
    }

    addProductToState(product)
    setIsAdding(false);
    setListUpdated(true);
    setSearchUrl('');
    setActive(0);
  }

  const createGift = async event => {
    setIsAdding(true);
    setError('');

    let createResponse;

    try {
      createResponse = await createProduct(notFoundBrand, notFoundDetails, notFoundUrl);
      debugError("created product: " + createResponse.productId);
    } catch (e) {
      setError('Product could not be added to your list.');
      setIsAdding(false);
      return false
    }

    // Update list with new product id
    try {
      const updateListResponse = await addToList(listId, createResponse.productId, notFoundQuantity, "notfound")
      debugError("Add response: " + updateListResponse.message);
    } catch (e) {
      setError('Product could not be added to your list.');
      setIsAdding(false);
      return false
    }

    // Update state
    var product = {
      productId: createResponse.productId,
      brand: notFoundBrand,
      details: notFoundDetails,
      type: 'notfound',
      url: notFoundUrl,
      imageUrl: config.imagePrefix + '/images/product-default.jpg',
      quantity: notFoundQuantity,
      reserved: 0,
      purchased: 0
    }

    addProductToState(product)
    setIsAdding(false);
    setListUpdated(true);
    setSearchUrl('');
    setActive(0);
  }

  const parseUrl = (url) => {
    let newUrl = /(http.+)/.exec(url)[1];

    return newUrl
  }

  const validateSearchForm = () => {
    return (
      searchUrl.length > 0 &&
      (searchUrl.indexOf("http://") !== -1 || searchUrl.indexOf("https://") !== -1)
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
            <Input
              labelText="Brand"
              id="brand"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => setNotFoundBrand(event.target.value)
              }}
            />
            <Input
              labelText="Details"
              id="details"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => setNotFoundDetails(event.target.value)
              }}
            />
            <Input
              labelText="Link"
              id="url"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: notFoundUrl,
                onChange: event => setNotFoundUrl(event.target.value)
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
              <Button round color="primary" onClick={() => createGift()} disabled={!validateNotFoundForm() || isAdding} data-cy="button-add-notfound-gift">
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
                <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.brand}>
                  {productBrand}
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  {productDetails}
                </small>
                {productPrice
                  ? <div className={classes.price}>
                      £ {productPrice}
                    </div>
                  : null
                }
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
              <Button default size="sm" color="primary" className={classes.reserveButton} disabled={isAdding} onClick={() => addProductToList()} data-cy="button-add-found-gift">
                Add to list
              </Button>
              </div>

            ]
          ]
          }
          tableShopping
          customHeadCellClasses={[
            classes.textCenter
          ]}
          customHeadClassesForCells={[2]}
          customCellClasses={[
            classes.tdName,
            classes.tdQuantity
          ]}
          customClassesForCells={[0,1]}
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
                <a href={productUrl} target="_blank" rel="noopener noreferrer" className={classes.brand}>
                  {productBrand}
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  {productDetails}
                </small>
                {productPrice
                  ? <div className={classes.price}>
                      £ {productPrice}
                    </div>
                  : null
                }
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
              <Button default color="primary" className={classes.reserveButton} disabled={isAdding} onClick={() => addProductToList()} data-cy="button-add-found-gift">
                Add to list
              </Button>
            ]
          ]
          }
          tableShopping
          customHeadCellClasses={[
            classes.textCenter
          ]}
          customHeadClassesForCells={[2]}
          customCellClasses={[
            classes.tdName,
            classes.tdQuantity
          ]}
          customClassesForCells={[1,2]}
        />
    )
  }

  const renderSearchResultTable = () => {
    return (
      <Card plain>
          <CardBody plain>
      {
        mobile
          ? renderMobileSearchResultTable()
          : renderDesktopSearchResultTable()
      }
      </CardBody>
    </Card>
    )
  }

  const renderDesktopSearchInput = () => {
    return (
      <div className={classes.textCenter}>
        <Input
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
      <Button color="primary" justIcon onClick={() => searchProduct()} disabled={!validateSearchForm() || isSearching} data-cy="button-search-product">
          <Search />
        </Button>
        <Button justIcon onClick={() => setSearchUrl('')}>
          <Clear />
        </Button>
      </div>
    )
  }

  const renderMobileSearchInput = () => {
    return (
      <div className={classes.textCenter}>
        <Input
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
        <Button color="primary" onClick={() => searchProduct()} disabled={!validateSearchForm() || isSearching} data-cy="button-search-product">
          <Search /> Search
        </Button>
        <Button onClick={() => setSearchUrl('')}>
          <Clear /> Clear
        </Button>
      </div>
    )
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10} lg={9}
            className={classes.mrAuto + " " + classes.mlAuto}
          >
            { mobile
              ? renderMobileSearchInput()
              : renderDesktopSearchInput()
            }
            <div className={classes.errorContainer}>
            {error
              ? <ErrorText>
                  <p>{error}</p>
                </ErrorText>
              : null
            }
            </div>
            <div className={classes.results}>
              {listUpdated
                ? null
                : searchResult
                  ? searchSuccess
                    ? renderSearchResultTable()
                    : renderManualAdd()
                  : null
              }
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

SectionAddGifts.propTypes = {
  listId: PropTypes.string,
  addProductToState: PropTypes.func,
  setActive: PropTypes.func
};
