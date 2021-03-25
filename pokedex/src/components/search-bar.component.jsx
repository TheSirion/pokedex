import React from "react";

const classes = {
  searchBar: "p-2 m-3 flex flex-col bg-red-300 rounded-md",
  input: "rounded-md",
  button: "bg-purple-300 hover:bg-purple-200 focus:bg-purple-600 rounded-md m-1 px-2"
}

const SearchBar = () => (
  <div className={classes.searchBar}>
    <label htmlFor="search-bar">Search Pokémon</label>
    <div>
      <input className={classes.input} type="text" name="search-bar" />
      <button className={classes.button}>Go</button>
    </div>
  </div>
)

export default SearchBar;