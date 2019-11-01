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
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui icons
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
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
      searchResult: '',
    };
  }

  renderManualAdd(classes) {
    return (
      <Card plain>
        <CardBody plain>
          <GridContainer>
            <GridItem xs={12} sm={4} md={9} lg={4}
              className={classes.mrAuto + " " + classes.mlAuto}
            >
              <form className={classes.form}>
                <CustomInput
                  labelText="Brand"
                  id="brand"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Details"
                  id="details"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <div className={classes.textCenter}>
                  <Button round color="info" type="submit">
                    Add Item
                  </Button>
                </div>
              </form>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    )
  }

  renderSearchResultTable(classes) {
    return (
      <Card plain>
        <CardBody plain>
          <Table
            tableHead={[
              "PRODUCT FOUND",
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
                <Button default color="primary" className={classes.reserveButton}>
                  Add to list
                </Button>
              ],
              {
                addnew: true,
                colspan: "2",
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
        </CardBody>
      </Card>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={4} md={9} lg={4}
              className={classes.mrAuto + " " + classes.mlAuto}
            >
              <GridContainer>
                <GridItem xs={12} sm={4} md={9} lg={4}
                  className={classes.mrAuto + " " + classes.mlAuto}
                >
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
                </GridItem>
              </GridContainer>
              {this.state.searchResult
                ? this.renderSearchResultTable(classes)
                : this.renderManualAdd(classes)
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
};

export default withStyles(styles)(SectionAddGifts);
