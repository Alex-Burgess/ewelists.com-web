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
// @material-ui icons
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import styles from "assets/jss/material-kit-pro-react/views/editListSections/addGiftsStyle.jsx";


class SectionAddGifts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      searchResult: '',
      addQuantity: 1
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

  // increaseQuantity(){
  //   var quantity = this.state.addQuantity;
  //   quantity = quantity + 1;
  //   this.setState({ addQuantity: quantity})
  // }
  //
  // decreaseQuantity(){
  //   var quantity = this.state.addQuantity;
  //
  //   if (quantity > 1) {
  //     quantity = quantity - 1;
  //   }
  //
  //   this.setState({ addQuantity: quantity})
  // }

  renderManualAdd(classes, quantity) {
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
                onChange: this.props.handleAddGiftChange
              }}
            />
            <CustomInput
              labelText="Details"
              id="details"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.props.handleAddGiftChange
              }}
            />
            <CustomInput
              labelText="Link"
              id="url"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.props.handleAddGiftChange
              }}
            />
            <div className={classes.textCenter}>
              <Button color="primary" size="sm" simple onClick={() => this.props.decreaseQuantity()}>
                <Remove />
              </Button>
              {` `}{quantity}{` `}
              <Button color="primary" size="sm" simple onClick={() => this.props.increaseQuantity()}>
                <Add />
              </Button>
            </div>
            <div className={classes.textCenter}>
              <Button round color="primary" onClick={() => this.props.createProduct()} disabled={!this.props.validateNotFoundForm()}>
                Add to list
              </Button>
            </div>
          </form>
        </GridItem>
      </GridContainer>
    )
  }

  renderMobileSearchResultTable(classes){
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
                  <img src={'https://images-na.ssl-images-amazon.com/images/I/81qYpf1Sm2L._SX679_.jpg'} alt="..." className={classes.img} />
                </div>
                <a href="#jacket" className={classes.tdNameAnchor}>
                  BABYBJÖRN
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  Travel Cot Easy Go, Anthracite, with transport bag
                </small>
              </div>,
              <div className={classes.textCenter}>
              <span>
                <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity()}>
                  <Remove />
                </Button>
                {` `}{this.state.addQuantity}{` `}
                <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity()}>
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

  renderDesktopSearchResultTable(classes){
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
                <img src={'https://images-na.ssl-images-amazon.com/images/I/81qYpf1Sm2L._SX679_.jpg'} alt="..." className={classes.img} />
              </div>,
              <span key={1}>
                <a href="#jacket" className={classes.tdNameAnchor}>
                  BABYBJÖRN
                </a>
                <br />
                <small className={classes.tdNameSmall}>
                  Travel Cot Easy Go, Anthracite, with transport bag
                </small>
              </span>,
              <span>
                <Button color="primary" size="sm" simple onClick={() => this.decreaseQuantity()}>
                  <Remove />
                </Button>
                {` `}{this.state.addQuantity}{` `}
                <Button color="primary" size="sm" simple onClick={() => this.increaseQuantity()}>
                  <Add />
                </Button>
              </span>,
              <Button default color="primary" className={classes.reserveButton}>
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

  renderSearchResultTable(classes) {
    return (
      <Card plain>
          <CardBody plain>
      {
        this.state.desktop
        ? this.renderDesktopSearchResultTable(classes)
        : this.renderMobileSearchResultTable(classes)
      }
      </CardBody>
    </Card>
    )
  }

  render() {
    const { classes, quantity } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={10} lg={9}
              className={classes.mrAuto + " " + classes.mlAuto}
            >
              <div className={classes.textCenter}>
                <CustomInput
                  id="material"
                  formControlProps={{
                    fullWidth: false,
                    className: classes.customFormControl
                  }}
                  inputProps={{
                    placeholder: "Enter url..."
                  }}
                />
                <Button color="primary" justIcon>
                  <Search />
                </Button>
              </div>
              {this.state.searchResult
                ? this.renderSearchResultTable(classes)
                : this.renderManualAdd(classes, quantity)
              }
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionAddGifts.propTypes = {
  classes: PropTypes.object,
  quantity: PropTypes.number
};

export default withStyles(styles)(SectionAddGifts);
