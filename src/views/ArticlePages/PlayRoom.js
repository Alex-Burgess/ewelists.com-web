import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "./Sections//GetUsersLists";
import SectionHeading from "./Sections//SectionHeading.js";
import SectionHeadings from "./Sections//SectionHeadings.js";
import ListArticle from "./Sections//ListArticle.js";
import Products from "./Sections//Products.js";

// Blog Data
const name = 'play-room'

export default function OutdoorPlay(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          Keep toys tidy and organised by creating your own dedicated play space or play room. With some careful choices
          you can have your play area looking great and fitting in with the rest of your home decor. Here are some of
          our favourite pieces to get you started.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "mats", "text": "Play Mats"},
          {"name": "table", "text": "Play Tables"},
          {"name": "storage", "text": "Toy Storage"},
          {"name": "extras", "text": "Other Ideas"}
        ]}
      />
      <div>
        <SectionHeading name="mats" text="Play Mats" />
        <p>
          A beautiful play mat is the perfect way to divide off an area and give your little one somewhere safe to play.
          We love the Totter and Tumble play mats for their stylish and functional designs.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-i001-1234-abcdefghijkl",
          "12345678-blog-i002-1234-abcdefghijkl",
          "12345678-blog-i003-1234-abcdefghijkl"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="tables" text="Play Tables" />
        <p>
          Give your little ones and their friends somewhere to sit, play, colour, and eat. They will love having their
          own furniture that’s the right size for them it means you will have a dedicated space for messy play. We love
          the Great Little Trading Co. activity table, because not only does it have a space to store your paper drawing
          roll, it grows along with your child giving them years of enjoyment.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-i004-1234-abcdefghijkl",
          "12345678-blog-i005-1234-abcdefghijkl",
          "12345678-blog-i006-1234-abcdefghijkl",
          "12345678-blog-i007-1234-abcdefghijkl",
          "12345678-blog-i008-1234-abcdefghijkl",
          "12345678-blog-i009-1234-abcdefghijkl"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="storage" text="Toy Storage" />
        <p>
          There have never been so many choices for storage, from boxes to baskets, canvas bags and fun designs. Toys
          can be tidied away at the end of the day and your room transformed back to a calm and organised space.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-i010-1234-abcdefghijkl",
          "12345678-blog-i011-1234-abcdefghijkl",
          "12345678-blog-i012-1234-abcdefghijkl"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="extras" text="Other Ideas" />
        <p>
          If you have the space why not invest in some furniture to help keep things really tidy. We love the Great
          Little Trading Co. cube storage furniture because you can style it with your choice of basket or box. You
          could also create your own little reading corner which is a lovely space for ‘quiet time’.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-i013-1234-abcdefghijkl",
          "12345678-blog-i014-1234-abcdefghijkl",
          "12345678-blog-i015-1234-abcdefghijkl"
        ]}
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
      mobile={props.mobile}
      tablet={props.tablet}
    />
  );
}
