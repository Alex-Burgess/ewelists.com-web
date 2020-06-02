import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// custom components
// import { scrollToId } from "custom/Scroll/ScrollToId";
import { getUsersLists } from "custom/Article/GetUsersLists";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";
import SectionHeading from "custom/Article/SectionHeading.js";
import SectionHeadings from "custom/Article/SectionHeadings.js";

// Blog Data
const name = 'nursery-list';
const productData = require('./Products/NurseryList.json');

export default function Nursery(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <p>
        Have you been gushing over the possibilities for the cute little nursery or area you want to create for your
        baby. The nesting phase is such a special time in the lead up to the arrival of your baby and choosing how to
        decorate your nursery can bring immense joy.
      </p>
      <SectionHeadings
        headings={[
          {"name": "cribs", "text": "Moses Baskets and Cribs"},
          {"name": "cots", "text": "Cots and Cot Beds"},
          {"name": "sets", "text": "Furniture Sets"},
          {"name": "additional", "text": "Additional Furniture"},
          {"name": "soft", "text": "Soft Furnishings"},
          {"name": "accessories", "text": "Accessories"}
        ]}
      />
    <SectionHeading name="cribs" text="Moses Baskets and Cribs" />
      <p>
        For the first several months, your baby will most likely be in your bedroom at night time. A crib or a Moses
        basket is the ideal option as they are smaller than a cot and therefore take up less space. They are also more
        enclosed, which will hopefully help your little one with the transition into sleeping outside the womb. Even
        though this first item may not start in the nursery room, it will most likely get moved into it after a few
        months, so you will want to factor that in when deciding what furniture to buy.
      </p>
      <p>
        A Moses basket with a rocking stand is the more traditional looking option. With the addition of a folding
        stand, the basket can be conveniently positioned in any room so they can sleep close to you during the day.
        Moses baskets usually come with a mattress, but you will need to get a fitted sheet. It is worth noting that
        Moses basket and pram sheets are very similar, so it's worth extending your search to both when looking for the
        right size. Below are a few Moses basket options depending on whether you would like to stick with a traditional
        white look, or opt instead for a more contemporary take on this classic.
      </p>
      <Products
        products={[
          "12345678-prod-n026-1234-abcdefghijkl",
          "12345678-prod-n027-1234-abcdefghijkl",
          "12345678-prod-n001-1234-abcdefghijkl",
          "12345678-prod-n025-1234-abcdefghijkl",
          "12345678-prod-n002-1234-abcdefghijkl",
          "12345678-prod-n003-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <p>
        Cribs are usually a bit bigger and on average last to approximately six months, which in comparison to a Moses
        basket will more likely only last three. The main benefit of a crib is that it allows much more efficient and
        safer side sleeping, meaning your little one can be right next to you for easy night time feeding. Despite their
        increased size, a crib is still portable and suitable to move to the foot of your bed, or even used as a
        stand-alone cot in their room when you are ready.
      </p>
      <Products
        products={[
          "12345678-prod-n004-1234-abcdefghijkl",
          "12345678-prod-n028-1234-abcdefghijkl",
          "12345678-prod-n029-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
    <SectionHeading name="cots" text="Cots and Cot Beds" />
      <p>
        When you and your baby are ready, you can make the transfer to a cot or cot bed. A cot bed (L 140 cm x W 70 cm)
        is slightly bigger than a cot (L 120 cm x W 60 cm) and can be converted into a small child's bed, providing much
        more longevity. However, if you are short on space, a cot is a good option and can still be used until they are
        around two years. Unlike Moses baskets and cribs, cots do not come with a mattress, so you'll need to purchase
        the appropriate cot or cot bed mattress at the same. It's also a good idea to have a mattress protector because
        of the inevitable dribbles and runny noses.
      </p>
      <Products
        products={[
          "12345678-prod-n006-1234-abcdefghijkl",
          "12345678-prod-n007-1234-abcdefghijkl",
          "12345678-prod-n008-1234-abcdefghijkl",
          "12345678-prod-n009-1234-abcdefghijkl",
          "12345678-prod-n010-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
    <SectionHeading name="sets" text="Furniture Sets" />
      <p>
        At this point, it's worth considering what other big furniture items you plan to include your nursery, as it
        will work out much more cost-effective to buy a two or three-piece set if you want some drawers and a wardrobe.
        Some drawers or a changing table with some storage will help save your back at changing time and will give you
        somewhere to organise all the things you need for changing time. If you have space, you may want to buy a
        wardrobe which can provide you with some hanging space as well as shelves to store blankets and toys. See
        <Link to="/list-ideas/newborn-baby-essentials-list"> The Essentials Baby List </Link> for getting started with
        clothing and other items in your nursery.
      </p>
      <Products
        products={[
          "12345678-prod-n018-1234-abcdefghijkl",
          "12345678-prod-n030-1234-abcdefghijkl",
          "12345678-prod-n031-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <SectionHeading name="additional" text="Additional Furniture" />
      <p>
        Having a chair that is comfortable to sit and feed your baby is vital as you will spend a lot of time cradling
        and feeding, including late at night. Although it's not essential to buy a specially designed nursing chair,
        such as the
        <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/hilston-nursing-chair-duck-egg/p/chnsoa100"> Hilston Nursing Chair</a>,
        the benefits of having one is that they are designed with feeding and cradling in mind. For added comfort, you
        can even get a
        <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/hilston-nursery-footstool-sand/p/slnsoa100"> footstool </a>
        to go with it. Or, for a more contemporary look, this rocking chair from
        <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/gaia-baby-serena-nursing-rocking-chair-dove-grey/p4870519"> Gaia Baby </a>
        is super stylish.
      </p>
      <Products
        products={[
          "12345678-prod-n019-1234-abcdefghijkl",
          "12345678-prod-n020-1234-abcdefghijkl",
          "12345678-prod-n032-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <p>
        It's also worth thinking ahead and thinking about storage for teddies, toys and books, all of which you'll soon
        have plenty.  Some shelves or a bookcase will provide a flexible space for teddies and books, as well as other
        items such as keepsakes.  Add to this some stacking toy boxes, or rope baskets, and that should help keep things
        tidy.
      </p>
      <Products
        products={[
          "12345678-prod-n033-1234-abcdefghijkl",
          "12345678-prod-n034-1234-abcdefghijkl",
          "12345678-prod-n035-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <SectionHeading name="soft" text="Soft Furnishings" />
      <p>
        Every cot needs a mobile as the finishing touch, which provides something for your baby to look at and explore
        when they wake up. Chose a design that goes with the theme of the nursery. Another simple idea to add some
        character to your room is to decorate it with some removable wall stickers.
      </p>
      <Products
        products={[
          "12345678-prod-n011-1234-abcdefghijkl",
          "12345678-prod-n014-1234-abcdefghijkl",
          "12345678-prod-n015-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <SectionHeading name="accessories" text="Accessories" />
      <p>
        For those night-time feeds and nappy changes, it's good to keep the lights soft and low, so your little one
        stays relaxed and understands it's still sleep time. This
        <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/VAVA-Charging-Rechargeable-Bedside-Breastfeeding/dp/B07JNHJFVP/"> night light </a>
        turns on with just a tap and has enough settings to give you a brighter light for changing or reading and a
        comfortable low light environment for feeding. It is also portable, baby safe and has a charging dock for easy
        charging.
      </p>
      <p>
        A room thermometer will allow you to see the temperature of your room and adjust the sleeping blankets or bags
        accordingly. Some baby monitors come with a built-in thermometer, something to keep in mind when deciding if you
        need a separate room thermometer.
      </p>
      <p>
        There are many baby monitors on the market. The simplest type allows you to listen to your baby and arguably,
        that is all you need. However, it can be comforting to look at your baby when you hear a noise, or you just want
        to check on them, and for that, you can have a baby monitor with a camera. One with wifi connectivity can be
        helpful, particularly if you have thick signal blocking walls.
      </p>
      <p>
        For those times when all the shushing in the world doesn't seem to get your baby off to sleep, a sleep aid
        playing some more familiar and comforting noises can be the thing that settles them down.  Just amazing!
      </p>
      <Products
        products={[
          "12345678-prod-n021-1234-abcdefghijkl",
          "12345678-prod-n022-1234-abcdefghijkl",
          "12345678-prod-n023-1234-abcdefghijkl",
          "12345678-prod-n024-1234-abcdefghijkl",
          "12345678-prod-n036-1234-abcdefghijkl",
          "12345678-prod-n037-1234-abcdefghijkl",
          "12345678-prod-n038-1234-abcdefghijkl"
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
