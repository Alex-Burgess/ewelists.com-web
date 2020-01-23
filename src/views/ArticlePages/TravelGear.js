import React, { useState, useEffect } from 'react';
// custom components
// import { scrollToId } from "custom/Scroll/ScrollToId";
import { getUsersLists } from "custom/Article/GetUsersLists";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";

// Blog Data
const title = 'Travel Gear';
const subtitle = 'Our favourite gear to make travelling with your little ones no fuss!';
const backgroundImg = 'travelgear.jpg';
const productData = require('./Products/TravelGear.json');
const similarArticles = [
  {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
  description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
  {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
  description_short: "Everything you need when bathing your baby."},
  {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
  description_short: "What to buy for your baby’s bedroom."}
];

export default function TravelGear(props) {
  const [lists, setLists] = useState({});

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
      <Products
        products={[
          "12345678-prod-t001-1234-abcdefghijkl",
          "12345678-prod-t002-1234-abcdefghijkl",
          "12345678-prod-t003-1234-abcdefghijkl",
          "12345678-prod-t004-1234-abcdefghijkl",
          "12345678-prod-t005-1234-abcdefghijkl",
          "12345678-prod-t006-1234-abcdefghijkl",
          "12345678-prod-t007-1234-abcdefghijkl",
          "12345678-prod-t008-1234-abcdefghijkl",
          "12345678-prod-t009-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
    </div>
  );
  useEffect( () => {
    async function getLists(){
      const lists = await getUsersLists();
      setLists(lists);
    }

    if (props.isAuthenticated) {
      getLists();
    }
  }, [props.isAuthenticated]);

  return (
    <ListArticle
      isAuthenticated={props.isAuthenticated}
      user={props.user}
      content={ content }
      backgroundImg={backgroundImg}
      title={title}
      subtitle={subtitle}
      storyProducts={[]}
      similarArticles={similarArticles}
    />
  );
}
