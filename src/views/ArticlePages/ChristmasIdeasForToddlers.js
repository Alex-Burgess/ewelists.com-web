import React, { useState, useEffect } from 'react';
// libs
import { useAppContext } from "libs/contextLib";
// custom components
import { getUsersLists } from "./Sections/GetUsersLists";
import SectionHeading from "./Sections/SectionHeading.js";
import SectionHeadings from "./Sections/SectionHeadings.js";
import ListArticle from "./Sections/ListArticle.js";
import Products from "./Sections/Products.js";

// data id
const name = 'christmas-ideas-for-toddlers'

export default function FirstChristmas(props) {
  const { isAuthenticated } = useAppContext();
  const [lists, setLists] = useState({});

  const content = (
    <div>
      <div>
        <p>
          The excitement around Christmas just gets better and better as your little one grows. If you’re anything like
          us, you‘ll be getting giddy on nostalgia and want to create those same feelings you had when you were small.
        </p>
        <p>
          We’ve curated two lists with our favourite products, from toddlers to pre-schoolers, we hope we inspire you
          this Christmas.
        </p>
      </div>
      <SectionHeadings
        headings={[
          {"name": "one-to-two", "text": "One to two year olds"},
          {"name": "three-to-four", "text": "Three to four year olds"}
        ]}
      />
      <div>
        <SectionHeading name="one-to-two" text="One to two year olds" />
        <p>
          These years are all about mastering their movements and gaining independence. Your little one will love
          anything they can push along, pull along or sit on. You’ll definitely need somewhere to start storing their
          growing collection of toys, and you might even like to give a mini balance bike a try!
        </p>
      </div>
      <Products
        products={[
          "f67f9177-36f3-4f41-9d65-b8cd31f839b9",
          "da1d0541-4af5-4a40-8d20-ac48b3acbd84",
          "785a2bf7-9feb-45bb-b221-9bcd5588727f",
          "8d7e0603-13df-4fb3-a741-ac3b72fbbda5",
          "70e7da59-6c8d-48eb-89d4-54dcf6ad5802",
          "766c3449-5dcb-4c23-99cf-3d8323872328",
          "6b493a21-548a-437d-ac40-5260299d8b9b",
          "80573e35-f94f-4fee-b7e2-d0ee43fdbaa5",
          "53a31dcc-ee5e-46ed-ac69-2657a7cfd300",
          "3d1f74dd-efe4-48f1-9ba1-88642c4cb7dc",
          "81de87b6-f999-4997-8c11-17fb85e38d1f",
          "97fcc95d-5a7b-4f68-9b3f-e1c9bb607593",
          "1a8783ab-4562-4370-ad8e-111ea2f04422",
          "2168f064-47ad-42e0-b09f-ca6f4dc060b7",
          "497fe2e6-65d9-44ec-93c7-eb9f125c692a"
        ]}
        lists={lists}
      />
      <div>
        <SectionHeading name="three-to-four" text="Three to four year olds" />
        <p>
          At this age children start to get really creative and can get lost in imaginative play. They love to mimic
          grown ups and you might find that they get quite adventurous using anything that moves. During the pre-school
          years they will be learning about numbers, letters and phonics, so any games that practice those skills are
          always a bonus.
        </p>
      </div>
      <Products
        products={[
          "be30e461-aa6b-4ece-a207-8ac719cd48c0",
          "5adc17d9-f2f6-4b9c-a572-35b98d0b2da8",
          "17d644c0-192c-4bc8-84f6-7825ba7d3928",
          "2f9af95f-1a87-44f6-b945-7038d4dcaaa1",
          "b8c726f5-fcd9-4254-8792-f7bb56a5f2aa",
          "8df9d75e-ab65-4089-8688-75eb8412f27e",
          "12345678-blog-r027-1234-abcdefghijkl",
          "12345678-prod-c001-1234-abcdefghijkl",
          "d87ff1fe-a129-4a39-a8c7-be1cc1017926",
          "118f00db-9367-4c63-bba3-36cc3a4e0e1b",
          "6d4da6dd-eb7f-4fee-bee9-6a7e3dd5b160",
          "87aadfd3-22ac-4976-843e-b2885e3f7e57",
          "29e3cf1e-de17-4662-a6d6-06b475d7783e",
          "1f190fb5-fa0e-4571-a401-b0f6a2c58b0c",
          "8baaa216-9ba0-47b8-8be8-b5c90bbed327",
          "35501712-2587-4c13-9a47-035a03f4e580",
          "df11abd0-2100-400d-9496-b945b68c5840",
          "7bff3a89-283a-462b-b626-e8727363eb14"
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
