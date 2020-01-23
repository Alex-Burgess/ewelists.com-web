import React, { useState } from 'react';
import update from 'immutability-helper';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Playlist from "@material-ui/icons/PlaylistAdd";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// custom components
import AddPopOut from "./AddPopOut.js";

import styles from "assets/jss/custom/components/article/productsStyle.js";
const useStyles = makeStyles(styles);

export default function Products(props) {
  const classes = useStyles();
  const { products, data, lists, isAuthenticated } = props;
  const [addPopouts, setAddPopouts] = useState({});

  const handleEditClose = (id) => {
    setAddPopouts({
      addPopouts: update(addPopouts, {
        [id]: {$set: false}
      })
    })
  }

  const handleAddOpen = (id) => {
    setAddPopouts({
      ...addPopouts,
        [id]: true
    })
  }

  const renderAddPopOuts = () => {
    return products.map((id, key) =>
      <AddPopOut
        open={addPopouts[id]
          ? addPopouts[id]
          : false }
        lists={lists}
        product={data[id]}
        handleClose={handleEditClose}
        key={key}
      />
    )
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <GridContainer>
            {
              products.map((id, key) =>
                <GridItem xs={12} sm={4} md={4} key={key}>
                  <Card plain product className={classes.customProduct}>
                    <CardHeader noShadow image>
                      <a href={data[id].productUrl} target="_blank" rel="noopener noreferrer">
                        <img src={data[id].imageUrl} className={classes.productImage} alt=".." />
                      </a>
                      <a href={data[id].productUrl} target="_blank" rel="noopener noreferrer">
                        <h4 className={classes.cardTitle}>{data[id].brand}</h4>
                      </a>
                      <div className={classes.description}>
                        {data[id].details}
                      </div>
                    </CardHeader>
                    <CardBody plain>
                      <a href={data[id].productUrl} target="_blank" rel="noopener noreferrer">
                        { data[id].retailer === 'amazon'
                        ? <Button className={classes.amazonButton}>
                            <i className="fab fa-amazon" /> Buy Now
                          </Button>
                        : <Button color="primary" className={classes.button}>
                            Buy Now
                          </Button>
                        }
                      </a>
                      { isAuthenticated
                      ? <Button color="info" className={classes.button} onClick={() => handleAddOpen(data[id].productId)}>
                           <Playlist /> Add To List
                         </Button>
                      : <a href="/signup" target="_blank" rel="noopener noreferrer">
                          <Button color="info" className={classes.button}>
                           Sign up to Create List
                         </Button>
                       </a>
                      }
                    </CardBody>
                  </Card>
                </GridItem>
            )
          }
          </GridContainer>
        </GridItem>
      </GridContainer>
      {renderAddPopOuts()}
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.array,
  data: PropTypes.object,
  lists: PropTypes.object,
  isAuthenticated: PropTypes.bool
};
