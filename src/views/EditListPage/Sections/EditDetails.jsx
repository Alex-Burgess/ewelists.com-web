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
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icons
import Today from "@material-ui/icons/Today";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Info from "components/Typography/Info.jsx";

import sectionDetailsStyle from "assets/jss/material-kit-pro-react/views/editListSections/editDetailsStyle.jsx";

import christmasCard from "assets/img/examples/christmas-card.jpg";
// import christmasCard from "assets/img/examples/card-profile4.jpg";

class SectionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
    };
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer >
            <GridItem xs={12} sm={12} md={8}>
              <InputLabel className={classes.label}>
                Title:
              </InputLabel>
              <CustomInput
                id="title"
                title
                inputProps={{
                  placeholder: "Add your title here...",
                }}
                formControlProps={{
                  fullWidth: true,
                }}
              />
              <GridContainer >
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel className={classes.label + " " + classes.date}>
                    Date:
                  </InputLabel>
                  <FormControl fullWidth>
                    <Datetime
                      className={classes.dateField}
                      dateFormat="DD/MM/YYYY"
                      timeFormat={false}
                      inputProps={{ placeholder: "Select a date" }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel className={classes.label + " " + classes.date}>
                    Occasion:
                  </InputLabel>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={this.state.simpleSelect}
                      onChange={this.handleSimple}
                      inputProps={{
                        name: "simpleSelect",
                        id: "simple-select"
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Select Type
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="2"
                      >
                        Baby Shower
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="3"
                      >
                        Birthday
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="4"
                      >
                        Christmas
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="5"
                      >
                        Baptism
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="6"
                      >
                        Christening
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="7"
                      >
                        Other
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <InputLabel className={classes.label}>
                Description:
              </InputLabel>
              <CustomInput
                id="textarea-input"
                description
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  placeholder: "Add your description here...",
                  multiline: true,
                  rows: 5
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InputLabel className={classes.label}>
                Image:
              </InputLabel>
              <Card profile plain>
                <CardHeader image plain>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={christmasCard} className={classes.listImage} alt="..." />
                  </a>
                  <div
                    className={classes.coloredShadow}
                    style={{
                      backgroundImage: `url(${christmasCard})`,
                      opacity: "1"
                    }}
                  />
                </CardHeader>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionDetails.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionDetailsStyle)(SectionDetails);
