import React, { useState, useEffect } from 'react';
import qs from "qs";
import update from 'immutability-helper';
// libs
import { getList, getProducts } from "libs/apiLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import List from "@material-ui/icons/List";
import Search from "@material-ui/icons/Search";
import Redeem from "@material-ui/icons/Redeem";
// core components
import HeaderFixed from "components/Header/HeaderFixed.js";
import FooterDark from "components/Footer/FooterDark.js";
import NavPills from "components/NavPills/NavPills.js";
// s for this page
import ListDetails from "./Sections/ListDetails.js";
import Products from "./Sections/Products.js";
import ClosedProducts from "./Sections/ClosedProducts.js"
import AddGifts from "./Sections/AddGifts.js";
import Reserved from "./Sections/Reserved.js";

import styles from "assets/jss/material-kit-pro-react/views/editListPage/editPageStyle.js";
const useStyles = makeStyles(styles);

export default function EditPage(props) {
  const classes = useStyles();

  const listId = props.match.params.id;
  const mobile = props.mobile;

  const [listLoaded, setListLoaded] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [closed, setClosed] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState({});
  const [reserved, setReserved] = useState([]);
  const [tabId, setTabId] = useState(0);
  const [loadError, setLoadError] = useState('');

  useEffect( () => {
    function getTabId() {
      const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
      return parseInt(params['tab'])
    }

    const id = getTabId();
    if (id) {
      setTabId(id);
    }
  }, [props.location.search]);

  useEffect( () => {
    function setListState(response) {
      props.setTabTitle('Editing ' + response.list.title);
      setTitle(response.list.title);
      setDescription(response.list.description);
      setOccasion(response.list.occasion);
      setImageUrl(response.list.imageUrl);
      setReserved(response.reserved);

      if (('eventDate' in response.list) && (response.list.eventDate !== 'None')) {
        setDate(response.list.eventDate);
      } else {
        setDate('');
      }

      if (response.list.state === 'closed') {
          setClosed(response.list.state);
      }
    }

    const getListDetails = async () => {
      try {
        const response = await getList(listId);
        setListLoaded(true);

        setListState(response);
        let productDetails = await getProducts(response.products);

        setProducts(productDetails);
        setProductsLoading(false);
      } catch (e) {
        setLoadError("There was an issue loading this page, we're working on it.");
        setListLoaded(true);
        setProductsLoading(false);
      }
    };

    getListDetails();
  }, [listId, props]);

  const deleteProductFromState = (id) => {
    setProducts(
      update(products, { $unset: [id] })
    )
  }

  const addProductToState = (product) => {
    setProducts({
      ...products,
      [product['productId']]: product
    })
  }

  const updateProductToState = (product) => {
    setProducts(
      update(products, {
        [product['productId']]: {
          quantity: {$set: product['quantity']}
        }
      })
    )
  }

  const setActive = (id) => {
    if (mobile) {
      if (window.pageYOffset < 200) {
        window.scrollTo({ top: navScrollHeight(), behavior: 'smooth' })
      }
    }

    setTabId(id);
  }

  const switchToAddProduct = (id) => {
    window.scrollTo({ top: navScrollHeight(), behavior: 'smooth' })
    setTabId(id);
  }

  const navScrollHeight = () => {
    var heightInWindow = document.getElementById('navTabContainer').getBoundingClientRect().top;
    var viewPortOffset = document.documentElement.scrollTop;
    var scrollHeight = heightInWindow + viewPortOffset - 85;
    return scrollHeight;
  }

  const renderClosedView = () => {
    return (
      <NavPills
          active={tabId}
          setActive={setActive}
          alignCenter
          color="primary"
          tabs={[
            {
              tabButton: "Reserved",
              tabIcon: Redeem,
              tabContent: (
                <div>
                  <Reserved
                    mobile={mobile}
                    reserved={reserved}
                    products={products}
                  />
                </div>
              )
            },
            {
              tabButton: "View List",
              tabIcon: List,
              tabContent: (
                <div>
                  <ClosedProducts
                    mobile={mobile}
                    products={products}
                  />
                </div>
              )
            }
          ]}
        />
    )
  }

  const renderOpenView = () => {
    return (
      <NavPills
          active={tabId}
          setActive={setActive}
          alignCenter
          color="primary"
          tabs={[
            {
              tabButton: "Manage List",
              tabIcon: List,
              tabContent: (
                <div>
                  <Products
                    loading={productsLoading}
                    mobile={mobile}
                    products={products}
                    listId={listId}
                    deleteProductFromState={deleteProductFromState}
                    updateProductToState={updateProductToState}
                    switchToAddProduct={switchToAddProduct}
                  />
                </div>
              )
            },
            {
              tabButton: "Add Items",
              tabIcon: Search,
              tabContent: (
                <div>
                  <AddGifts
                    mobile={mobile}
                    listId={listId}
                    addProductToState={addProductToState}
                    setActive={setActive}
                  />
                </div>
              )
            },
            {
              tabButton: "Reserved",
              tabIcon: Redeem,
              tabContent: (
                <div>
                  <Reserved
                    loading={productsLoading}
                    mobile={mobile}
                    reserved={reserved}
                    products={products}
                  />
                </div>
              )
            }
          ]}
        />
    )
  }

  return (
    <div>
      <HeaderFixed isAuthenticated={props.isAuthenticated} user={props.user} mobile={props.mobile} />
      <div className={classes.main}>
        {loadError
          ? <div>
              {loadError}
            </div>
          : null
        }
        {listLoaded
          ? <div>
              <ListDetails
                listId={listId}
                title={title}
                description={description}
                occasion={occasion}
                date={date}
                imageUrl={imageUrl}
                mobile={props.mobile}
                user={props.user}
                closed={closed}
              />
              <div className={classes.profileTabs} id="navTabContainer">
                {closed
                  ? renderClosedView()
                  : renderOpenView()
                }
              </div>
            </div>
          : null
        }
      </div>
      <FooterDark />
    </div>
  );
}
