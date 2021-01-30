// import tippy from 'tippy.js';

// connection to PokeAPI
const P = new Pokedex.Pokedex();

// BASIC POKÉMON INFO
const pokemonName = document.getElementById("name");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonId = document.getElementById("id");
const genus = document.getElementById("genus");
const type1 = document.getElementById("type-1");
const type2 = document.getElementById("type-2");
const abilities = document.getElementById("abilities");
const lore = document.getElementById("lore");

// POKÉMON FAMILY
const evName = document.getElementById("ev-name");
const preEvName = document.getElementById("pre-ev-name");

// LISTS
const movesList = document.getElementById("moves-list");
const abilitiesList = document.getElementById("abilities-list");
const flavorTexts = document.getElementsByClassName("flavor-text");

// IMAGES
const artwork = document.getElementById("artwork");
const frontDefault = document.getElementById("front-default");
const backDefault = document.getElementById("back-default");
const frontShiny = document.getElementById("front-shiny");
const backShiny = document.getElementById("back-shiny");
const evolvesFrom = document.getElementById("evolves-from");
const evolvesTo = document.getElementById("evolves-to");

// LINKS 
const evLink = document.getElementById('ev-link')
const preEvLink = document.getElementById('pre-ev-link')

// OTHERS
const background = document.getElementById("layout-container");
const imageBox = document.getElementById("img-box");
const pokemonInfo = document.getElementById("pokemon-info");
const pokemonSearch = document.getElementById("pokemon-search-box");
const button = document.getElementById("button");

const typeColors = {
  normal: "#A8A878",
  poison: "#A040A0",
  psychic: "#F85888",
  grass: "#78C850",
  ground: "#E0C068",
  ice: "#98D8D8",
  fire: "#F08030",
  rock: "#B8A038",
  dragon: "#7038F8",
  water: "#6890F0",
  bug: "#A8B820",
  dark: "#705848",
  fighting: "#C03028",
  ghost: "#705898",
  steel: "#B8B8D0",
  flying: "#A890F0",
  electric: "#F8D030",
  fairy: "#EE99AC",
  noType: "lightgray",
};

const getPokemon = async (pokemon) => {
  try {
    const response = await P.getPokemonByName(pokemon);
    const {
      name,
      height,
      weight,
      types,
      abilities,
      moves,
      sprites,
      id,
    } = response;

    getPokemonSpecies(name);

    // Name & id
    const nameText = capitalize(handleMultiWordName(name));
    pokemonName.innerText = `${nameText}`;
    pokemonId.innerText = `#${id}`;

    // Measures
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    pokemonHeight.innerText = `Height: ${heightNum / 10} m`;
    pokemonWeight.innerText = `Weight: ${weightNum / 10} kg`;

    // Images
    artwork.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.id}.png`;
    artwork.alt = name;
    frontDefault.src = sprites.front_default;
    backDefault.src = sprites.back_default;
    frontShiny.src = sprites.front_shiny;
    backShiny.src = sprites.back_shiny;

    // Types & type colors
    const type1Color = types[0].type.name;

    type1.innerText = capitalize(type1Color);
    type1.style.backgroundColor = typeColors[type1Color];
    background.style.background = typeColors[type1Color];
    type1.classList.add("type");
    if (response.types.length === 2) {
      const type2Color = types[1].type.name;
      type2.style.backgroundColor = typeColors[type2Color];
      type2.innerText = capitalize(type2Color);
      type2.classList.add("type");
      changeBackground(typeColors[type1Color], typeColors[type2Color]);
    } else {
      type2.remove();
    }

    // Abilities
    for (let ability of abilities) {
      const abItem = document.createElement("div");
      abItem.innerText = handleMultiWordName(ability.ability.name);
      abItem.style.backgroundColor = "CornflowerBlue";
      abItem.classList.add("ability");
      abilitiesList.appendChild(abItem);
    }

    // Moves
    if (moves.length < 10) {
      movesList.classList.add("moves-list-small");
    }

    let idNumber = 0;
    for (let move of moves) {
      idNumber++;
      getMove(move.move.name, idNumber);
    }
  } catch (e) {
    console.error("Oops!:", e);
    imageBox.remove();
    const errorMessage = document.createElement("h1");
    errorMessage.innerText = "Could Not Find Pokémon";
    background.appendChild(errorMessage);
  }
};

const getAbility = async (ability) => {
  try {
    const response = await P.getAbilityByName(ability);
    console.log(response);
  } catch (e) {}
};

const getPokemonSpecies = async (name) => {
  try {
    const response = await P.getPokemonSpeciesByName(name);
    console.log(response);
    const { flavor_text_entries, evolves_from_species } = response;

    genus.innerText = response.genera[7].genus;

    // Flavor texts
    let flavorTextsList = [];
    for (flavor_text of flavor_text_entries) {
      if (
        flavor_text.language.name === "en" &&
        !flavorTextsList.includes(flavor_text.flavor_text)
      ) {
        flavorTextsList.push(flavor_text.flavor_text);
        lore.innerText = flavor_text.flavor_text;
      }
    }
    // flavorTextsList.map((flavorText, num) => {
    //   const withReplacedChar = flavorText.replace("", "\n");
    //   flavorTexts[num].innerText = withReplacedChar;
    // });

    if (evolves_from_species !== null) {
      const preEvolution = await P.getPokemonByName(evolves_from_species.name);
      const evolutionChain = await P.getEvolutionChainById(
        preEvolution.evolution_chain
      );
      evolvesFrom.src = preEvolution.sprites.front_default;
      preEvName.innerText = handleMultiWordName(preEvolution.name);
      preEvLink.href = preEvolution.evolves_from_species.url;
     
      console.log("evolution chain:", evolutionChain);
    }
  } catch (e) {
    console.error(e, "could not get evolution chain");
  }
};

const getMove = async (name, id) => {
  const move = await P.getMoveByName(name);
  const moveItem = document.createElement("li");
  moveItem.setAttribute("id", id);
  moveItem.innerText = handleMultiWordName(move.name);
  moveItem.classList.add("move");
  movesList.appendChild(moveItem);
};

const capitalize = (word) => {
  const capLetter = word[0].toUpperCase();
  return capLetter + word.substring(1);
};

// change background according to types
const changeBackground = (type1, type2) => {
  background.style.background = `linear-gradient(to right, ${type1}, ${type2})`;
};

// handle pokémon, moves, and abilities with names with two or more words
const handleMultiWordName = (name) => {
  const dashBlackList = ["Ho-Oh", "Porygon-z", "Tri-Attack"];
  const spaceBlackList = [];
  if (name.indexOf(" ") >= 1 && spaceBlackList.indexOf(name) < 0) {
    return capitalize(name.replace(" ", "-"));
  } else if (name.indexOf("-") >= 1 && dashBlackList.indexOf(name) < 0) {
    const splitName = name.split("-");
    let capitalized = splitName.map((name) => {
      return capitalize(name);
    });
    return capitalized.join(" ");
  }
  return capitalize(name);
};

// gets Pokémon from local storage and sends to API
let currentPokemon = localStorage.getItem("pokémon");

if (currentPokemon) {
  const handledName = handleMultiWordName(currentPokemon);
  getPokemon(handledName.toLowerCase());
} else {
  getPokemon("bulbasaur");
}

// Searches Pokémon name on the search bar
button.addEventListener("click", () => {
  const input = pokemonSearch.value;
  currentPokemon = localStorage.setItem("pokémon", input);
});