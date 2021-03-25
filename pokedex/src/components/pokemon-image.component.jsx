import React from "react";

const PokemonImage = ({ imageUrl, name }) => (
  <div>
    <img src={imageUrl} alt={name} />
  </div>
)

export default PokemonImage;