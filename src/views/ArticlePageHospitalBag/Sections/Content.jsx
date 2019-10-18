import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import contentStyle from "assets/jss/material-kit-pro-react/views/articleSections/contentStyle.jsx";

class Content extends React.Component {
  render(){
    const { classes } = this.props;

    return (
      <div>
        <p>
          What do you pack in that all important hospital bag. Whether you like to be super organised or you are just looking for some ideas, here are some top tips
          on what to pack in your bag.
        </p>
        <p>
          First things first, if you’re travelling by car then you can have two bags. The first bag can contain everything you need for the main event such as snacks,
          entertainment, toiletries and something to put your little one in once they arrive. The second bag can be kept in the car and contain things you might need
          after the birth such as extra clothes, nappies and of course the cute going home outfit. This
          <a href="https://www.amazon.co.uk/dp/B07FBYHY7L"> John Lewis & Partners </a> holdall is the perfect size for your hospital stay and most importantly it can
          be your babies holdall for any overnight trips you take later on in life. If you like to be really organised you can use large zip lock sandwich bags to
          compartmentalise your bag, such as sets of baby clothes, underwear, snacks etc. And don’t forget your maternity notes and birth plan.
        </p>
        <p>
          Go prepared with things to occupy yourselves with such as something to watch and read and also to have lots of snacks and drinks.   ADD MORE STORY.... then lists.
        </p>
        <p>
          Essentials:
          <ul>
            <li className={classes.listSpacing}>Car seat: <a href="https://www.johnlewis.com/cybex-cloud-z-i-size-group-0-baby-car-seat-midnight-blue/p4329431"> Cybex Cloud 0+ Baby Car Seat</a> with <a href="https://www.johnlewis.com/cybex-car-seat-base-z/p3843037"> Cybex Car Seat Base Z </a> which is great for carrying baby to and from the car, with super installation in the car and the modular system is good forward planning when you need the next size up seat.</li>
            <li className={classes.listSpacing}>Holdall: <a href="https://www.johnlewis.com/john-lewis-partners-geneva-large-weekend-holdall/blue/p1807673"> John Lewis & Partners Holdall </a> combines style with good size.</li>
            <li className={classes.listSpacing}>Water bottle with straw: <a href="https://www.amazon.co.uk/Camelbak-53622-CamelBak-eddy-75L/dp/B00NTYIHNQ"> CamelBak </a> makes drinking more comfortable</li>
            <li className={classes.listSpacing}>Lip balm: <a href="https://www.amazon.co.uk/Burts-Bees-Percentage-Overnight-Ultra-Conditioning/dp/B07C3BLZRN"> Burt's Bees </a> is my favourite.</li>
            <li className={classes.listSpacing}>Fan: <a href="https://www.amazon.co.uk/EasyAcc-Handheld-Electric-Rechargeable-Travel-Green/dp/B01NC2TS0C"> EasyAcc Handheld Fan </a> is small enough to pack, but with enough battery life to last.</li>
            <li className={classes.listSpacing}>Ready made formula: <a href="https://www.mothercare.com/starter-sets/aptamil-1-first-baby-milk-formula-starter-pack-from-birth-6x70ml/607514.html"> Aptamil First Infant Starter Pack </a> are pre-sterilised, so you're ready to feed immediately if you're bottle or combination feeding.</li>
            <li className={classes.listSpacing}>Disposable bottles: ???</li>
            <li className={classes.listSpacing}>Refreshments: Remember to bring plenty of snacks and drinks.</li>
            <li className={classes.listSpacing}>Entertainment: A selection of movies, tv programs, magazines, or a good book will ensure you have something to occupy yourself when you feel like it.</li>
          </ul>
        </p>
        <p>
          For baby:
          <ul>
            <li className={classes.listSpacing}>baby grows: <a href="https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-giraffe-sleepsuit-pack-of-3-multi/p4255145"> John Lewis & Partners Giraffe Sleepsuit </a> what about built in mittens??</li>
            <li className={classes.listSpacing}>5 vests: <a href="https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-short-sleeve-bodysuits-pack-of-5-white/p3170382"> John Lewis & Partners Short Sleeve Bodysuits </a> are ???.</li>
            <li className={classes.listSpacing}>Cardigan: <a href="https://www.marksandspencer.com/pure-cotton-hooded-chunky-knit-cardigan/p/p60164774"> M & S Chunky Knit Cardigan </a> is one that is easy to get on and off.</li>
            <li className={classes.listSpacing}>Hat</li>
            <li className={classes.listSpacing}>Swaddle: <a href="https://www.johnlewis.com/grobag-swaddle-blanket-pack-of-2-white/p3310657"> Grobag Swaddle Blanket </a></li>
            <li className={classes.listSpacing}>blanket: </li>
            <li className={classes.listSpacing}>Muslins: </li>
            <li className={classes.listSpacing}>Nappies - 12 should get you through 2 days in hospital.</li>
            <li className={classes.listSpacing}>Cotton wool</li>
            <li className={classes.listSpacing}>Wipes - water wipes are nice and kind to newborn skin.</li>
          </ul>
        </p>
        <p>
          For you:
          <ul>
            <li className={classes.listSpacing}>2 x Nightdress - great to wear before, during and after the birth.</li>
            <li className={classes.listSpacing}>Baggy Clothes - Your bump looses all its shape, so loose is better than stretchy.</li>
            <li className={classes.listSpacing}>Socks - warm hospitals actually have cold floors.</li>
            <li className={classes.listSpacing}>Slippers - feel more comfortable in and around the ward.</li>
            <li className={classes.listSpacing}>Dressing gown - feel more comfortable in and around the ward.</li>
            <li className={classes.listSpacing}>Toiletries - all your favourites and a hairband.</li>
            <li className={classes.listSpacing}>Underwear - have spares.</li>
            <li className={classes.listSpacing}>Nursing pads: <a href="https://www.amazon.co.uk/Nursing-Breast-Pads-Washable-Absorbent/dp/B07Q79NTLS"> Organic Bamboo Nursing Pads </a> are washable, re-usable and comfortable.</li>
          </ul>
        </p>
        <p>
          For your birthing partner:
          <ul>
            <li className={classes.listSpacing}>shorts and t-shirts - birthing hospitals are always hot.</li>
          </ul>
        </p>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object
};

export default withStyles(contentStyle)(Content);
