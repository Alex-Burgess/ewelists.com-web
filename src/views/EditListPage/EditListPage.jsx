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
/*eslint-disable*/
import React from "react";
import { API } from "aws-amplify";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Palette from "@material-ui/icons/Palette";
import People from "@material-ui/icons/People";
import List from "@material-ui/icons/List";
import Search from "@material-ui/icons/Search";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import FooterLarge from "components/Footer/FooterLarge.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
// sections for this page
import SectionListDetails from "./Sections/ListDetails.jsx";
import SectionProducts from "./Sections/Products.jsx";
import SectionAddGifts from "./Sections/AddGifts.jsx";
import SectionShare from "./Sections/Share.jsx";

import articlePageStyle from "assets/jss/material-kit-pro-react/views/viewEditPageStyle.jsx";

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      occasion: '',
      isEdit: false,
      products: [
        {
          // productId: 'PRODUCT#1009',
          productId: 'PRODUCT1009',
          quantity: 1,
          reserved: 1,
          brand: 'BABYBJÖRN',
          details: 'Travel Cot Easy Go, Anthracite, with transport bag',
          price: '219.99',
          img: 'https://images-na.ssl-images-amazon.com/images/I/81qYpf1Sm2L._SX679_.jpg'
        },
        {
          productId: 'PRODUCT1008',
          quantity: 2,
          reserved: 0,
          brand: 'BABYZEN',
          details: 'YOYO+ Puschair, Black with Aqua',
          price: '389',
          img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237457570?$rsp-pdp-port-640$'
        },
        {
          productId: 'PRODUCT1007',
          quantity: 1,
          reserved: 0,
          brand: 'Micralite',
          details: 'Travel Cot 3 in 1 Sleep & Go - Carbon/Grey',
          price: '175',
          img: 'https://images-na.ssl-images-amazon.com/images/I/81LJ-0%2BSKVL._SY450_.jpg'
        }
      ]
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    try {
      console.log("Calling list API ")
      const response = await this.getList();
      console.log("Got details for list " + response.list.title)
      this.setState({
        title: response.list.title,
        description: response.list.description,
        occasion: response.list.occasion
      });
      this.setState({ isLoading: false });
    } catch (e) {
      console.log("List ID " + this.props.match.params.id + " does not exist for the user.")
      this.props.history.push('/error/' + this.props.match.params.id);
    }
  }

  getList() {
    return API.get("lists", "/" + this.props.match.params.id);
  }

  editDetails = event => {
    this.setState({ isEdit: true });
  }

  saveDetails = async event => {
    try {
      var requestBody = {
        "title": this.state.title,
        "description": this.state.description,
        "occasion": this.state.occasion
      };
      const response = await this.updateListRequest(requestBody);
      console.log("update response title: " + response[0].updates.title);
      console.log("update response description: " + response[0].updates.description);
      console.log("update response description: " + response[0].updates.occasion);

      this.setState({
        title: response[0].updates.title,
        description: response[0].updates.description,
        occasionSelect: response[0].updates.occasion,
        isEdit: false
       });
    } catch (e) {
      console.log('Unexpected error occurred when updating list: ' + e.response.data.error);
      this.setState({
        updateError: true,
        updateErrorMessage: 'Unexpected error occurred when updating list.  Please try again.'
      })
    }
  }

  updateListRequest(updateItem) {
    return API.put("lists", "/" + this.props.match.params.id, {
      body: updateItem
    });
  }

  handleChange = event => {
    var updateObj = {};
    updateObj[event.target.id] = event.target.value;
    this.setState( updateObj );
  }

  handleOccasionSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
        color="info"
        brand="ewelists"
          links={<HeaderLinksAuth dropdownHoverColor="info" />}
          fixed
          // changeColorOnScroll={{
          //   height: 200,
          //   color: "transparent"
          // }}
        />
        <div className={classes.main}>
          <SectionListDetails
            title={this.state.title}
            description={this.state.description}
            occasion={this.state.occasion}
            isEdit={this.state.isEdit}
            saveDetails={this.saveDetails.bind(this)}
            editDetails={this.editDetails.bind(this)}
            handleChange={this.handleChange.bind(this)}
            handleOccasionSelect={this.handleOccasionSelect.bind(this)}
          />
          <div className={classes.profileTabs}>
            <NavPills
              alignCenter
              color="primary"
              tabs={[
                {
                  tabButton: "Manage List",
                  tabIcon: List,
                  tabContent: (
                    <div>
                      <SectionProducts products={this.state.products} />
                    </div>
                  )
                },
                {
                  tabButton: "Add Gifts",
                  tabIcon: Search,
                  tabContent: (
                    <div>
                      <SectionAddGifts />
                    </div>
                  )
                },
                {
                  tabButton: "Share",
                  tabIcon: People,
                  tabContent: (
                    <div>
                      <SectionShare />
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
        <FooterLarge />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(articlePageStyle)(ArticlePage);
