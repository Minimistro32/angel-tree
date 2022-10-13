import UserInterface from "./user-interface.js";
import Pokemon from "./pokemon.js";

window.onload = () =>  {
    const pokemon = new Pokemon("");
}

const UI = new UserInterface();
UI.toggleMenu("menu-button", "nav-bar");