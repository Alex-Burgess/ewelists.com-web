import React from 'react';
import { Link } from "react-router-dom";
// custom components
import SectionHeading from "./Sections/SectionHeading.js";
import SectionHeadings from "./Sections/SectionHeadings.js";
import ListArticle from "./Sections/ListArticle.js";

// data id
const name = 'virtual-baby-shower'

export default function VirtualBabyShower(props) {
  const content = (
    <div>
      <div>
        <p>
          Whilst we might be longing for the day when we can meet and celebrate in person, a virtual gathering still
          allows us to share time with our loved ones and celebrate special occasions. In fact, virtual baby showers
          have many benefits, they allow you to gather friends and family from all over the world, they are cheaper to
          host, and they are more convenient for your guests to attend.
        </p>
        <p>
          For many of us, interacting socially online has become part of our everyday. We all know how to organise a
          work call or a social chit chat, but how to you make a virtual baby shower special and go off with a bang?
          Here are our top tips to help you organise a memorable event.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "time", "text": "Choose a time and destination"},
          {"name": "plan", "text": "Plan the event"},
          {"name": "invites", "text": "Send out the invitations"},
          {"name": "decorations", "text": "Decorations"},
          {"name": "activities", "text": "Prepare the games or activities"},
          {"name": "list", "text": "Organising a gift list"}
        ]}
      />
      <div>
        <SectionHeading name="time" text="Choose a time and destination" />
        <p>
          Pick a time that works for people located in different time zones. Day time events usually work well, and you
          might like to do a brunch, or afternoon tea, where people can join in with some food and drinks.
        </p>
        <p>
          Choose which virtual platform you are going to use and make sure you test it out before hand to make sure
          everything works. Here are some of the common platforms that are used.
        </p>
        <ul>
          <li>House party: 8 guests maximum</li>
          <li>Facetime: 32 guests maximum, all guests need an Apple device</li>
          <li>Skype: 50 guests maximum</li>
          <li>Zoom: 100 guests maximum on free plan for 40 minutes</li>
        </ul>
      </div>
      <div>
        <SectionHeading name="plan" text="Plan the event" />
        <p>
          Set a time limit on the event and allocate how much time time you will spend on various activities. You might
          feel like this is something you don't need to do, but it will help keep things moving along so there are no
          awkward moments. The last thing you want is for mum-to-be to feel uncomfortable because all eyes are on her
          for the entertainment.
        </p>
        <p>
          Here’s an example of how you might plan a 60 minute virtual baby shower:
        </p>
        <ul>
          <li>10 mins for everyone to join and have a chit chat, admire backgrounds, outfits etc</li>
          <li>20 mins to play games and enjoy some food and drinks</li>
          <li>10 mins to open presents (allocate more time if there are lots of presents)</li>
          <li>10 mins for mum-to-be to do a tour of the nursery, or perhaps for everyone to give their top tip</li>
          <li>10 mins to wrap up and do goodbyes</li>
        </ul>
      </div>
      <div>
        <SectionHeading name="invites" text="Send out the invitations" />
        <p>
          Once you have an idea how you want the event to run, you can send out your virtual invitations.
          <a target="_blank" rel="noopener noreferrer" href="https://www.paperlesspost.com"> Paperless Post </a> and
          <a target="_blank" rel="noopener noreferrer" href="https://www.greenvelope.com"> Greenvelope </a>
          both have beautiful invites for a baby shower. Both allow you to include a line with your
          virtual dial in details and a link to your gift list.
        </p>
        <p>
          Make sure you include as much information as possible on the invite, that way everyone will know what to
          expect and you should hopefully minimise questions in the lead up to the event. Here’s a list things to
          consider including:
        </p>
        <ul>
          <li>Date and time</li>
          <li>Virtual platform link and dial in details</li>
          <li>Virtual background instructions, or how to decorate their physical background</li>
          <li>What to wear, perhaps you might like people to wear a colour</li>
          <li>What food and drinks to bring</li>
          <li>Anything required for games, such as pen and paper, sending photos or advice cards</li>
          <li>Gift list details, where to send the gifts, and by when</li>
          <li>RSVP details</li>
        </ul>
      </div>
      <div>
        <SectionHeading name="decorations" text="Decorations" />
        <p>
          It’s a lovely idea to send mum-to-be a parcel of decorations to decorate her background. This will make her
          feel really special and set it apart from other online events. If you don’t want to spoil the surprise, you
          could send the parcel to her partner and ask them to set up the decorations in advance.
          <a target="_blank" rel="noopener noreferrer" href="https://www.gingerray.co.uk"> Ginger Ray </a> have a
          fabulous array of baby shower decorations.
        </p>
      </div>
      <div>
        <SectionHeading name="activities" text="Prepare the games or activities" />
        <p>
          Games are almost an essential activity for a virtual baby shower. They are a great way to get all the guests
          involved and have some light-hearted fun, but it also means mum-to-be doesn’t have to be in the spot light for
          the whole event.
        </p>
        <p>
          Make sure you include as much information as possible on the invite, that way everyone will know what to
          expect and you should hopefully minimise questions in the lead up to the event. Here’s a list things to
          consider including:
        </p>
        <ul>
          <li><b>Name that tune</b> - play a few cords of a baby song and the guests need to guess the song.</li>
          <li><b>Guess the baby</b> - each guests sends in a picture of them as a baby and everyone has to guess who it is.</li>
          <li><b>Match the celeb baby name</b> - come up with a list of unusual children’s names and everyone needs to guess the celebrity parent.</li>
          <li><b>Baby alphabet game</b> - go around the group saying the letters of the alphabet, each guest names a baby name beginning with the letter that lands on them.</li>
          <li><b>Sharing advice tips</b> - each guest can share a piece of advice, or perhaps a tip for what to pack in a hospital bag</li>
        </ul>
      </div>
      <div>
        <SectionHeading name="list" text="Organising a gift list" />
        <p>
          It’s a lovely idea to have mum-to-be create a gift list of all the things she might need for her little one.
          Close friends and family love to buy gifts for the baby, and having a gift list lets them know which gifts are
          needed and avoids duplicated gifts. You might like to look at our
          <Link to="/list-ideas/newborn-baby-essentials-list">  New Born Baby Essentials </Link> and
          <Link to="/list-ideas/nursery-list">  The Nursery List </Link> guides for some inspiration.
        </p>
        <p>
          If you’d like to open the gifts at the virtual baby shower you will need to allow enough time for people to
          buy the gifts and have them sent to the house. It might be a nice idea to have the gifts wrapped up first, in
          which case you could have them sent to the host for wrapping and then dropping off at the event.
        </p>
        <p>
          Create your gift list with ewelists. You can add items from any store, easily share it with family and
          friends, and it’s completely free.
        </p>
        <p>
          We’d love to see some of your fabulous pictures so don’t forget to tag us at <b>#ewelists</b> and follow us on
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ewelists"> Instagram </a> for lots of gift list inspiration.
        </p>
      </div>
    </div>
  );

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
