export default class Pokemon {

    async fetchPokemon(url) {
        const response = await fetch(url);
        const pokemon = await response.json();
        console.log(pokemon);
    }
}