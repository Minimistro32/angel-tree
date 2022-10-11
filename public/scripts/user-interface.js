import Pokemon from "./pokemon.js";

export default class UserInterface {
    
    constructor() {
        this.filterType = 0
        this.filterGeneration = 1
    }
    
    toggleMenu(buttonId, menuId) {
        const menuButton = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        menuButton.addEventListener("click", () => {
            menu.classList.toggle("remove");
        })
    }

    generateTypeButtons(ulId) {
        const typeList = ["Normal/1",
                        "Fighting/2", 
                        "Flying/3", 
                        "Poison/4", 
                        "Ground/5", 
                        "Rock/6", 
                        "Bug/7",
                        "Ghost/8",
                        "Steel/9",
                        "Fire/10",
                        "Water/11",
                        "Grass/12",
                        "Electric/13",
                        "Psychic/14",
                        "Ice/15",
                        "Dragon/16",
                        "Dark/17",
                        "Fairy/18",
                        "All Types/19"
                        ];

        const unorderedList = document.getElementById(ulId);
        const results = document.getElementById("results");
        typeList.map((type) => {
            // Split strings to get type name and number
            const list = type.split("/");
            const typeName = list[0];
            const typeNumber = list[1];

            // Create li with class and data-type to be added to filter menu
            const listItem = document.createElement("li");
            listItem.classList.add("poke-type");
            listItem.setAttribute("data-type", typeNumber);
            listItem.textContent = typeName;

            // Add and event listener for each list item
            listItem.addEventListener("click", () => {
                document.querySelectorAll(".type-active").forEach((item) => {
                    item.classList.remove("type-active");
                })
                listItem.classList.add("type-active");
                this.filterType = listItem.dataset.type;
                results.innerHTML = "";
                document.getElementById("filter-menu").classList.toggle("remove");
                if (this.filterType === "19") {
                    const pokemmon = new Pokemon("https://pokeapi.co/api/v2/pokemon/?limit=10000")
                } else {
                    const pokemon = new Pokemon(`https://pokeapi.co/api/v2/type/${this.filterType}`);
                }
                
            })

            unorderedList.appendChild(listItem);
        })        
           
    }      
    
    displayTeam() {

        let pokemonInTeam = document.querySelectorAll(".poke-team");
        for (let i = 0; i < pokemonInTeam.length; i++) {

            let section = pokemonInTeam[i];
            let nameElement = section.querySelector(".team-name");
            let imgElement = section.querySelector(".team-sprite>img");
            
            if (localStorage.getItem(i)) {
                let values = localStorage.getItem(i).split(",");
                let valueName = values[0];
                let valueImage = values[1];
                nameElement.textContent = valueName;
                imgElement.setAttribute("src", valueImage);
                imgElement.setAttribute("alt", `Sprite for ${valueName}`);
            } else {
                nameElement.textContent = "";
                imgElement.setAttribute("src", "");
                imgElement.setAttribute("alt", "");
            }
            
        }
    }

}



