import { toggleNav } from "./nav.js";
import Pokemon from "./pokemon.js";

const pokemon = new Pokemon()

pokemon.fetchPokemon("https://pokeapi.co/api/v2/pokemon/pikachu")

toggleNav()