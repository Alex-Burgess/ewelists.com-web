import React, { useState, useEffect } from 'react';
// custom components
import { getUsersLists } from "custom/Article/GetUsersLists";
import SectionHeading from "custom/Article/SectionHeading.js";
import SectionHeadings from "custom/Article/SectionHeadings.js";
import ListArticle from "custom/Article/ListArticle.js";
import Products from "custom/Article/Products.js";
import Quote from "components/Typography/Quote.js";

// Blog Data
const title = 'Baby Travel Gear';
const subtitle = 'Our favourite gear to take the fuss out of travelling with little ones!';
const backgroundImg = 'baby-travel-gear.jpg';
const productData = require('./Products/BabyTravelGear.json');
const similarArticles = [
  {category: "MATERNITY", title: "Hospital Bag", url: "/list-ideas/hospital-bag-checklist", img: 'hospital-bag.jpg',
  description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
  {category: "BABY", title: "Bath Time", url: "/list-ideas/baby-bath-time", img: 'bath-time.jpg',
  description_short: "Everything you need when bathing your baby."},
  {category: "NURSERY", title: "The Nursery List", url: "/list-ideas/nursery-list", img: 'nursery-list.jpg',
  description_short: "What to buy for your baby’s bedroom."}
];

export default function TravelGear(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <p>
        Getting away on holiday is great for both little ones and parents. A new environment provides stimulation for
        children which can be exciting and allows you to relax and recharge. However, the concern of being out of your
        comfort zone at home, where you have everything you need can put new parents off travelling. There's a lot to
        consider, remembering to pack everything, fitting everything in the car, or getting through the airport. These
        days, there's a lot to help ensure travelling is a smooth and enjoyable time, so whether it's your first long
        weekend away after having your baby, or a multi-week holiday, we have the perfect items to take the stress away
        from travelling.
      </p>
      <SectionHeadings
        headings={[
          {"name": "sleeping", "text": "Sleeping"},
          {"name": "gettingaround", "text": "Getting Around"},
          {"name": "meals", "text": "Meal Times"},
          {"name": "air", "text": "Air Travel Tips"},
          {"name": "car", "text": "Car Travel Tips"}
        ]}
      />
    <SectionHeading name="sleeping" text="Sleeping" />
      <p>
        Perhaps the most obvious issue is where will your little one sleep. Some hotels and accommodation happily
        provide travel cots. Still, it's not uncommon on many travel websites to see some form disclaimer, stating that
        they can't guarantee it will be available, which rightly leaves you with an unsettling feeling.
      </p>
      <Quote
        text="“We'll add this request to your booking, but unfortunately, we can't guarantee that the cot will be available when you arrive.”"
        author="Unamed Hotel Website"
      />
      <p>
        So, with this in mind, we believe you'll want to take a travel cot with you unless you are 100% sure that there
        will be one at your destination where you arrive. If you travel regularly, it can be great to use the same
        travel cot, as coupled with their usual bedding this can give some familiarity to your little ones sleeping
        environment and may help them get off to sleep as usual.
      </p>
      <p>
        The <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/2RR0xGR"> BabyBjörn </a> travel cot has
        been around for a while, and for a good reason, it's excellent design is compact and straightforward to put up.
        If you're looking for a travel cot that has considerations for younger babies, look at the
        <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/36MdDJD"> Micralite </a> and
        <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/joie-baby-kubbie-sleep-bedside-travel-cot-foggy-grey/p4329548"> Joie</a>,
        which have adaptable heights, making it a little easier for putting your baby down.
      </p>
      <p>
        Once your child is a little older and no longer fits in a travel cot, things a little more tricky, but a travel
        bed guard can help provide some extra security for them sleeping in a single bed.
      </p>
      <Products
        products={[
          "12345678-prod-t001-1234-abcdefghijkl",
          "12345678-prod-t002-1234-abcdefghijkl",
          "12345678-prod-t010-1234-abcdefghijkl",
          "12345678-prod-t011-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <SectionHeading name="gettingaround" text="Getting around" />
      <p>
        It can be beneficial to have a buggy for getting through the airport and on days out on your holiday. Thanks to
        their compact sizes when folded, many strollers even fit in airline overhead lockers, allowing you to keep it
        with you to boarding. The
        <a target="_blank" rel="noopener noreferrer" href="https://www.johnlewis.com/babyzen-yoyo-pushchair-white-aqua/p4145291"> BABYZEN YOYO+ </a>
        is so practical it seems to get a mention in a number of our blogs and is often parents only pushchair. However,
        if you're considering a second buggy just for travelling, there are options a little cheaper and lighter, that
        tick nearly all the same boxes, which we've included below.
      </p>
      <Products
        products={[
          "12345678-prod-t003-1234-abcdefghijkl",
          "12345678-prod-t004-1234-abcdefghijkl",
          "12345678-prod-t005-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <p>
        Depending on your destination, it may be more practical to use a carrier than a buggy. For example, if you're
        spending the day site seeing somewhere that has lots of steps, or cobbles, it'll be easier to get around with a
        carrier. Whether you prefer a wrap style or shoulder strap style, they won't take up much room in your luggage.
        If you plan to spend a lot of the day walking, like an outdoor adventure, then a rucksack carrier will be more
        supportive and comfortable.
      </p>
      <Products
        products={[
          "12345678-prod-t012-1234-abcdefghijkl",
          "12345678-prod-t006-1234-abcdefghijkl",
          "12345678-prod-t007-1234-abcdefghijkl",
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <p>
        If your child has reached the point where they mostly don't need or want to be in a buggy or carrier, then ideas
        such as the
        <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/2vNroe8"> bagrider </a> or
        <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/384VB6E"> Trunki </a> are fantastic to help
        you efficiently get through the airport. And, if they don't need assistance at all, they'll no doubt love
        copying you, wheeling their bag next to you.
      </p>
      <Products
        products={[
          "12345678-prod-t015-1234-abcdefghijkl",
          "12345678-prod-t013-1234-abcdefghijkl",
          "12345678-prod-t014-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
    <SectionHeading name="meals" text="Meal Times" />
      <p>
        If you're travelling with a baby that has some form of bottle feed, you'll need to ensure you have an adequate
        number of sterilised bottles, or better still, the ability to do it on the go. If your journey is quite a long
        one, it's not feasible to carry five pre-sterilised bottles.
        <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/31rhYAZ"> Milton </a> tablets are fantastic
        for sterilising on the go, they work with cold water and only take 15 minutes! A bottle or bag steriliser will
        give you the flexibility to sterilise bottles on the go with solution, or with a microwave, if there is one at
        your destination.
      </p>
      <Products
        products={[
          "12345678-prod-t016-1234-abcdefghijkl",
          "12345678-prod-t017-1234-abcdefghijkl",
          "12345678-prod-t018-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <p>
        A lot of people who haven't flown with a baby before, don't realise that
        <a target="_blank" rel="noopener noreferrer" href="https://www.gov.uk/hand-luggage-restrictions/baby-food-and-baby-milk"> hand luggage restrictions </a>
        allow milk and food for your baby through security. Whether you're travelling by plane or not, you can help
        smooth your journey by preparing bottles, healthy snacks and meals in advance, so they're conveniently ready
        just when you need them. Carrying this in insulated bottle or lunch bags will keep foods and liquids hot or cold.
      </p>
      <Products
        products={[
          "12345678-prod-t022-1234-abcdefghijkl",
          "12345678-prod-t020-1234-abcdefghijkl",
          "12345678-prod-t021-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <p>
        When eating out with your baby or toddler, a lot of places will likely have high chairs.  However, if you have
        your own portable seating, you'll never be stuck and can be more flexible out where you choose to eat. Some
        tableware and cutlery for your child are also great to carry.
      </p>
      <Products
        products={[
          "12345678-prod-t008-1234-abcdefghijkl",
          "12345678-prod-t009-1234-abcdefghijkl",
          "12345678-prod-t019-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <SectionHeading name="air" text="Air Travel Tips" />
      <p>
        Did you know that a lot of airports have play areas? It's worth being on the lookout and checking in advance
        as it can be an enjoyable way to pass the time at the airport with your children.  Here are some details of a few
        places:
      </p>
      <ul>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.birminghamairport.co.uk/at-the-airport/sky-zone/sky-zone/"> Birmingham Airport - Sky Zone</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.eastmidlandsairport.com/help/passenger-guides/travelling-with-children/"> East Midlands Airport - Soft Play</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.edinburghairport.com/prepare/services-and-facilities/family-facilities"> Edinburgh Airport - Kids' play zones</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.gatwickairport.com/at-the-airport/passenger-services/children/"> Gatwick Airport - Kids' Zones </a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.glasgowairport.com/at-the-airport/airport-services/"> Glasgow Airport - soft play </a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.heathrow.com/at-the-airport/terminal-facilities/family-facilities"> Heathrow Airport - Mr. Adventure Stay & Play areas</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.london-luton.co.uk/inside-lla/travelling-with-children"> Luton Airport - Family Area</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://www.manchester-airport-guide.co.uk/childrens-facilities.html"> Manchester Airport - Soft Play</a></li>
      </ul>
      <p>
        It can be uncomfortable having your little one on your lap for a whole flight. If this is something you're
        concerned about, it is worth considering looking into taking your car seat onto the plane, which will provide
        somewhere for your baby to nap in, as well as a safer place for them on take-off and landing. Every airline
        seems to have its own rules on this, so remember to check with them in advance. You should also check with your
        car seat manufacturer to ensure your seat is suitable for air travel. Some manufacturers do have details on
        their websites. The
        <a target="_blank" rel="noopener noreferrer" href="https://www.maxi-cosi.co.uk/fly-maxi-cosi"> Fly with Maxi-Cosi </a>
        page has some great details including a list of its car seats that are certified, and the
        <a target="_blank" rel="noopener noreferrer" href="https://www.maxi-cosi.co.uk/fly-maxi-cosi"> Joie car seat faq </a>
        has a similar list.
      </p>
      <Products
        products={[
          "12345678-prod-t023-1234-abcdefghijkl",
          "12345678-prod-t024-1234-abcdefghijkl",
          "12345678-prod-t025-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <p>
        If you're taking a long haul flight with an infant, most major airlines have some form of carrycot. However, you
        must reserve these in advance, for example, see
        <a target="_blank" rel="noopener noreferrer" href="https://www.britishairways.com/en-gb/information/family-travel/seating"> British Airways</a>.
        Once your child is over 2, they'll be in their own seat which they might find uncomfortable for sleeping.
        Providing them with some extra legroom will help them find a more comfortable position. If you're concerned
        about the security of your child with just a lap belt, take a look at the
        <a target="_blank" rel="noopener noreferrer" href="https://amzn.to/373d66b"> CARES </a> harness. The FAA
        approves it, but it's worth double-checking with your airline.
      </p>
      <Products
        products={[
          "12345678-prod-t026-1234-abcdefghijkl",
          "12345678-prod-t027-1234-abcdefghijkl",
          "12345678-prod-t028-1234-abcdefghijkl"
        ]}
        data={productData}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
    <SectionHeading name="car" text="Car Travel Tips" />
      <p>
        If you're taking a long car trip, it's just a case of planning your journey with your little one's routines in
        mind. If you can, try to drive as much as possible while they are asleep, including later in the evening or
        really early morning. When packing, if you need to use the back seats for packing, try to use luggage that would
        allow you to swap it to the front if you need to sit in the back, or so it can be easily removed to create a
        mini changing area.
      </p>
      <p>
        If you're driving with toddlers, they're going to be awake a lot more, so bring things to keep them entertained
        such as an activity book, favourite programs on an iPad, or an audiobook if old enough. Remember to keep the
        snacks handy!
      </p>
      <Products
        products={[
          "12345678-prod-t029-1234-abcdefghijkl",
          "12345678-prod-t030-1234-abcdefghijkl",
          "12345678-prod-t031-1234-abcdefghijkl"
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
