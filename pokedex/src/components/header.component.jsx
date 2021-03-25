import React from "react";

import SearchBar from "./search-bar.component";

const classes = {
  header: "bg-red-400 p-8 flex justify-between gap-1",
  title: "font-bold",
}

const Header = () => (
  <header className={classes.header}>
    <h1 className={classes.title}>Pokédex</h1>
    <SearchBar />
  </header>
)

export default Header;