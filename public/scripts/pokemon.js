import UserInterface from "./user-interface.js"

export default class Pokemon {

    constructor(url) {
        this.URL = url;
        this.pokemon = [];
        this.init();
        this.length_of_team = localStorage.length;
        this.UI = new UserInterface;
    }
    
    async init() {
        
        if (this.URL.includes("type")) {
            this.fetchPokemonByType()
        } else if (this.URL.includes("generation")){
            this.fetchPokemonByGeneration()
        } else {
            console.log("fetching all pokemon")
            this.fetchPokemonAll()
        }


    }

    async fetchPokemonByType() {
        // Displays pokemon by type
        this.pokemon = await this.fetchPokemon(this.URL);
        this.pokemon = this.pokemon.pokemon;
        this.pokemon.map(async (item) => {
            const p = await this.fetchPokemon(item.pokemon.url);
            this.displayPokemon(p);
        });
    }

    async fetchPokemonAll() {
        // This function runs when the user wants to display ALL pokemon.
        this.pokemon = await this.fetchPokemon(this.URL);
        this.pokemon = this.pokemon.results;
        console.log(this.pokemon);
        this.pokemon.map(async (item) => {
            const p = await this.fetchPokemon(item["url"]);
            this.displayPokemon(p)
        })
    }

    addToTeam(name, spriteURL) {
        // Adds the name and sprite URL to a list in local storage to be accessed and displayed in the team section.
        try {        
            if (localStorage.length < 6) {
                // If the length of the local storage is less than six 
                localStorage.setItem(this.length_of_team, `${name},${spriteURL}`);
                this.length_of_team ++;
                 console.log("add to team");
                } else {
                    // If there is six in local storage, then throw an error
                    this.length_of_team = 0;
                    localStorage.clear();
                    throw new Error("You cannot have more than 6 pokemon on a team.")
                }
        } catch (err) {
            // Alert the user of the error
            alert(err);
        }

    }

    removeFromTeam(index) {
        // Remove from local storage
        localStorage.removeItem(index);
        // Decrement the length of the team
        this.length_of_team -= 1;
        // Log to the console for debugging
        console.log("remove from team");
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

        // Create add team button
        const teamButton = templateClone.querySelector(".team-button");
        teamButton.addEventListener("click", () => {
            if (teamButton.innerText === "Add") {
                teamButton.setAttribute("data-index", this.length_of_team);
                this.addToTeam(pokemon.name, spriteURL);
                teamButton.textContent = "Remove";
                this.UI.displayTeam();
            } else {
                this.removeFromTeam(teamButton.dataset.index);
                teamButton.textContent = "Add";
                this.UI.displayTeam();
            }
           
        });
        
        // Display stats
        this.displayStats(pokemon.stats, templateClone);        

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