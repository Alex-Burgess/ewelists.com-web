import React, { useState, useEffect } from 'react';
// libs
import { useAppContext } from "libs/contextLib";
// custom components
import { getUsersLists } from "./Sections/GetUsersLists";
import SectionHeading from "./Sections/SectionHeading.js";
import SectionHeadings from "./Sections/SectionHeadings.js";
import ListArticle from "./Sections/ListArticle.js";
import Products from "./Sections/Products.js";
import ChecklistCard from "./Sections/ChecklistCard.js";

// data id
const name = 'first-christmas'

export default function ChristmasIdeasForToddlers(props) {
  const { isAuthenticated } = useAppContext();
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          Yippee, December is getting closer and there is an air of excitement about your little one’s first Christmas!
          You might be wondering what on earth to put on a baby’s wish list, but with so much happening in their first
          year, there are plenty of opportunities for wonderful, useful gifts.
        </p>
        <p>
          We love buying gifts for little ones and have curated a list of some of our favourite products this year. We
          hope it inspires you with lots of ideas for your little one’s Christmas wish list.
        </p>
      </div>
      <Products
        products={[
          "879b1b44-313a-4756-b124-e3a6f350853a",
          "15dbbb84-5c6d-42fd-b507-e49f56331f3a",
          "9e92347a-bf13-473d-ab50-d29247f04160",
          "59244d27-cfdb-4809-85e7-bc23c8c306f3",
          "422a0de7-f485-40c1-a722-d37cf6335a09",
          "29f2cd2f-98ec-458c-b4a2-b2a9af91d840",
          "4b56e01b-e8e1-427d-a81d-8ebacccde146",
          "69dc2327-9d42-4d32-9d9c-d9f4f707e523",
          "85a76f67-377f-438b-b812-1afbc628175d",
          "be919373-a74a-413d-8ef3-25472dffc043",
          "951573d4-f402-43b2-a2a4-76f959142e3f",
          "648d43bc-4581-47e7-84b3-130bbd123915",
          "1638fa38-9126-46b0-b66d-8e1431183783",
          "91640d41-800a-4c14-a0f0-560d17e5fc34",
          "1ad17be6-a625-44b0-919a-26ddf4920ebf",
          "675792f2-0f1f-4acf-9944-b7c22286ca29",
          "0615586c-7ee3-4e56-91a9-a887d5415ff0",
          "70d3b439-2c04-4083-b1bb-973be39a5201",
          "3fc1fb2b-8b6b-4853-b245-aa48f7a3b294",
          "196831b1-2cd6-42ce-865a-b3df392e8dc9",
          "9f93a569-1f5e-4d06-95c6-34cabb198666"
        ]}
        lists={lists}
      />
      <div>
        <p>
          Why not start creating a list of all the things you need with ewelists. You can add items from any store,
          easily share it with family and friends, and it’s completely free.
        </p>
        <p>
          We’d love to see some of your fabulous pictures, so don’t forget to tag us at <b>#ewelists</b> and follow us on
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

    if (isAuthenticated) {
      getLists();
    }
  }, [isAuthenticated]);

  return (
    <ListArticle
      name={name}
      content={content}
    />
  );
}
