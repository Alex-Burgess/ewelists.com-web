import React from "react";
import IdeasMain from "custom/GiftIdeas/IdeasMain.js";

export default function ListIdeasPage(props) {
  const recentArticles = [
    {title: "The Essentials Baby List", url: "/listideas/babyessentials", img: 'baby-essentials.jpg', img_position_left: false,
    description_short: "What are the basic items that you need for your new arrival?",
    beginning_content: "There is so much ‘stuff’ out there for babies and deciding which of it you really need can seem like a huge task. The good news is that babies really don’t need that much for the first few months of their life meaning..."},
    {title: "Travel Gear", url: "/listideas/travelgear", img: 'travel-gear.jpg', img_position_left: true,
    description_short: "Great items to make travelling with your little ones no fuss!",
    beginning_content: "The compact stroller/buggy is one of the most useful items for travelling. They are handy for all sorts, such as effortlessly moving around the city hopping on and off public transport, taking with you through the airport, or just keeping in the car..."},
    {title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospital-bag.jpg', img_position_left: false,
    description_short: "Get set with everything you need for the all important hospital bag.",
    beginning_content: "What do you pack in that all important hospital bag, or is it bags? I like to be organised and took great pleasure in compartmentalising my two hospital bags many weeks out from the birth date. My top tips for what to pack in your bag..."},
    {title: "Nursery List", url: "/listideas/nursery", img: 'nursery-list.jpg', img_position_left: true,
    description_short: "All the items you need for your baby’s bedroom",
    beginning_content: "Have you been gushing over the possibilities for the cute little nursery or area you want to create for your baby. The nesting phase is such a special time in the lead up to the arrival of your baby and choosing how to decorate your nursery can bring immense joy..."},
    {title: "Bath Time", url: "/listideas/bathtime", img: 'bath-time.jpg', img_position_left: false,
    description_short: "Everyting you need when bathing your baby.",
    beginning_content: "It can be a daunting prospect when it comes to giving your new baby a bath. They are so small and slippery and you worry if they will like it. The first thing to say is that you don’t need to bathe your baby straight away or every day for that matter..."},
    {title: "Christmas Ideas", url: "/listideas/christmasfortoddlers", img: 'christmas-toddlers.jpg', img_position_left: true,
    description_short: "Great Christmas ideas for toddlers and young children.",
    beginning_content: "If you are stuck wondering what to get a toddler for Christmas, here are some of our favourite ideas! Toddlers love to mimic adults and join in ‘helping’ with every day tasks. Here are some great ideas to encourage role play..."}
  ];

  const similarArticles = [
    {category: "TRAVEL", title: "Travel Gear", url: "/listideas/travelgear", img: 'travel-gear.jpg',
    description_short: "Our favourite buggies, travel cots and other gear which make travelling with your little ones hassle free."},
    {category: "MATERNITY", title: "Hospital Bag", url: "/listideas/hospitalbag", img: 'hospital-bag.jpg',
    description_short: "Make sure you're all set with everything you need for the all important hospital bag."},
    {category: "BABY", title: "Bath Time", url: "/listideas/bathtime", img: 'bath-time.jpg',
    description_short: "Everything you need when bathing your baby."}
  ];


  return (
    <IdeasMain
      isAuthenticated={props.isAuthenticated}
      recentArticles={recentArticles}
      similarArticles={similarArticles}
      user={props.user}
    />
  );
}
