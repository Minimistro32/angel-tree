export default class Pokemon {

    constructor(url) {
        this.URL = url;
        this.pokemon = [];
        this.init()
    }
    
    async init() {
        
        if (this.URL.includes("type")) {
            this.fetchPokemonByType()
        } else if (this.URL.includes("generation")){
            this.fetchPokemonByGeneration()
        } else {
            console.log("fetching all pokemon 2")
            this.fetchPokemonAll()
        }


    }

    async fetchPokemonByType() {
        this.pokemon = await this.fetchPokemon(this.URL);
        this.pokemon = this.pokemon.pokemon;
        this.pokemon.map(async (item) => {
            const p = await this.fetchPokemon(item.pokemon.url);
            this.displayPokemon(p);
        });
    }

    async fetchPokemonAll() {
        this.pokemon = await this.fetchPokemon(this.URL);
        this.pokemon = this.pokemon.results;
        console.log(this.pokemon);
        this.pokemon.map(async (item) => {
            const p = await this.fetchPokemon(item["url"]);
            this.displayPokemon(p)
        })
    }

    
    displayPokemon(data) {
        const pokemon = data;
        // Get results element
        const results = document.querySelector("#results");
        // Clone template
        const template = document.getElementById("poke-output");
        const templateClone = template.content.cloneNode(true);
        // Create sprite element
        const spriteElement = templateClone.querySelector(".poke-sprite");
        const spriteURL = pokemon.sprites.front_default;
        spriteElement.setAttribute("src", spriteURL);
        spriteElement.setAttribute("alt", `Sprite for ${pokemon.name}`)
        
        // Create name element
        const nameElement = templateClone.querySelector(".poke-name");
        nameElement.textContent = pokemon.name;
        
        // Display stats
        this.displayStats(pokemon.stats, templateClone);
        
        // Clear results content and remove loading class
        

        // Add the template to the results section
        results.appendChild(templateClone);
    }

    
    
    async fetchPokemon(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else {
                const error = await response.text();
                throw new Error(error);
            }
        } catch (err) {
            console.log(err);
        }
    }

    displayStats(statsList, outputElement) {
        statsList.map(stat => {
            const statName = stat.stat["name"];
            const statValue = stat.base_stat;
            const listElement = outputElement.querySelector(`.${statName}`);
            listElement.textContent = `${statName}: ${statValue}`;
        })
    }
}