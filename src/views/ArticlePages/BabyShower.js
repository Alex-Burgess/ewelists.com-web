import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// custom components
import { getUsersLists } from "./Sections/GetUsersLists";
import SectionHeading from "./Sections/SectionHeading.js";
import SectionHeadings from "./Sections/SectionHeadings.js";
import ListArticle from "./Sections/ListArticle.js";
import Products from "./Sections/Products.js";

// data id
const name = 'baby-shower'

export default function BabyShower(props) {
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          As well as a celebration, baby showers have traditionally been used as a way to share advice and help with the
          expense of things for the new arrival. We think they are a lovely way to help parents feel special, and it’s a
          great opportunity for your close friends and family to bond with you on your journey, and perhaps help you
          with a little gift.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "trending", "text": "What’s trending"},
          {"name": "location", "text": "When and where"},
          {"name": "theme", "text": "Picking a theme"},
          {"name": "activities", "text": "Games or activities"},
          {"name": "list", "text": "Organising a gift list"}
        ]}
      />
      <div>
        <SectionHeading name="trending" text="What’s trending" />
        <p>
          Over the years baby showers have evolved and people are doing their own take on how they like to celebrate.
          Here are some of the recent trends we’ve spotted that bring the traditional baby shower into the modern world.
        </p>
        <p>
          <b>Virtual Baby Shower</b> - We’ve all become familiar with virtual social interactions recently, and whilst it
          might not be our first choice, there are benefits in having a virtual event where people from all over the
          globe can join. Check out our guide to hosting a <Link to="/list-ideas/virtual-baby-shower">  Virtual Baby Shower </Link>.
        </p>
        <p>
          <b>Baby Sprinkle</b> - We love the term sprinkle! It’s used to describe a more low key event than the
          traditional shower. You might like to host a sprinkle for a second child, or perhaps you just want to be very
          British and have a more low key affair.
        </p>
        <p>
          <b>Both Parents</b> - Gone are the days where a baby shower is limited to just a group of females. Both men
          and women love to get together for a celebration, so if you fancy a mixed group of family and friends, then go
          right ahead.
        </p>
        <p>
          <b>The Eco Shower</b> - We’re becoming a lot more conscious about our impact on the environment. With this in
          mind, you could ask friends to bring second hand gifts, something they have made such as a knitted blanket, or
          a meal for your freezer.
        </p>
        <p>
          <b>Wet the Baby’s Head</b> - This term has traditionally been used to describe the dad getting together
          with his mates for a few drinks after the baby is born. But who says it needs to be a male only affair. Having
          a celebration after the birth means you get to show off your new little bundle of joy, how delightful is that!
        </p>
        <p>
          <b>Baby Gender Reveal</b> - This is where the parents-to-be share the gender of their new baby in a special
          way. We’ve seen some awesome pictures of couples cutting a cake to reveal a pink or blue middle, or popping a
          balloon which throws out pink or blue confetti.
        </p>
      </div>
      <Products
        products={[
          "a0cfc058-f5b3-4540-bd94-e4c41c773d78",
          "a8634ac8-27fb-4e47-97bb-a27321077841",
          "62693651-06e9-4905-af9b-bdc16d7a788c"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="location" text="When and where" />
        <p>
          If you’re celebrating before the baby arrives, the best time to host the event is 2-3 months before the baby is
          due. That way mum will have a lovely bump to show off, but it’s not so close to the due date that you might have
          a surprise visitor! It’s a really nice idea for a close friend to organise and host the baby shower. This takes
          the pressure off mum-to-be and allows her to just show up and enjoy herself.
        </p>
        <p>
          For the host there are a few things to think about. Here are some ideas to help you get your plan underway: 
        </p>
        <ul>
          <li>Organise a date that works for the most important people</li>
          <li>Send out the invitations 3-4 weeks in advance.</li>
          <li>Pick a theme and choose your decorations</li>
          <li>Organise food and drinks - get this right and everyone is happy</li>
          <li>Games or activities to keep things light-hearted</li>
          <li>Goody bag for guests</li>
        </ul>
      </div>
      <div>
        <SectionHeading name="theme" text="Picking a theme" />
        <p>
          Choose a theme that works for your guests and the activities you have planned. Decorations and balloons can
          help pull everything together to give you insta ready shots, or would look awesome as a virtual backdrop. You
          might also find that you have bits and pieces around the house that fit with the theme and can be used to top
          up your decorations, such as a fancy tea pot or some faux flowers.
        </p>
        <p>
          Ginger Ray have a delightful range of products and themes to help decorate your baby shower. We love the
          <a target="_blank" rel="noopener noreferrer" href="https://tidd.ly/2R898DQ"> Hello World Mint and Rose Gold </a>
          collection, the
          <a target="_blank" rel="noopener noreferrer" href="https://tidd.ly/35ifB7s"> Gender Reveal </a> collection, and the
          <a target="_blank" rel="noopener noreferrer" href="https://tidd.ly/3hhYHIu"> Botanical </a> collection.
        </p>
      </div>
      <Products
        products={[
          "8ad87cd0-d782-49b7-8c5e-c5df09cb2559",
          "b6050c06-6e54-4387-9316-415c8d6bc0db",
          "61a90907-7eb4-472f-81dc-b160309335ab"
        ]}
        lists={lists}
        isAuthenticated={props.isAuthenticated}
      />
      <div>
        <SectionHeading name="activities" text="Games and activities" />
        <p>
          Okay we know this one isn’t for everyone, but hear us out. Having some activities for guests is a good way to
          make the celebration lighthearted and gives guests something to mingle over. It’s also an excellent way to
          keep a virtual baby shower interesting for your guests. If you don’t want to make a big event of the games,
          you could always have some activity stations dotted around where guests can go and take part at their leisure.
          Here are some of our favourite ideas.
        </p>
        <ul>
          <li><b>Guess the baby</b> - each guests brings a picture of them as a baby and everyone has to guess who it is.</li>
          <li><b>Guess the date and weight</b> - ask each guest to guess the arrival date, birth weight and gender (if you haven’t revealed). The closest guess wins a bottle of bubbles.</li>
          <li><b>Decorate the baby vest</b> - lay out some plain white baby vests along with toxic free fabric pens. Each guest can decorate a baby vest which can be used by the baby.</li>
          <li><b>Match the celeb baby name</b> - get a list of unusual children’s names and everyone needs to guess the celebrity parent.</li>
          <li><b>Birthday messages</b> - this works well with close friends and family. Write an individual number from 1-18 on a piece of card. Hand each guest a number and ask them to write a message to your little one, to be given to them on the birthday that matches the number.</li>
        </ul>
      </div>
      <div>
        <SectionHeading name="list" text="Organising a gift list" />
        <p>
          Well of course we are big believers in this, but we know some people are uncomfortable sharing a gift list
          because they fear it can look greedy,  or that you are only having a celebration in return for gifts. We have
          some advice; you will probably be surprised at how many of your close friends and family will want to buy you
          a gift, this is such a special time for you and for them. Helping them know what things you really need is a
          good way to reduce duplicated gifts or having to return items.
        </p>
        <p>
          It’s up to you if you want to include the details of the gift list in the invite, perhaps you might like to
          include it on a different piece of paper along with a polite message, so people can choose if they want to use
          it or not. Alternatively, you can share your gift list link with your mum and baby shower host, as it’s likely
          people will ask them what you might need. They can then share the link on your behalf.
        </p>
        <p>
          Why not get started today by creating a gift list with ewelists. You can add items from any store, easily
          share it with family and friends, and best of all its completely free!
        </p>
        <p>
          We’d love to see some of your fabulous pictures so don’t forget to tag us at <b>#ewelists</b> and follow us on
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ewelists"> Instagram </a> for lots of gift list inspiration.
        </p>
      </div>
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
