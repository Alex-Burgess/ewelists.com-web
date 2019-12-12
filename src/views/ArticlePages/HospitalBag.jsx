import React from "react";
import ListArticle from "custom/Article/ListArticle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import contentStyle from "assets/jss/custom/views/articlePages/hospitalBagStyle.jsx";

class ArticlePage extends React.Component {
  render() {
    const title = 'Hospital Bag';
    const subtitle = "Make sure you're all set with everything you need for the all important hospital bag.";
    const backgroundImg = 'hospitalbag.jpg';

    const storyProducts = [
      {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/john-lewis-partners-geneva-large-weekend-holdall/blue/p1807673', price: '£75.00', description: 'John Lewis & Partners Geneva Large Weekend Holdall, Blue.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/234172546?$rsp-pdp-port-1440$'},
      {brand: "Burt's Bees", url: 'https://www.amazon.co.uk/Burts-Bees-Percentage-Overnight-Ultra-Conditioning/dp/B07C3BLZRN', price: '£6.99', description: "Burt's Bees 100 Percentage Natural Overnight Intensive Lip Treatment, Ultra-Conditioning Lip Care, 7.08 g.", img: 'https://images-na.ssl-images-amazon.com/images/I/71yUvdw8UIL._SX679_.jpg'},
      {brand: 'Camelbak', url: 'https://www.amazon.co.uk/Camelbak-53622-CamelBak-eddy-75L/dp/B00NTYIHNQ', price: '£11.95', description: 'BPA Free Eddy Outdoor Bottle.', img: 'https://images-na.ssl-images-amazon.com/images/I/61J1m1AOrVL._SY879_.jpg'},
      {brand: 'Cybex', url: 'https://www.johnlewis.com/cybex-cloud-z-i-size-group-0-baby-car-seat-midnight-blue/p4329431', price: '£224.95', description: 'Cybex Cloud Z i-Size Group 0+ Baby Car Seat, Midnight Blue.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/238224245?$rsp-pdp-port-640$'},
      {brand: 'EasyAcc', url: 'https://www.amazon.co.uk/EasyAcc-Handheld-Electric-Rechargeable-Travel-Green/dp/B01NC2TS0C', price: '£11.99', description: 'EasyAcc Handheld Electric Mini Portable Outdoor Fan with Rechargeable 2600 mAh Battery Foldable Handle Desktop for Home and Travel-Green.', img: 'https://images-na.ssl-images-amazon.com/images/I/61dyJyfbCeL._SY355_.jpg'},
      {brand: 'Aptamil', url: 'https://www.amazon.co.uk/Aptamil-First-Infant-Milk-Starter/dp/B07H32RL92', price: '£23.70', description: 'Aptamil First Infant Milk Starter Pack Pack of 2.', img: 'https://images-na.ssl-images-amazon.com/images/I/51PmDv45mDL.jpg'},
      {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-giraffe-sleepsuit-pack-of-3-multi/p4255145', price: '£14.00', description: 'John Lewis & Partners Baby GOTS Organic Cotton Giraffe Sleepsuit, Pack of 3, Multi.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/003943837?$rsp-pdp-port-640$'},
      {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-short-sleeve-bodysuits-pack-of-5-white/p3170382', price: '£9.00', description: 'John Lewis & Partners Baby GOTS Organic Cotton Short Sleeve Bodysuits, Pack of 5, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/002955086?$rsp-pdp-port-640$'},
      {brand: 'M & S', url: 'https://www.marksandspencer.com/pure-cotton-hooded-chunky-knit-cardigan/p/p60164774', price: '£12', description: 'Pure Cotton Hooded Chunky Knit Cardigan.', img: 'https://asset1.cxnmarksandspencer.com/is/image/mands/Pure-Cotton-Hooded-Chunky-Knit-Cardigan-2/SD_04_T78_6501T_T1_X_EC_0?$PDP_INT_IMAGEGRID_1_LG$'},
      {brand: 'John Lewis and Partners', url: 'https://www.johnlewis.com/grobag-swaddle-blanket-pack-of-2-white/p3310657', price: '£19.99', description: 'Grobag Swaddle Blanket, Pack of 2, White.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/236972855?$rsp-pdp-port-640$'},
      {brand: 'LOONFREE', url: 'https://www.amazon.co.uk/Nursing-Breast-Pads-Washable-Absorbent/dp/B07Q79NTLS', price: '£??', description: 'Nursing Breast Pads - Washable Breast Pads, 14 PCS.', img: 'https://images-na.ssl-images-amazon.com/images/I/719UU55mjEL._SY355_.jpg'}
    ];

    const similarArticles = [
      {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
      description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
      {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
      description_short: "What to buy for your baby’s bedroom."},
      {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
      description_short: "Everything you need when bathing your baby."}
    ];

    const { classes } = this.props;
    const content = (
      <div>
        <p>
          What do you pack in that all important hospital bag. Whether you like to be super organised or you are just looking for some ideas, here are some top tips
          on what to pack in your bag.
        </p>
        <p>
          First things first, if you’re travelling by car then you can have two bags. The first bag can contain everything you need for the main event such as snacks,
          entertainment, toiletries and something to put your little one in once they arrive. The second bag can be kept in the car and contain things you might need
          after the birth such as extra clothes, nappies and of course the cute going home outfit. This
          <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/john-lewis-partners-geneva-large-weekend-holdall/blue/p1807673"> John Lewis & Partners </a> holdall is the perfect size for your hospital stay and most importantly it can
          be your babies holdall for any overnight trips you take later on in life. If you like to be really organised you can use large zip lock sandwich bags to
          compartmentalise your bag, such as sets of baby clothes, underwear, snacks etc. And don’t forget your maternity notes and birth plan.
        </p>
        <p>
          Go prepared with things to occupy yourselves with such as something to watch and read and also to have lots of snacks and drinks.   ADD MORE STORY.... then lists.
        </p>
        <p>
          Essentials:
          <ul>
            <li className={classes.listSpacing}>Car seat: <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/cybex-cloud-z-i-size-group-0-baby-car-seat-midnight-blue/p4329431"> Cybex Cloud 0+ Baby Car Seat</a> with <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/cybex-car-seat-base-z/p3843037"> Cybex Car Seat Base Z </a> which is great for carrying baby to and from the car, with super installation in the car and the modular system is good forward planning when you need the next size up seat.</li>
            <li className={classes.listSpacing}>Holdall: <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/john-lewis-partners-geneva-large-weekend-holdall/blue/p1807673"> John Lewis & Partners Holdall </a> combines style with good size.</li>
            <li className={classes.listSpacing}>Water bottle with straw: <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Camelbak-53622-CamelBak-eddy-75L/dp/B00NTYIHNQ"> CamelBak </a> makes drinking more comfortable</li>
            <li className={classes.listSpacing}>Lip balm: <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Burts-Bees-Percentage-Overnight-Ultra-Conditioning/dp/B07C3BLZRN"> Burt's Bees </a> is my favourite.</li>
            <li className={classes.listSpacing}>Fan: <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/EasyAcc-Handheld-Electric-Rechargeable-Travel-Green/dp/B01NC2TS0C"> EasyAcc Handheld Fan </a> is small enough to pack, but with enough battery life to last.</li>
            <li className={classes.listSpacing}>Ready made formula: <a target="_blank" rel="noopener noreferrer" href="https://www.mothercare.com/starter-sets/aptamil-1-first-baby-milk-formula-starter-pack-from-birth-6x70ml/607514.html"> Aptamil First Infant Starter Pack </a> are pre-sterilised, so you're ready to feed immediately if you're bottle or combination feeding.</li>
            <li className={classes.listSpacing}>Disposable bottles: ???</li>
            <li className={classes.listSpacing}>Refreshments: Remember to bring plenty of snacks and drinks.</li>
            <li className={classes.listSpacing}>Entertainment: A selection of movies, tv programs, magazines, or a good book will ensure you have something to occupy yourself when you feel like it.</li>
          </ul>
        </p>
        <p>
          For baby:
          <ul>
            <li className={classes.listSpacing}>baby grows: <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-giraffe-sleepsuit-pack-of-3-multi/p4255145"> John Lewis & Partners Giraffe Sleepsuit </a> what about built in mittens??</li>
            <li className={classes.listSpacing}>5 vests: <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/john-lewis-partners-baby-gots-organic-cotton-short-sleeve-bodysuits-pack-of-5-white/p3170382"> John Lewis & Partners Short Sleeve Bodysuits </a> are ???.</li>
            <li className={classes.listSpacing}>Cardigan: <a target="_blank" rel="noopener noreferrer" href="https://www.marksandspencer.com/pure-cotton-hooded-chunky-knit-cardigan/p/p60164774"> M & S Chunky Knit Cardigan </a> is one that is easy to get on and off.</li>
            <li className={classes.listSpacing}>Hat</li>
            <li className={classes.listSpacing}>Swaddle: <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/grobag-swaddle-blanket-pack-of-2-white/p3310657"> Grobag Swaddle Blanket </a></li>
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
            <li className={classes.listSpacing}>Nursing pads: <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Nursing-Breast-Pads-Washable-Absorbent/dp/B07Q79NTLS"> Organic Bamboo Nursing Pads </a> are washable, re-usable and comfortable.</li>
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

    return (
      <ListArticle
        isAuthenticated={this.props.isAuthenticated}
        content={ content }
        backgroundImg={backgroundImg}
        title={title}
        subtitle={subtitle}
        storyProducts={storyProducts}
        similarArticles={similarArticles}
      />
    );
  }
}

export default withStyles(contentStyle)(ArticlePage);
