import React, { useState, useEffect } from 'react';
// custom components
// import { scrollToId } from "custom/Scroll/ScrollToId";
import { getUsersLists } from "custom/Article/GetUsersLists";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";

// Blog Data
const title = 'The Nursery List';
const subtitle = 'What to buy for your baby’s bedroom.';
const backgroundImg = 'nurserylist.jpg';
const productData = require('./Products/NurseryList.json');
const similarArticles = [
  {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travelgear.jpg',
  description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
  {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospitalbag.jpg',
  description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
  {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bathtime.jpg',
  description_short: "Everything you need when bathing your baby."}
];

export default function Nursery(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <p>
        Have you been gushing over the possibilities for the cute little nursery or area you want to create for your baby. The nesting phase is such a special time in the lead up to the arrival of your baby and choosing how to decorate your nursery can bring immense joy.
      </p>
      <p>
        For the first several months your baby will most likely be in your bedroom at night time. A crib or a Moses basket is the ideal option as they are smaller than a cot therefore take up less space. They are also more enclosed which will hopefully help your little one with the transition into sleeping outside the womb.
      </p>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/wicker-moses-basket-welcome-to-the-world/p/770035001"> Moses basket </a> is a more traditional looking option and usually comes with a separate stand. They tend to generally be cheaper but its possible your baby will grow out of it quicker than a crib. The basket can be carried to other rooms if you want to easily transport baby and keep them close to you during the day. A <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/pram-fitted-sheet-2-pack-white/p/776502702"> fitted pram sheet </a> is the right size for this particular moses basket, but if you chose another it worth checking if a <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/moses-fitted-sheets-pack-of-2-white/p/775502703" > moses fitted sheet </a> is the right size.
      </p>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href=" https://www.mamasandpapas.com/en-gb/snuzpod-3-bedside-crib-white/p/264402700"> sleep next to me crib </a> gives you the added benefit of folding down the sides and attaching to your bed meaning your little one can be right next to you for easy night time feeding. The design means they will stay safe as you wont be able to roll on to them. A couple of <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/crib-fitted-sheets-pack-of-2-white/p/777502702"> crib fitted sheets </a> should be enough to get you started.
      </p>
      <p>
        When you and your baby are ready you can make the transfer to a cot or cot bed. A <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/dover-adjustable-cot-to-toddler-bed-white/p/cbdo02700"> cot bed </a> is slightly bigger than a cot and has the ability to be converted into a small child’s bed. A <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/dover-adjustable-height-cot-white/p/ctdo02701"> cot </a> is a good option if you are short on space and it can still be used until they are around 2 years. If you choose one with inbuilt rail guards tit will help stop the teeth marks that are left by some babies when baby realise they can stand and chew. Remember to take note whether you need to buy cot bed size <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/premium-pocket-spring-cotbed-mattress/p/prpsmcb01"> mattress </a> and sheets or cot size <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/pocket-sprung-premium-cot-mattress/p/prpsmmc00"> mattress </a> and sheets. It’s also a good idea to have a <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/anti-allergy-mattress-protector-cotbed/p/mc0002703"> mattress protector </a> because of the inevitable dribbles and runny noses.
      </p>
      <p>
        Using a sleeping bag gives great peace of mind that your baby will be at the right temperature and that they aren’t at risk of the covers going over their head when they wriggle about. If you wanted the option to swaddle your baby the <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Company-Grosnug-Swaddle-Newborn-Grobag/dp/B0114SQOR4"> Newborn Gro Bag </a> gives you this option, alternatively you can go straight to a sleeping bag that is suitable for 0-6 months.  When choosing a <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/millie-boris-0-6-month-dreampod-neutral/p/734045300"> sleeping bag </a>, a good guidance is to opt for a light or 1.5 tog for a summer baby and for a winter baby go for a cosy or 2.5 tog. You could also try these beautiful bedding sets that give you the option of using a blanket or a sleeping bag. Write and link baby sleeping article?
      </p>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/john-lewis-partners-safari-mobile/p3439165"> mobile </a> is the finishing touch to your cot and provides something for your baby to look at and explore when they wake up. Chose a design that goes with the theme of the nursery. Another simple idea to add some character to your room is decorate it with some removable wall <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Nursery-Stickers-Sticker-PD267-Direction/dp/B075J3RW4S/"> stickers </a>.
      </p>
      <p>
        A set of drawers or a <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/dover-3-drawer-dresser-changer-unit-white/p/dcdo02700"> changing table </a> with some storage will help save your back at changing time and will give you somewhere to organise all the things you need for changing time.
      </p>
      <p>
        If you have the space you may want to buy a <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/dover-2-door-nursery-wardrobe-white/p/wrdo02700"> wardrobe </a> which can give you some hanging space as well as shelves to store blankets and toys. Keep an eye out for <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/dover-3-piece-cot-bed-range-with-dresser-and-wardrobe-grey/p/rado46800"> bundle sets of furniture </a> as an economical way to purchase those more expensive goods.
      </p>
      <p>
        Having a chair that is comfortable to sit and feed your baby is really important as you will spend a lot of time cradling and feeding, especially late at night. Although it’s not essential to buy a specially designed <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/hilston-nursing-chair-duck-egg/p/chnsoa100"> nursing chair </a>, the benefits of having one is that they are designed with feeding and cradling in mind. For the ultimate comfort you can even get a <a target="_blank" rel="noopener noreferrer" href="https://www.mamasandpapas.com/en-gb/hilston-nursery-footstool-sand/p/slnsoa100"> footstool </a> to go with it.
      </p>
      <p>
        A sleep pod is a cosy and safe place for your baby to sleep, rest or play. Its easy to transport around the house and I can even be used as a changing mat.
      </p>
      <p>
        For those night time feeds and nappy changes its good to keep the lights soft and low so your little one stays relaxed and understands its still sleep time. This <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/VAVA-Charging-Rechargeable-Bedside-Breastfeeding/dp/B07JNHJFVP/"> night light </a> has enough settings to give you a brighter light for changing or reading and a nice low setting for feeding. It is also portable, baby safe and has a charging dock for easy charging.
      </p>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Company-Groegg-Colour-Changing-Thermometer/dp/B002B55BN8"> room thermometer </a> will allow you to see the temperature of your room and adjust the sleeping blankets or bags accordingly. Some baby monitors come with a built in thermometer, something to keep in mind when deciding if you need a separate room thermometer.
      </p>
      <p>
        There are many baby monitors on the market. The simplest type allows you to <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/Digital-Audio-Baby-Monitor-400/dp/B01MR3CP9L/"> listen </a> to your baby and arguably that is all you need. However, it can be comforting to look at your baby when you hear a noise or you just want to check on them and for that you can have a <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.co.uk/HELLO-BABY-Wireless-Temperature-Monitoring/dp/B071FJPY7G"> baby monitor with a camera </a>.
      </p>
      <Products
        products={[
          "12345678-prod-n001-1234-abcdefghijkl",
          "12345678-prod-n002-1234-abcdefghijkl",
          "12345678-prod-n003-1234-abcdefghijkl",
          "12345678-prod-n004-1234-abcdefghijkl",
          "12345678-prod-n005-1234-abcdefghijkl",
          "12345678-prod-n006-1234-abcdefghijkl",
          "12345678-prod-n007-1234-abcdefghijkl",
          "12345678-prod-n008-1234-abcdefghijkl",
          "12345678-prod-n009-1234-abcdefghijkl",
          "12345678-prod-n010-1234-abcdefghijkl",
          "12345678-prod-n011-1234-abcdefghijkl",
          "12345678-prod-n012-1234-abcdefghijkl",
          "12345678-prod-n013-1234-abcdefghijkl",
          "12345678-prod-n014-1234-abcdefghijkl",
          "12345678-prod-n015-1234-abcdefghijkl",
          "12345678-prod-n016-1234-abcdefghijkl",
          "12345678-prod-n017-1234-abcdefghijkl",
          "12345678-prod-n018-1234-abcdefghijkl",
          "12345678-prod-n019-1234-abcdefghijkl",
          "12345678-prod-n020-1234-abcdefghijkl",
          "12345678-prod-n021-1234-abcdefghijkl",
          "12345678-prod-n022-1234-abcdefghijkl",
          "12345678-prod-n023-1234-abcdefghijkl",
          "12345678-prod-n024-1234-abcdefghijkl",
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
