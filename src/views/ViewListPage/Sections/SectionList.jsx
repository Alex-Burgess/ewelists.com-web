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
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui icons
import Cached from "@material-ui/icons/Cached";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import Accordion from "components/Accordion/Accordion.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";

// Sections
import SectionReserve from "./ReservePopOut.jsx";

import styles from "assets/jss/material-kit-pro-react/views/viewListSections/sectionListStyle.jsx";

class SectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveModal: false,
      checked: [],
      selectedEnabled: "a",
      showFilter: false,
      width: window.innerWidth,
      height: window.innerHeight
    };
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

  handleChangeEnabled = event => {
    this.setState({ selectedEnabled: event.target.value });
  };

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  toggleFilter = () => {
    const { showFilter } = this.state;
    var newValue;

    if (showFilter === false){
      newValue = true;
    } else {
      newValue = false;
    }

    this.setState({ showFilter: newValue });
  }

  renderProduct(classes, product, i) {
    return (
      <GridItem md={4} sm={4} key={i}>
        <Card plain product>
          <CardHeader noShadow image>
            <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
              <img src={product['imageUrl']} className={classes.productImage} alt=".." />
            </a>
          </CardHeader>
          <CardBody plain className={classes.productDetails}>
            <a href={product['productUrl']} target="_blank" rel="noopener noreferrer">
              <h4 className={classes.cardTitle}>{product['brand']}</h4>
            </a>
            <p className={classes.description}>
              {product['details']}
            </p>
          </CardBody>
          <CardFooter plain className={classes.footer}>
            <div>
              <span className={classes.description}> Quantity: {product['quantity']}</span>
            </div>
            <div className={classes.textCenter}>
              {product['reserved'] < product['quantity']
                ? <Button default color="primary" className={classes.reserveButton} onClick={() => this.handleClickOpen(product['productId'])}>
                    Reserve Gift
                  </Button>
                : <Button default color="default" className={classes.reserveButton} disabled onClick={() => this.handleClickOpen(product['productId'])}>
                    Reserved
                  </Button>
              }
            </div>
          </CardFooter>
        </Card>
        <SectionReserve
          open={this.state[product['productId']]
            ? this.state[product['productId']]
            : false }
          product={product}
          handleClose={this.handleClose.bind(this)}
          getListId={this.props.getListId.bind(this)}
          updateReservedQuantity={this.props.updateReservedQuantity.bind(this)}
        />
      </GridItem>
    )
  }

  renderProducts(classes, products: Products[]) {
    return (
      // products.map( (product, i) =>
      //       this.renderProduct(classes, product, i)
      // )

      Object.entries(products).map(
        ([key, product]) =>
          this.renderProduct(classes, product, key)
      )
    )
  }

  render() {
    const { classes, products } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem md={3} sm={4}>
              <Card plain className={classes.filterCard}>
                <CardBody className={classes.cardBodyRefine}>
                  <div className={classes.textCenter + " " + classes.filterButtonContainer}>
                    <Button default color="default" onClick={this.toggleFilter} className={classes.filterButton}>
                      {
                        this.state.desktop || this.state.showFilter
                        ? <span>Hide Filter</span>
                        : <span>Show Filter</span>
                      }
                    </Button>
                  </div>
                  {
                    this.state.desktop || this.state.showFilter
                    ?  <div>
                        <h4 className={classes.cardTitle + " " + classes.textLeft}>
                          Filter
                          <Tooltip id="tooltip-top" title="Reset Filter" placement="top" classes={{ tooltip: classes.tooltip }}>
                            <Button link justIcon size="sm" className={classes.pullRight + " " + classes.refineButton}>
                              <Cached />
                            </Button>
                          </Tooltip>
                          <Clearfix />
                        </h4>
                        <Accordion
                          active={[0, 1]}
                          activeColor="rose"
                          collapses={[
                            {
                              title: "Availability",
                              content: (
                                <div className={classes.customExpandPanel}>
                                  <div
                                    className={
                                      classes.checkboxAndRadio +
                                      " " +
                                      classes.checkboxAndRadioHorizontal
                                    }
                                  >
                                    <FormControlLabel
                                      control={
                                        <Radio
                                          checked={this.state.selectedEnabled === "a"}
                                          onChange={this.handleChangeEnabled}
                                          value="a"
                                          name="radio button enabled"
                                          aria-label="A"
                                          icon={
                                            <FiberManualRecord
                                              className={classes.radioUnchecked}
                                            />
                                          }
                                          checkedIcon={
                                            <FiberManualRecord className={classes.radioChecked} />
                                          }
                                          classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                          }}
                                        />
                                      }
                                      classes={{
                                        label: classes.label,
                                        root: classes.labelRoot
                                      }}
                                      label="All Items"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Radio
                                          checked={this.state.selectedEnabled === "b"}
                                          onChange={this.handleChangeEnabled}
                                          value="b"
                                          name="radio button enabled"
                                          aria-label="B"
                                          icon={
                                            <FiberManualRecord
                                              className={classes.radioUnchecked}
                                            />
                                          }
                                          checkedIcon={
                                            <FiberManualRecord className={classes.radioChecked} />
                                          }
                                          classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                          }}
                                        />
                                      }
                                      classes={{
                                        label: classes.label,
                                        root: classes.labelRoot
                                      }}
                                      label="Available Items"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Radio
                                          checked={this.state.selectedEnabled === "c"}
                                          onChange={this.handleChangeEnabled}
                                          value="c"
                                          name="radio button enabled"
                                          aria-label="C"
                                          icon={
                                            <FiberManualRecord
                                              className={classes.radioUnchecked}
                                            />
                                          }
                                          checkedIcon={
                                            <FiberManualRecord className={classes.radioChecked} />
                                          }
                                          classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                          }}
                                        />
                                      }
                                      classes={{
                                        label: classes.label,
                                        root: classes.labelRoot
                                      }}
                                      label="Purchased Items"
                                    />
                                  </div>
                                </div>
                              )
                            }
                          ]}
                        />
                      </div>
                    : null
                  }
                </CardBody>
              </Card>
            </GridItem>
            <GridItem md={9} sm={8}>
              <GridContainer>
                {this.renderProducts(classes, products)}
              </GridContainer>
            </GridItem>
          </GridContainer>
          <br />
        </div>
      </div>
    );
  }
}

SectionList.propTypes = {
  classes: PropTypes.object,
  products: PropTypes.object
};

export default withStyles(styles)(SectionList);
