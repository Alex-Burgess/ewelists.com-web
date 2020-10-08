import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
// libs
import { useAppContext } from "libs/contextLib";
import { getSharedList, getProducts } from "libs/apiLib";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import HeaderTransparent from "components/Header/HeaderTransparent.js";
import Parallax from "components/Parallax/Parallax.js";
import FooterDark from "components/Footer/FooterDark.js";
// sections for this page
import SectionProducts from "./Sections/Products.js";
import SectionListDetails from "./Sections/ListDetails.js";
import SectionClosed from "./Sections/Closed.js";

import styles from "assets/jss/material-kit-pro-react/views/viewListPage/viewListPageStyle.js";
const useStyles = makeStyles(styles);

export default function ViewList(props) {
  const classes = useStyles();
  const history = useHistory();
  const { setTabTitle, user } = useAppContext();

  const listId = props.match.params.id;
  const userId = user.sub;

  const [listLoaded, setListLoaded] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [closed, setClosed] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState({});
  const [reserved, setReserved] = useState({});

  useEffect( () => {
    function setListState(response) {
      setTabTitle(response.list.title);
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
          const response = await getSharedList(listId);

          setListState(response);
          setListLoaded(true);
          setProductsLoading(true);

          let productDetails = await getProducts(response.products);
          setProducts(
            productDetails
          )

          setProductsLoading(false);
      } catch (e) {
        history.push('/error/' + listId);
      }
    };

    getListDetails();
  }, [listId, setTabTitle, history]);

  return (
    <div>
      <HeaderTransparent />
      <Parallax className={classes.articleBg} />
      <div className={classes.main}>
        {listLoaded
          ? <SectionListDetails
              title={title}
              description={description}
              occasion={occasion}
              date={date}
              imageUrl={imageUrl}
            />
          : null
        }
        { closed
          ? <SectionClosed />
          : <SectionProducts
              loading={productsLoading}
              products={products}
              reserved={reserved}
              userId={userId}
              listId={listId}
              listTitle={title}
              user={user}
            />
        }
      </div>
      <div className={classes.spacer} />
      <FooterDark />
    </div>
  );
}
