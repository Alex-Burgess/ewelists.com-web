import React from "react";
import ListArticle from "custom/Article/ListArticle.js";


export default function TravelGear(props) {
  const title = 'Travel Gear';
  const subtitle = 'Our favourite gear to make travelling with your little ones no fuss!';
  const backgroundImg = 'travelgear.jpg';

  const storyProducts = [
    {brand: 'BABYBJÖRN', url: 'https://www.amazon.co.uk/dp/B01H24LM58', price: '£189.99', description: 'Travel Cot Easy Go, Anthracite, with transport bag.', img: 'https://images-na.ssl-images-amazon.com/images/I/81qYpf1Sm2L._SX679_.jpg'},
    {brand: 'Micralite', url: 'https://www.amazon.co.uk/dp/B07PN49Q4S', price: '£175.00', description: 'Micralite Travel Cot 3 in 1 Sleep & Go Portable Travel Cot - Carbon/Grey.', img: 'https://images-na.ssl-images-amazon.com/images/I/51oQcQG0CKL._SX355_.jpg'},
    {brand: 'BABYZEN', url: 'https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291', price: '£389.00', description: 'BABYZEN YOYO+ Pushchair, Grey/Black.', img: 'https://johnlewis.scene7.com/is/image/JohnLewis/237457570?$rsp-pdp-port-640$'},
    {brand: 'Mamas & Papas', url: 'https://www.amazon.co.uk/dp/B07FBYHY7L', price: '£189.00', description: 'Acro Compact Buggy, Black.', img: 'https://images-na.ssl-images-amazon.com/images/I/81LJ-0%2BSKVL._SY450_.jpg'},
    {brand: 'Micralite', url: 'https://www.amazon.co.uk/dp/B07PM6ZD1C', price: '£175.00', description: 'Micralite ProFold Compact Lightweight Carbon Stroller.', img: 'https://images-na.ssl-images-amazon.com/images/I/71hqy17iYuL._SY550_.jpg'},
    {brand: 'BABYBJÖRN', url: 'https://www.amazon.co.uk/dp/B07937WXKD', price: '£119.99', description: 'BABYBJÖRN Baby Carrier One Air, 3D Mesh, Navy Blue, 2018 Edition.', img: 'https://images-na.ssl-images-amazon.com/images/I/91hX32oi5LL._SX355_.jpg'},
    {brand: 'LittleLife', url: 'https://www.amazon.co.uk/dp/B0792Y5L7K', price: '£79.00', description: 'LittleLife Ranger S2 Child Carrier.', img: 'https://images-na.ssl-images-amazon.com/images/I/81KydgdpFmL._SY679_.jpg'},
    {brand: 'Phil and Teds', url: 'https://www.amazon.co.uk/dp/B0019AC8GE', price: '69.95', description: 'Phil and Teds Lobster Highchair Red.', img: 'https://images-na.ssl-images-amazon.com/images/I/91SA-D7wIUL._SX355_.jpg'},
    {brand: 'Munchkin', url: 'https://www.amazon.co.uk/dp/B01M6XGKV1', price: '£20.83', description: 'Munchkin Portable Travel Child Booster Seat, (Blue/Grey).', img: 'https://images-na.ssl-images-amazon.com/images/I/7178PGluPOL._SY355_.jpg'}
  ];

  const similarArticles = [
    {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
    {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
    description_short: "Everything you need when bathing your baby."},
    {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
    description_short: "What to buy for your baby’s bedroom."}
  ];

  const content = (
    <div>
      <p>
        The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly moving around the city
        hopping on and off public transport, taking with you through the airport, or just keeping in the car as a just in case item.  We highly recommend the
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B07FBYHY7L"> Mamas & Papas Acro </a> and <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B07PM6ZD1C"> Micralite ProFold </a>
        compact strollers as their folded size is within cabin luggage dimensions on popular airlines. The
        <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291"> BABYZEN YOYO+ </a> is another fantastic alternative. With the
        <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/babyzen-yoyo-newborn-pack/p3907377"> Newborn Pack </a> and other accessories it is the compact stroller that could
        even fulfill all your pushcair needs.
      </p>
      <p>
        The <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B07FBYHY7L"> BabyBjörn </a> travel cot has to be one of the best designed, for it's simplicity to setup and
        amazing compact packed size.  When you need to get your cot setup fast for the little one to go to sleep, this is the one I'd want to use, it's the quickest
        to setup of any i've used! The <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B07FBYHY7L"> Micralite </a> is a similar design, although it's packed size is a little
        bulkier, but the new born insert and zipped pannel make it more versatile.
      </p>
      <p>
        There are often situations where it's just more practical to use a baby carrier.  The
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B07937WXKD"> BabyBjörn Baby Carrier One Air</a> is another fantastic product from BabyBjörn that is simple
        and comfortable to use. As your little one outgrows it's first carrier, the <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B0792Y5L7K"> LittleLife Ranger S2 </a> is a
        great way to keep carrying them.  For a back carrier, it's incredibly light, which all helps, whether you're exploring on holiday or walking the dog back home.
      </p>
      <p>
        Whether you're getting away for the weekend, or a couple of weeks on holiday, it's great to know that your little one is always going to be able to
        comfortably and safely enjoy meal time.  For the younger ones, the <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B0019AC8GE"> Phil and Teds Lobster </a> is perfect.
        For those a little bigger, the <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B01M6XGKV1"> Munchkin Booster Seat </a> is super versatile and will get years of use.
      </p>
    </div>
  );

  return (
    <ListArticle
      isAuthenticated={props.isAuthenticated}
      user={props.user}
      content={ content }
      backgroundImg={backgroundImg}
      title={title}
      subtitle={subtitle}
      storyProducts={storyProducts}
      similarArticles={similarArticles}
    />
  );
}
