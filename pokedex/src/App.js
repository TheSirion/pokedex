import React from "react";

import Header from "./components/header.component";
import PokemonImage from "./components/pokemon-image.component";
import PokemonData from "./components/pokemon-data.component";

const Pokedex = require("pokeapi-js-wrapper")

const classes = {
  main: "grid grid-cols-1 md:grid-cols-2 gap-4",
  pokemonImage: "",
  pokemonData: ""
}

class App extends React.Component {
  state = {
    name: "Unknown",
    id: "00",
    imageUrl: "",
    types: []
  }

  getPokemon = name => {
    const P = new Pokedex.Pokedex()

    P.getPokemonByName(name).then(response => {
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`;
      // console.log(response.types)
      this.setState({ name: response.name })
      this.setState({ imageUrl: imageUrl })
      this.setState({ types: response.types }, () => console.log(response.types))
      this.setState({ id: response.id })
      this.setState({ loading: false })
    })
  }

  componentDidMount() {
    this.getPokemon("bulbasaur")
  }

  render() {
    const { name, id, imageUrl, types } = this.state;
    return (
      <>
        <Header />
        <main className={classes.main}>
          <PokemonImage className={classes.pokemonImage} alt={name} imageUrl={imageUrl} />
          <PokemonData className={classes.pokemonData} name={name} id={id} types={types} />
        </main>
      </>
    )
  };
}

export default App;
