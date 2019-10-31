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
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui icons
import Cached from "@material-ui/icons/Cached";
import Check from "@material-ui/icons/Check";
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

class SectionProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserveModal: false,
      checked: [],
      selectedEnabled: "a",
      showFilter: false,
      width: window.innerWidth,
      height: window.innerHeight,
      two: false,
      product1: false,
      product2: false,
      product3: false,
      product4: false,
      product5: false,
      product6: false,
      product7: false,
      product8: false,
      product9: false
    };
  }

  // Required when products passed in from parent component
  // componentWillMount() {
  //   const { products } = this.props;
  //
  //   for (let product of products) {
  //     this.setState({ [product['productId']]: false });
  //   }
  // }

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

  renderProduct(classes, id, brand, description, price, quantity, url, img, reserved) {
    return (
      <GridItem md={4} sm={4}>
        <Card plain product>
          <CardHeader noShadow image>
            <a href={url}>
              <img src={img} className={classes.productImage} alt=".." />
            </a>
          </CardHeader>
          <CardBody plain className={classes.productDetails}>
            <a href={url}>
              <h4 className={classes.cardTitle}>{brand}</h4>
            </a>
            <p className={classes.description}>
              {description}
            </p>
          </CardBody>
          <CardFooter plain className={classes.footer}>
            <div>
              <span className={classes.price}> £ {price}</span>
            </div>
            <div className={classes.textCenter}>
              {reserved
                ? <Button default color="default" className={classes.reserveButton} disabled onClick={() => this.handleClickOpen(id)}>
                    Reserved
                  </Button>
                : <Button default color="primary" className={classes.reserveButton} onClick={() => this.handleClickOpen(id)}>
                    Reserve Gift
                  </Button>
              }
            </div>
          </CardFooter>
        </Card>
        <SectionReserve
          open={this.state[id]}
          productId={id}
          brand={brand}
          description={description}
          price={price}
          quantity={quantity}
          url={url}
          img={img}
          handleClose={this.handleClose.bind(this)}
        />
      </GridItem>
    )
  }

  render() {
    const { classes } = this.props;

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
                          <Tooltip
                            id="tooltip-top"
                            title="Reset Filter"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Button
                              link
                              justIcon
                              size="sm"
                              className={
                                classes.pullRight + " " + classes.refineButton
                              }
                            >
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
                            },
                            {
                              title: "Price",
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
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={() => this.handleToggle(1)}
                                          checked={
                                            this.state.checked.indexOf(1) !== -1
                                              ? true
                                              : false
                                          }
                                          checkedIcon={
                                            <Check className={classes.checkedIcon} />
                                          }
                                          icon={
                                            <Check
                                              className={classes.uncheckedIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                          }}
                                        />
                                      }
                                      classes={{ label: classes.label }}
                                      label="Less than £50"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={() => this.handleToggle(2)}
                                          checkedIcon={
                                            <Check className={classes.checkedIcon} />
                                          }
                                          icon={
                                            <Check
                                              className={classes.uncheckedIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                          }}
                                        />
                                      }
                                      classes={{ label: classes.label }}
                                      label="£50 - £100"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={() => this.handleToggle(3)}
                                          checkedIcon={
                                            <Check className={classes.checkedIcon} />
                                          }
                                          icon={
                                            <Check
                                              className={classes.uncheckedIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                          }}
                                        />
                                      }
                                      classes={{ label: classes.label }}
                                      label="£100 - £150"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={() => this.handleToggle(4)}
                                          checkedIcon={
                                            <Check className={classes.checkedIcon} />
                                          }
                                          icon={
                                            <Check
                                              className={classes.uncheckedIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.checked,
                                            root: classes.checkRoot
                                          }}
                                        />
                                      }
                                      classes={{ label: classes.label }}
                                      label="£150 and more"
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
                {this.renderProduct(
                  classes,
                  "product1",
                  "BABYBJÖRN",
                  "Travel Cot Easy Go, Anthracite, with transport bag",
                  "219.99",
                  1,
                  "https://www.amazon.co.uk/dp/B01H24LM58",
                  'https://images-na.ssl-images-amazon.com/images/I/81qYpf1Sm2L._SX679_.jpg',
                  true
                )}
                {this.renderProduct(
                  classes,
                  "product2",
                  "Micralite",
                  "Travel Cot 3 in 1 Sleep & Go - Carbon/Grey",
                  "175",
                  2,
                  "https://www.amazon.co.uk/dp/B07PN49Q4S",
                  'https://images-na.ssl-images-amazon.com/images/I/51oQcQG0CKL._SX355_.jpg',
                  false
                )}
                {this.renderProduct(
                  classes,
                  "product3",
                  "BABYZEN",
                  "YOYO+ Puschair, Black with Aqua",
                  "389",
                  1,
                  "https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291",
                  'https://johnlewis.scene7.com/is/image/JohnLewis/237457570?$rsp-pdp-port-640$',
                  false
                )}
                {this.renderProduct(
                  classes,
                  "product4",
                  "Mamas & Papas",
                  "Acro Compact Buggy, Black",
                  "189",
                  1,
                  "https://www.amazon.co.uk/dp/B07FBYHY7L",
                  'https://images-na.ssl-images-amazon.com/images/I/81LJ-0%2BSKVL._SY450_.jpg',
                  false
                )}
                {this.renderProduct(
                  classes,
                  "product5",
                  "Micralite",
                  "ProFold Compact Stroller - Carbon",
                  "175",
                  1,
                  "https://www.amazon.co.uk/dp/B07PM6ZD1C",
                  'https://images-na.ssl-images-amazon.com/images/I/71hqy17iYuL._SY550_.jpg',
                  false
                )}
                {this.renderProduct(
                  classes,
                  "product6",
                  "BABYBJÖRN",
                  "Baby Carrier One Air, 3D Mesh, Navy Blue",
                  "159.99",
                  1,
                  "https://www.amazon.co.uk/dp/B07937WXKD",
                  'https://images-na.ssl-images-amazon.com/images/I/91hX32oi5LL._SX355_.jpg',
                  false
                )}
                {this.renderProduct(
                  classes,
                  "product7",
                  "LittleLife",
                  "Ranger S2 Child Carrier",
                  "99.99",
                  1,
                  "https://www.amazon.co.uk/dp/B0792Y5L7K",
                  'https://images-na.ssl-images-amazon.com/images/I/81KydgdpFmL._SY679_.jpg',
                  false
                )}
                {this.renderProduct(
                  classes,
                  "product8",
                  "Phil and Teds",
                  "Lobster Highchair - Red",
                  "69.95",
                  1,
                  "https://www.amazon.co.uk/dp/B0019AC8GE",
                  'https://images-na.ssl-images-amazon.com/images/I/91SA-D7wIUL._SX355_.jpg',
                  false
                )}
                {this.renderProduct(
                  classes,
                  "product9",
                  "Munchkin",
                  "Portable Travel Child Booster Seat - Blue/Grey",
                  "20.90",
                  1,
                  "https://www.amazon.co.uk/dp/B01M6XGKV1",
                  'https://images-na.ssl-images-amazon.com/images/I/7178PGluPOL._SY355_.jpg',
                  false
                )}
              </GridContainer>
            </GridItem>
          </GridContainer>
          <br />
        </div>
      </div>
    );
  }
}

SectionProducts.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(SectionProducts);
