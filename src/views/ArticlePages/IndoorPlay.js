import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "custom/Article/GetUsersLists";
import SectionHeading from "custom/Article/SectionHeading.js";
import SectionHeadings from "custom/Article/SectionHeadings.js";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";

// Blog Data
const name = 'childrens-indoor-play'
const productData = require('./Products/IndoorPlay.json');

export default function OutdoorPlay(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          Young children have active minds and want to explore everything in the world around them. Keep them engaged
          and help them learn new skills with our fun ideas for playtime.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "wooden", "text": "Wooden Toys"},
          {"name": "building", "text": "Building and Puzzles"},
          {"name": "trains", "text": "Train Sets"},
          {"name": "creative", "text": "Creative Play"},
          {"name": "roleplay", "text": "Role Play"}
        ]}
      />
      <div>
        <SectionHeading name="wooden" text="Wooden Toys" />
        <p>
          Many of us are a lot more conscious about the environment now and we can do our bit by choosing toys made from
          more sustainable materials.  Good quality wooden toys are a good investment as they really do stand the
          test of time compared to flimsy plastic toys and they look great too.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-r001-1234-abcdefghijkl",
          "12345678-blog-r002-1234-abcdefghijkl",
          "12345678-blog-r005-1234-abcdefghijkl",
          "12345678-blog-r004-1234-abcdefghijkl",
          "12345678-blog-r003-1234-abcdefghijkl",
          "12345678-blog-r006-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="building" text="Building and Puzzles" />
        <p>
          Our children are growing up in a world that values creativity and problem solving. Duplo is a wonderful way to
          introduce little minds to building something creative and it could be even more fun when it’s inspired by
          their favourite movie. For the budding coders out there, mastering puzzles is the first step on the path to
          developing problem solving skills.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-r007-1234-abcdefghijkl",
          "12345678-blog-r008-1234-abcdefghijkl",
          "12345678-blog-r009-1234-abcdefghijkl",
          "12345678-blog-r014-1234-abcdefghijkl",
          "12345678-blog-r013-1234-abcdefghijkl",
          "12345678-blog-r015-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="trains" text="Train Sets" />
        <p>
          They might take over your entire floor space, but boys and girls love building long and weaving train tracks.
          Why not get their imagination really going with a trip to see the real train at the station.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-r010-1234-abcdefghijkl",
          "12345678-blog-r011-1234-abcdefghijkl",
          "12345678-blog-r012-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="creative" text="Creative Play" />
        <p>
          Children love to touch, feel and draw, so let them get really creative by making their own masterpiece. You
          might be worried about it making a bit of a mess, but we’ve chosen some products designed to help you keep
          that mess in check!
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-r021-1234-abcdefghijkl",
          "12345678-blog-r017-1234-abcdefghijkl",
          "12345678-blog-r018-1234-abcdefghijkl",
          "12345678-blog-r019-1234-abcdefghijkl",
          "12345678-blog-r020-1234-abcdefghijkl",
          "12345678-blog-r016-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="roleplay" text="Roleplay Toys" />
        <p>
          Role play is a really important part of a child’s development and it’s the cutest thing watching them pretend
          to be you. You might also save having all your kitchen cupboards emptied if they have their own pots, pans and
          gloves.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-r022-1234-abcdefghijkl",
          "12345678-blog-r023-1234-abcdefghijkl",
          "12345678-blog-r024-1234-abcdefghijkl",
          "12345678-blog-r025-1234-abcdefghijkl",
          "12345678-blog-r026-1234-abcdefghijkl",
          "12345678-blog-r027-1234-abcdefghijkl"
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
      setTitle={props.setTabTitle}
    />
  );
}
