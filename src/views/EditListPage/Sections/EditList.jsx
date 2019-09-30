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

import babybjorncot from "assets/img/articles/travelgear/babybjorn-travelcot.jpg";
import babybjorncarrier from "assets/img/articles/travelgear/babybjorn-carrier.jpg";
import micralitecot from "assets/img/articles/travelgear/micralite-travelcot.jpg";
import yoyo from "assets/img/articles/travelgear/babyzen-yoyo.jpg";
import acro from "assets/img/articles/travelgear/mamasandpapas-acro.jpg";
import profold from "assets/img/articles/travelgear/micralite-profold.jpg";
import ranger from "assets/img/articles/travelgear/littlelife-rangercarrier.jpg";
import lobster from "assets/img/articles/travelgear/philandteds-lobster.jpg";
import munchkinseat from "assets/img/articles/travelgear/munchkin-travelseat.jpg";

import styles from "assets/jss/material-kit-pro-react/views/viewListSections/sectionListStyle.jsx";

class SectionProducts extends React.Component {
  state = {
    checked: [],
    selectedEnabled: "a",
    showFilter: false,
    width: window.innerWidth,
    height: window.innerHeight,
  };

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
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B01H24LM58">
                        <img src={babybjorncot} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B01H24LM58">
                        <h4 className={classes.cardTitle}>BABYBJ&#0214;RN</h4>
                      </a>
                      <p className={classes.description}>
                        Travel Cot Easy Go, Anthracite, with transport bag.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £219.99</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="default" size="" className={classes.reserveButton} disabled="true">
                          Reserved
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B07PN49Q4S">
                        <img src={micralitecot} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B07PN49Q4S">
                        <h4 className={classes.cardTitle}>Micralite</h4>
                      </a>
                      <p className={classes.description}>
                        Travel Cot 3 in 1 Sleep & Go - Carbon/Grey.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £175</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291">
                        <img src={yoyo} className={classes.productImage}  alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291">
                        <h4 className={classes.cardTitle}>BABYZEN</h4>
                      </a>
                      <p className={classes.description}>
                        YOYO+ Puschair, Black with Aqua
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £389</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B07FBYHY7L">
                        <img src={acro} className={classes.productImage}  alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B07FBYHY7L">
                        <h4 className={classes.cardTitle}>Mamas & Papas</h4>
                      </a>
                      <p className={classes.description}>
                        Acro Compact Buggy, Black
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £189</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B07PM6ZD1C">
                        <img src={profold} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B07PM6ZD1C">
                        <h4 className={classes.cardTitle}>Micralite</h4>
                      </a>
                      <p className={classes.description}>
                        ProFold Compact Stroller - Carbon
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £175</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B07937WXKD">
                        <img src={babybjorncarrier} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B07937WXKD">
                        <h4 className={classes.cardTitle}>BABYBJ&#0214;RN</h4>
                      </a>
                      <p className={classes.description}>
                        Baby Carrier One Air, 3D Mesh, Navy Blue.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £159.99</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B0792Y5L7K">
                        <img src={ranger} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B0792Y5L7K">
                        <h4 className={classes.cardTitle}>LittleLife</h4>
                      </a>
                      <p className={classes.description}>
                        Ranger S2 Child Carrier
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £99.99</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B0019AC8GE">
                        <img src={lobster} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B0019AC8GE">
                        <h4 className={classes.cardTitle}>Phil and Teds</h4>
                      </a>
                      <p className={classes.description}>
                        Lobster Highchair - Red
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £69.95</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem md={4} sm={4}>
                  <Card plain product>
                    <CardHeader noShadow image>
                      <a href="https://www.amazon.co.uk/dp/B01M6XGKV1">
                        <img src={munchkinseat} className={classes.productImage} alt=".." />
                      </a>
                    </CardHeader>
                    <CardBody plain className={classes.productDetails}>
                      <a href="https://www.amazon.co.uk/dp/B01M6XGKV1">
                        <h4 className={classes.cardTitle}>Munchkin</h4>
                      </a>
                      <p className={classes.description}>
                        Portable Travel Child Booster Seat - Blue/Grey
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.footer}>
                      <div>
                        <span className={classes.price}> £20.90</span>
                      </div>
                      <div className={classes.textCenter}>
                        <Button default color="primary" size="" className={classes.reserveButton}>
                          Reserve Gift
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
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
