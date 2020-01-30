import React, { useState, useEffect } from 'react';
// custom components
// import { scrollToId } from "custom/Scroll/ScrollToId";
import { getUsersLists } from "custom/Article/GetUsersLists";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";

// Blog Data
const title = 'Christmas Ideas for Toddlers';
const subtitle = 'If you are stuck wondering what to get a toddler for Christmas, here are some of our favourite ideas!';
const backgroundImg = 'christmas-toddlers.jpg';
const productData = require('./Products/ChristmasIdeas.json');
const similarArticles = [
  {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travel-gear.jpg',
  description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
  {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bath-time.jpg',
  description_short: "Everything you need when bathing your baby."},
  {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nursery-list.jpg',
  description_short: "What to buy for your baby’s bedroom."}
];

export default function ChristmasIdeasForToddlers(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          Toddlers love to mimic adults and join in ‘helping’ with every day tasks. Here are some great ideas to encourage role play.
        </p>
        <p>
          Anyone for tea? This <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B00XLNNNK2"> Emma Bridgewater </a>
          tea set in Polka Dot comes with its own cute carry case. The recognisable Polka Dot design might even give you some ideas for an
          adult gift idea. It is also available in the Pink Heart Design.
        </p>
        <p>
          Hours of entertainment can be had with a play kitchen and there are lots of little extras that you can add over time or put on
          their list. Play food, pots and pans, cakes to put in the oven, the ideas are endless. This kitchen from
           <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B00CM9J1K2"> Tidlo </a> is made from
          sustainable components and the counter top height is slightly higher than other play kitchens meaning they get more years of play.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-c001-1234-abcdefghijkl",
          "12345678-prod-c002-1234-abcdefghijkl",
          "12345678-prod-c003-1234-abcdefghijkl",
          "12345678-prod-c004-1234-abcdefghijkl",
          "12345678-prod-c005-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          Children love to help with cooking because they get to help create it and best of all they get to eat it! Having their own apron
          will really make them feel the part and this one from
          <a target="_blank" rel="noopener noreferrer" href="https://www.gltc.co.uk/collections/all-finishing-touches/products/personalised-childs-apron-mr-fox"> The Great Little Trading Company </a>
          gives you the option to personalise it with their name.
        </p>
        <p>
          If you’re looking for a suggestion on what to make with children, check out this simple yoghurt pot cake which uses the yoghurt
          pot as your measuring devise. RECIPE: 1 pot natural yoghurt, 2 pots of self raising flour, half a pot of mild olive oil, 3 eggs,
          pinch of salt and dash of vanilla essence. Beat until smooth and then transfer to a greased loaf tin. Bake in the an oven at 180c
          for 45-60 minutes. Simple.
        </p>
        <p>
          This cafe by
          <a target="_blank" rel="noopener noreferrer" href="https://www.gltc.co.uk/collections/play-kitchen/products/star-beans-coffee-shop"> The Great Little Trading Company </a>
          takes up less space than a kitchen but should provide just as much entertainment. It’s made of wood which ticks the box of less plastic.
          How about adding the <a target="_blank" rel="noopener noreferrer" href="https://www.gltc.co.uk/collections/sale-toys/products/wooden-till-red"> Wooden Till </a>
          to really make your little one feel like they are in business.
        </p>
        <p>
          Vacuuming isn’t high on the list of most adults but it seems like great fun to children, especially if they can do it at the same
          time as an adult. This
          <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B01M3WPLZX"> Little Helper Dyson </a>
          is just like the real thing and will have them wizzing around after you making sure the house is spotless.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-c006-1234-abcdefghijkl",
          "12345678-prod-c007-1234-abcdefghijkl",
          "12345678-prod-c008-1234-abcdefghijkl",
          "12345678-prod-c009-1234-abcdefghijkl",
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          A scooter or a balance bike are great ways to encourage balance and coordination. This scooter by
          <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B01BE0J5TQ"> Micro Scooters </a>
          goes from ages 2-5 and comes in a range of colours.
        </p>
        <p>
          A balance bike is a great way for children to gain confidence on a bike without the need for pedals or stabilisers. The
          <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B06XXCQ7GQ"> Nicko Unicorn Rainbow </a> and
          <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B01IVW78FI"> Racing Cars </a>
          bikes by are made from plywood and come in a fantastic range of colours and patterns such as the unicorn print or the racer bike print.
        </p>
        <p>
          Don't forget the safety helmet for use with the scooter or bike. This helmet by
          <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/dp/B07M9PF26C"> UniqueFit </a> has an adjustable dial to
          get the perfect fit and it comes in 5 different colours.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-c010-1234-abcdefghijkl",
          "12345678-prod-c011-1234-abcdefghijkl",
          "12345678-prod-c012-1234-abcdefghijkl",
          "12345678-prod-c013-1234-abcdefghijkl"
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
