import React from "react";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

export default function HeaderTransparent(props) {
  return (
    <Header
      links={<HeaderLinks headerColor="dark" />}
      fixed
      color="transparent"
      changeColorOnScroll={{
        height: 50,
        color: "dark"
      }}
    />
  );
}
