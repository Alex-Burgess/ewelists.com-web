import React from "react";
import IdeasMain from "custom/GiftIdeas/IdeasMain.js";

export default function listideasPage(props) {
  const recentArticles = [
    {title: "Newborn Baby Essentials", url: "/list-ideas/newborn-baby-essentials-list", img: 'newborn-baby-essentials-list.jpg', img_position_left: false,
    description_short: "What are the basic items that you need for your new arrival?",
    beginning_content: "There is so much 'stuff' out there for babies and deciding which of it you really need can seem like a huge task. The good news is that babies actually don't need that much for the first few months of their life, meaning you can keep things..."},
    {title: "Baby Travel Gear", url: "/list-ideas/baby-travel-gear", img: 'baby-travel-gear.jpg', img_position_left: true,
    description_short: "Our favourite gear to take the fuss out of travelling with little ones!",
    beginning_content: "Getting away on holiday is great for both little ones and parents. A new environment provides stimulation for children which can be exciting and allows you to relax and recharge. However, the concern of being out of your comfort zone at home..."},
    {title: "Hospital Bag Checklist", url: "/list-ideas/hospital-bag-checklist", img: 'hospital-bag-checklist.jpg', img_position_left: false,
    description_short: "Get set with everything you need for the all important hospital bag.",
    beginning_content: "Whether you like to be super organised and prepared for anything or you are just looking for some ideas to get you started, these top tips and hospital bag checklists will help you stay ahead of the game. You can pack your bag as early as you..."},
    {title: "Nursery List", url: "/list-ideas/nursery-list", img: 'nursery-list.jpg', img_position_left: true,
    description_short: "What to buy for your baby's bedroom.",
    beginning_content: "Have you been gushing over the possibilities for the cute little nursery or area you want to create for your baby. The nesting phase is such a special time in the lead up to the arrival of your baby and choosing how to decorate your nursery..."},
    {title: "Baby Bath Time", url: "/list-ideas/baby-bath-time", img: 'baby-bath-time.jpg', img_position_left: false,
    description_short: "How to give your baby a bath, with everyting you need.",
    beginning_content: "It can be a daunting prospect when it comes to giving your new baby a bath. They are so small and slippery and you worry if they will like it. The first thing to say is that you don’t need to bathe your baby straight away or every day for..."},
    {title: "Christmas Ideas For Toddlers", url: "/list-ideas/christmas-ideas-for-toddlers", img: 'christmas-ideas-for-toddlers.jpg', img_position_left: true,
    description_short: "Great Christmas ideas for toddlers and young children.",
    beginning_content: "If you are stuck wondering what to get a toddler for Christmas, here are some of our favourite ideas! Toddlers love to mimic adults and join in ‘helping’ with every day tasks. Here are some great ideas to encourage role play..."}
  ];

  return (
    <IdeasMain
      isAuthenticated={props.isAuthenticated}
      recentArticles={recentArticles}
      user={props.user}
    />
  );
}
