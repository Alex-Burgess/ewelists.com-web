import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "custom/Article/GetUsersLists";
import SectionHeading from "custom/Article/SectionHeading.js";
import SectionHeadings from "custom/Article/SectionHeadings.js";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";
import ChecklistCard from "custom/Article/ChecklistCard.js";

// Blog Data
const title = 'The Essentials Baby List';
const subtitle = 'What are the basic items that you need for your new arrival?';
const backgroundImg = 'https://test.ewelists.com/images/baby-essentials.jpg';
const productData = require('./Products/BabyEssentials.json');
const similarArticles = [
  {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'https://test.ewelists.com/images/travel-gear.jpg',
  description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
  {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'https://test.ewelists.com/images/hospital-bag.jpg',
  description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
  {category: "NURSERY", title: "The Nursery List", url: "/listideas/nursery", img: 'https://test.ewelists.com/images/nursery-list.jpg',
  description_short: "What to buy for your baby’s bedroom."}
];

export default function BathTime(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          There is so much ‘stuff’ out there for babies and deciding which of it you really need can seem like a huge
          task. The good news is that babies really don’t need that much for the first few months of their life meaning
          you can keep things nice and simple with just the essentials. You can always buy things as and when your
          baby’s personality develops and starts to dictate their needs.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "clothing", "text": "The essential clothing list"},
          {"name": "nursery", "text": "The essential nursery list"},
          {"name": "feeding", "text": "The essential feeding list"},
          {"name": "outandabout", "text": "The essential out and about list"}
        ]}
      />
      <div>
        <SectionHeading name="clothing" text="The essential clothing list" />
        <p>
          An all in one sleep suit is the perfect piece of clothing for your new baby. They are really simple to take on
          and off and they work well for sleep time and awake time. If you opt for one with built in booties and fold
          over mittens you won’t need to buy those items separately. Its surprising how quickly babies grow so don’t go
          overboard on the newborn sizes and instead go for a mix of sizes in newborn and 0-3 months. A zip up suit is
          very simple to use, especially for a sleep deprived parent, but they do tend to be a bit more expensive. The
          traditional suits with poppers, although a bit fiddlier, still work well and are usually better priced.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e001-1234-abcdefghijkl",
          "12345678-blog-e002-1234-abcdefghijkl",
          "12345678-blog-e003-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          Depending on the time of year you will also need to have some vests to wear under the all in one suit. They
          come in a variety of sleeve styles and have poppers to fasten between the legs. The long sleeve vests work
          well under outfits or in particularly cold climates. However for the essentials list, the short sleeve or no
          sleeve designs are perfect as they are easy to layer under the all in one suit.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e004-1234-abcdefghijkl",
          "12345678-blog-e005-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          A hat and a cardigan can be used as extra layers in the cooler months. A good guide for how many layers to
          dress your baby in is to take the number of layers you are wearing and then add one extra layer to that
          number.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e006-1234-abcdefghijkl",
          "12345678-blog-e007-1234-abcdefghijkl",
          "12345678-blog-e008-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard items={
          ['7-10 all in one suits', 'Cardigan', '7-10 short sleeve or sleeveless vests', 'Hat']
      }/>
      <div>
        <SectionHeading name="nursery" text="The essential nursery list" />
        <p>
          The <a target="_blank" rel="noopener noreferrer" href="https://www.nhs.uk/conditions/pregnancy-and-baby/reducing-risk-cot-death/"> NHS </a>
          and <a target="_blank" rel="noopener noreferrer" href="https://www.lullabytrust.org.uk/safer-sleep-advice/room-sharing/"> Lullaby Trust </a>
          recommend that your baby sleeps in the same room as you for the first 6 months. For most of us that means you
          need to find a compact solution such as a moses basket or crib. A moses basket is usually a cheaper option and
          will see you through to about 6 months of age. A crib can give you a few added features such as a fold down
          side that allows your baby to sleep next to you.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e009-1234-abcdefghijkl",
          "12345678-blog-e010-1234-abcdefghijkl",
          "12345678-blog-e018-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          You will also need some bedding for your crib or moses basket and a mattress if it doesn’t come with one.
          Fitted sheets work well as they can double up as a sheet for the pram, if required, and they hold nicely in
          place. Another multi use item is a cellular blanket, they can be used to swaddle your baby, and keep them warm
          in the pram or the car seat.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e011-1234-abcdefghijkl",
          "12345678-blog-e012-1234-abcdefghijkl",
          "12345678-blog-e019-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          When it comes to changing your baby, which you will be doing a lot, you will be grateful to have somewhere to
          change your baby that doesn’t involve bending over too much. Placing a changing mat on a chest of drawers or
          table will be good enough if you don’t want to buy a changing unit.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e013-1234-abcdefghijkl",
          "12345678-blog-e014-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          Setting up a changing station with nappies, wipes, cotton wool, clothes, muslins and a nappy bin means you
          will have everything you need at hand and make life a lot easier. Buying a large packet of size 1 nappies will
          get you started, and once you know what size your baby is and how fast they are growing, you can buy more in
          the size that works.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e015-1234-abcdefghijkl",
          "12345678-blog-e016-1234-abcdefghijkl",
          "12345678-blog-e017-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard items={
          ['Moses Basket or Crib', 'Rocking Stand for Moses Basket', 'Sheets for Moses Basket', 'Blankets for Swaddling', 'Swaddle Sleeping Bag', 'Changing Dresser', 'Changing Mat', 'Nappies', 'Wipes', 'Cotton Pads' ]
      }/>
      <div>
        <SectionHeading name="feeding" text="The essential feeding list" />
        <p>
          Muslins have a variety of uses and are especially handy at feeding time to mop up any spills. Make sure you
          stock up as they will become your new best friend.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e020-1234-abcdefghijkl",
          "12345678-blog-e021-1234-abcdefghijkl",
          "12345678-blog-e022-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          Some mums decide to solely breast feed their baby while others opt to share the feeding with their partner. If
          you want to express your breast milk then you will need a pump to do this. A handheld pump is great for
          occasional use and is easily portable as you don’t need to worry about the charger.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e023-1234-abcdefghijkl",
          "12345678-blog-e024-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          You will also need some bottles with a size 1 teat and a way to sterilise the bottles. A microwave steriliser
          is a cheaper option and does a great job, just make sure to check that your microwave is the right size for
          the steriliser. If you have the space you might like to opt for a plug in countertop steriliser.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e025-1234-abcdefghijkl",
          "12345678-blog-e026-1234-abcdefghijkl",
          "12345678-blog-e027-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard items={
          ['Muslins', 'Breast Pump', 'Bottles', 'Steriliser']
      }/>
      <div>
        <SectionHeading name="outandabout" text="The essential out and about list" />
        <p>
          When it comes to choosing a pram you should consider your lifestyle. Are you a city liver that will be using
          public transport and navigating busy pavements, in which case a light and compact pram is for you. Or are you
          out in the country tackling mud and uneven surfaces, in which case big sturdy wheels will help keep you in
          control.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e028-1234-abcdefghijkl",
          "12345678-blog-e029-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <p>
          If you are in and out of the car a lot, a travel system that allows you to transfer the car seat to the pram
          base might make life a lot easier. You can buy adapters which will allow you to combine most brands of car
          seat and pram, however do check before you buy that they are compatible.
        </p>
      </div>
      <Products
        products={[
          "12345678-blog-e030-1234-abcdefghijkl",
          "12345678-blog-e031-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <ChecklistCard items={
          ['Buggy', 'Car seat', 'Car seat buggy adapters']
      }/>
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
