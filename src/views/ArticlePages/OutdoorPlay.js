import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "custom/Article/GetUsersLists";
import SectionHeading from "custom/Article/SectionHeading.js";
import SectionHeadings from "custom/Article/SectionHeadings.js";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";

// Blog Data
const name = 'childrens-outdoor-play'
const productData = require('./Products/OutdoorPlay.json');

export default function OutdoorPlay(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          There is nothing better than getting out in the fresh air and enjoying the outdoors. Children love the freedom
          of running around and learning new skills, and for you it has the added benefit of burning their energy and
          keeping messy play outdoors.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "anywhere", "text": "Toys to take anywhere"},
          {"name": "ride-on", "text": "Ride on toys"},
          {"name": "garden", "text": "Fun in the garden"},
        ]}
      />
      <div>
        <SectionHeading name="anywhere" text="Toys to take anywhere" />
        <p>
          Why not double the fun and have some games that both the kids and adults can enjoy. The kids will LOVE any
          game that you join in, plus all that hand eye coordination is great for the budding sportsmen and sportswomen.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-o001-1234-abcdefghijkl",
          "12345678-blog-o002-1234-abcdefghijkl",
          "12345678-blog-o003-1234-abcdefghijkl",
          "12345678-blog-o004-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="ride-on" text="Ride on toys" />
        <p>
          Children love the independence they get when they are in control, and if it’s something that moves, all the
          better. The Little Tike cars have been a hit for decades and the range now include styles for every
          personality. There are also lots of options to practice balancing skills and start building up to that first
          big bike.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-o005-1234-abcdefghijkl",
          "12345678-blog-o006-1234-abcdefghijkl",
          "12345678-blog-o007-1234-abcdefghijkl",
          "12345678-blog-o008-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="garden" text="Fun in the garden" />
        <p>
          Playing in the garden opens up a whole new host of activities meaning your little one will be entertaining
          themselves for hours. If you’re into gardening why not get the kids involved with their own tools, and best
          gift of all, their own watering can. It’s also a great place to have messy play, so get the paint, water and
          sand out and let them go for it.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-o009-1234-abcdefghijkl",
          "12345678-blog-o010-1234-abcdefghijkl",
          "12345678-blog-o011-1234-abcdefghijkl",
          "12345678-blog-o012-1234-abcdefghijkl",
          "12345678-blog-o013-1234-abcdefghijkl",
          "12345678-blog-o014-1234-abcdefghijkl",
          "12345678-blog-o015-1234-abcdefghijkl",
          "12345678-blog-o016-1234-abcdefghijkl"
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
      name={name}
      content={ content }
      setTitle={props.setTitle}
    />
  );
}
