import React from "react";

const classes = {
  basicData: "",
  types: "",
  name: "text-x1"
}

const PokemonData = ({ name, id, types }) => {
  let type1;
  let type2;

  if (types.length !== 0) {
    type1 = types[0].type.name;

    if (types.length > 1) {
      type2 = types[1].type.name;
    }
  }

  return (
    <div>
      <div className={classes.basicData}>
        <h2 className={classes.name}>{name}</h2>
        <span>#{id}</span>
      </div>
      <div className={classes.types}>
        <div className="type1">
          Type 1: {!type1 ? "X" : type1}
        </div>
        <div className="type2">
          Type 2: {!type2 ? "X" : type2}
        </div>
      </div>
    </div>
  )

}

export default PokemonData;