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
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// core components

import sectionTextStyle from "assets/jss/material-kit-pro-react/views/articleSections/sectionTextStyle.jsx";

function SectionText({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <h1 className={classes.title}>
            Hospital Bag
          </h1>
          <h2 className={classes.subtitle}>
            Make sure you're all set with everything you need for the all important hospital bag.
          </h2>
          <p>
            What do you pack in that all important hospital bag, or is it bags? I like to be organised and took great pleasure in compartmentalising my two hospital bags
            many weeks out from the birth date. But even if that level of planning isn’t for you, I hope that you’ll get some use out of my top tips for what to pack in
            your bag, or if you want to go full out planning then check out my full list here (insert link)
          </p>
          <p>
            I mentioned that I had two bags, the reason for this is because some of the hospital wards or rooms are quite small and there isn’t the room to have a big
            suitcase. One bag can have the essentials for the birth and immediately afterwards and a second bag can have all the extra items you might need such as
            additional clothes for baby, you and your birth partner. If you’re travelling by car you can keep this bag in the boot until it’s needed. Even if you’re
            having a home birth its good to have the bag packed in case you need to make a trip to the hospital. This insert bag from John Lewis is the perfect size
            for your hospital stay and most importantly it can be your babies holdall for any overnight trips you take later on in life. My other top tip is to use
            large zip lock sandwich bags to put together sets of clothes for your little ones or a parcel of nappies and wipes for changing, it helps enormously when
            trying to find things in your bag.
          </p>
          <p>
            The first thing you should pack is your maternity notes and birth plan. Chat through these with your birth partner well in advance and make sure they
            understand your wishes. When the time comes you will be caught up in the moment and probably will go along with whatever you are told to do. If there are
            things that are important to you, such as going in the pool or trying hypnobirthing, you need to be firm on your wishes and your birth partner is the best
            person to be your voice for this.
          </p>
          <p>
            Right now you probably don’t know how long you will be hanging around the hospital for. It’s good to go prepared with things to occupy yourselves with such
            as something to watch and read and also to have lots of snacks and drinks, for you and your birth partner. Having a drink bottle with a straw (insert drink
            bottle link) makes life a lot easier and a good lip balm (insert lip balm) is essential, especially if you use the gas and air. I also found it handy to
            have a fan (insert fan), which I used lots commuting through the summer, and a face cloth that could be used to keep my head cool.
          </p>
          <p>
            I knew that I wanted to try breast feeding and hoped that I would get lots of help at the hospital, which I did. But I also wanted to have an option to be
            able to feed my baby if the breast feeding didn’t work out. I packed a couple of ready made bottles of milk (Insert Formula and bottles) which turned out to be
            a great idea when, 1) I discovered I had a very hungry baby, and 2) the breast feeding didn’t work out for me, despite all the help (and man handling) from the
            midwives. And in case you’ve heard any negative press about you being looked down on if you don’t try the breast feeding, I had none of this and only have
            positive things to say. Regardless if the feeding works out, you will want to have some nursing pads and a maternity bra. I used these natural bamboo nursing
            pads (insert link) which are environmentally friendly and you can put in the wash.
          </p>
          <p>
            For you:
            <ul>
              <li>2 x Nightdress - great to wear before, during and after the birth.</li>
              <li>Baggy Clothes - Your bump looses all its shape, so loose is better than stretchy.</li>
              <li>Socks - warm hospitals actually have cold floors.</li>
              <li>Slippers - feel more comfortable in and around the ward.</li>
              <li>Dressing gown - feel more comfortable in and around the ward.</li>
              <li>Toiletries - all your favourites and a hairband.</li>
              <li>Underwear - have spares.</li>
              <li>Breast pads - have spares.</li>
            </ul>
          </p>
          <p>
            For your birthing partner:
            <ul>
              <li>shorts and t-shirts - birthing hospitals are always hot.</li>
              <li>Refreshments - plenty of snacks and drinks.</li>
              <li>Entertainment - iPad, magazines, etc.</li>
            </ul>
          </p>
          <p>
            For baby:
            <ul>
              <li>baby grows - with built in mittens. Have spares.</li>
              <li>vests - newborn and 0-3 months sizes .</li>
              <li>Cardigan - one that is easy to get on and off.</li>
              <li>Hat</li>
              <li>Swaddle - aka sleeping bag (Insert gro baby sleep bags)</li>
              <li>blanket</li>
              <li>Muslins</li>
              <li>Nappies - 12 should get you through 2 days in hospital.</li>
              <li>Cotton wool</li>
              <li>Wipes - water wipes are nice and kind to newborn skin.</li>
            </ul>
          </p>
          <p>
            General:
            <ul>
              <li>Car seat</li>
              <li>Drink bottle with straw</li>
              <li>Lip balm</li>
              <li>Fan</li>
              <li>Ready made formula</li>
              <li>Disposable bottles</li>
            </ul>
          </p>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SectionText.propTypes = {
  classes: PropTypes.object
};

export default withStyles(sectionTextStyle)(SectionText);
