import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "custom/Article/GetUsersLists";
import SectionHeading from "custom/Article/SectionHeading.js";
import SectionHeadings from "custom/Article/SectionHeadings.js";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";

// Blog Data
const title = 'Bath Time';
const subtitle = 'How to give your baby a bath';
const backgroundImg = 'bathtime.jpg';
const productData = require('./Products/BathTime.json');
const similarArticles = [
  {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
  description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
  {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
  description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
  {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'nurserylist.jpg',
  description_short: "What to buy for your baby’s bedroom."}
];

export default function BathTime(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          It can be a daunting prospect when it comes to giving your new baby a bath. You worry about how you will
          manage this small and fragile being in the slippery water, and whether they will even like it. However fear
          not, with our handy guide to bath-time and our list of favourite products, you will be conquering bath-time
          like a pro.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "essentials", "text": "The essentials to get you started"},
          {"name": "bath", "text": "Which type of bath to buy"},
          {"name": "fun", "text": "Making bath-time fun"}
        ]}
      />
      <div>
        <SectionHeading name="essentials" text="The essentials to get you started" />
        <p>
          For the first couple of weeks after your little one has arrived there really is no need to give your baby a
          bath. It’s fine to give your baby a clean with some water and cotton wool, and a top and tail bowl is designed
          just for this purpose. It has two separate pools of water, one for the head and body, and one for the nappy
          area. Some cleansing lotion and cotton wool can be used where there are areas you want to give more attention.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-b001-1234-abcdefghijkl",
          "12345678-prod-b002-1234-abcdefghijkl",
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          When it comes to the first bath you should start by making sure you have everything ready and close by. You
          can bring a changing mat, hooded towel, moisturiser, clothes and nappy into the bathroom so you can do
          everything you need in the same room. Make sure the room is nice and warm and that the water temperature is
          37c by using a thermometer.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-b003-1234-abcdefghijkl",
          "12345678-prod-b004-1234-abcdefghijkl",
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          Babies tend to have very sensitive skin which can dry out quickly. Choosing a bath care product that is
          specifically designed for dry and sensitive skin can help with looking after their skin. This Farms Child
          range was formulated for babies with really dry skin or eczema. It’s also handy to have a natural sponge or
          some small flannels to gently wash your baby.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-b005-1234-abcdefghijkl",
          "12345678-prod-b006-1234-abcdefghijkl",
          "12345678-prod-b007-1234-abcdefghijkl",
          "12345678-prod-b008-1234-abcdefghijkl",
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="bath" text="Which type of bath to buy" />
        <p>
          Babies are slippery when wet but a bath support can free up your hands to wash your baby. For a simple
          addition to your existing bath, a bath support can be used to lie your little one in while they are being
          washed. Placing a flannel over your baby’s tummy can help keep them nice and warm. If you don’t have a bath or
          if you want to use less water, a baby bath with a built in support is a good option. You can also get compact
          bath tubs that can sit in the kitchen sink or used in a stand to make it easier on your back.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-b009-1234-abcdefghijkl",
          "12345678-prod-b010-1234-abcdefghijkl",
          "12345678-prod-b011-1234-abcdefghijkl",
          "12345678-prod-b012-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          Once your little one can sit up they can sit and play in your existing bath. A slip mat is very handy here
          because it will help prevent them sliding when they wriggle around. If they are still a bit wobbly when
          they’re sitting you can use a bath seat which will give you extra peace of mind that they will be supported.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-b013-1234-abcdefghijkl",
          "12345678-prod-b014-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="fun" text="Making bath-time fun" />
        <p>
          You will probably find that bath-time becomes one of the most enjoyable activities for your little one. Having
          some bath toys will keep your little entertained and help build their confidence in the bath. And if you want
          to keep your bathroom nice a tidy a bath toy net will help you keep things confined and organised.
        </p>
      </div>
      <Products
        products={[
          "12345678-prod-b015-1234-abcdefghijkl",
          "12345678-prod-b016-1234-abcdefghijkl",
          "12345678-prod-b017-1234-abcdefghijkl",
          "12345678-prod-b018-1234-abcdefghijkl",
          "12345678-prod-b019-1234-abcdefghijkl",
          "12345678-prod-b020-1234-abcdefghijkl"
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
