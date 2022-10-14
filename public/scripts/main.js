import UserInterface from "./user-interface.js";
import Pokemon from "./pokemon.js";

const UI = new UserInterface()
UI.generateTypeButtons("type-list")
// Navigation bar 
UI.toggleMenu("menu-button", "nav-bar");
// Filter menu
UI.toggleMenu("open-filter", "filter-menu");

UI.toggleMenu("open-team", "team")

window.onload = () => {
    UI.displayTeam();
}

if (UI.filterType !== 0) {
    const pokemon = new Pokemon(`https://pokeapi.co/api/v2/type/${UI.filterType}`);
}


