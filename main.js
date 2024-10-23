import * as Carousel from "./Modules/Carousel.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const carousel = document.getElementById("carouselInner");
const parentEl = document.getElementById("carouselInner");
const h6 = document.querySelector("h6");

const ul = document.createElement("ul");
const li1 = document.createElement("li");
const li2 = document.createElement("li");
const li3 = document.createElement("li");
const li4 = document.createElement("li");
const li5 = document.createElement("li");
const wikiLink = document.createElement("a");

ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
ul.appendChild(li4);
ul.appendChild(li5);

const API_KEY =
    "live_2L5qpy6HjWEc4qxT1JVDCifdbhbUKnvSXv3S5Awwj7ygiHvXZgwvqCPjpaBr0tvS";
const URL = "https://api.thecatapi.com/v1/breeds";
let storedBreeds = [];

async function initialLoad() {
    try {
        const response = await fetch(URL, {headers: {
            "x-api-key": API_KEY
        }});
        const jsonData = await response.json();
        storedBreeds = jsonData;
        
        console.log(storedBreeds[0]);
        /*
        console.log(storedBreeds.length);
        console.log(storedBreeds[0]);
        return storedBreeds; */
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];

            let option = document.createElement("option");
            option.value = `${breed.id}`;
            option.innerHTML = `${breed.name}`;
            breedSelect.appendChild(option);
        }
    } catch (errors) {
        console.log(errors);
    }   
    createCarousel();
    // Reset the select element
    breedSelect.selectedIndex = -1;
}

initialLoad();
//console.log(storedBreeds.length);

// Create the initial carousel.
function createCarousel() {
    for (let i = 0; i < storedBreeds.length; i++) {
        let breed = storedBreeds[i];
        let carouselEl = document.createElement("div");
      
        carouselEl.setAttribute("id", `${breed.id}`);
        carouselEl.setAttribute("class", "carousel-item");
        carouselEl.textContent = `${breed.name}`;
        carousel.appendChild(carouselEl);
    }
}

getFavouritesBtn.addEventListener("click", function() {
    const selectedBreedId = breedSelect.value;
    const selectedBreedIndex = breedSelect.selectedIndex;
    //console.log(selectedBreedId);
    //console.log(selectedBreedIndex);

    let selectedBreed = storedBreeds[selectedBreedIndex]; 
    console.log(selectedBreed.name);
    let carouselElement = document.getElementById(`${selectedBreedId}`);

    carouselElement.setAttribute("class", "carousel-item active");
    Carousel.appendCarousel(carouselElement);

    h6.innerHTML = selectedBreed.name;
    h6.appendChild(ul);
    li1.innerHTML = `<p>Description: ${selectedBreed.description}</p>`;
    li2.innerHTML = `<p>Temperament: ${selectedBreed.temperament}</p>`;
    li3.innerHTML = `<p>Origin: ${selectedBreed.origin}</p>`;
    li4.innerHTML = `<p>Life Span: ${selectedBreed.life_span}</p>`;
    li5.innerHTML = `<p>More Information: </p>`;//${selectedBreed.wikipedia_url}</p>`;
    wikiLink.setAttribute("href", `${selectedBreed.wikipedia_url}`);
    wikiLink.textContent = `${selectedBreed.wikipedia_url}`;
    li5.appendChild(wikiLink);

    // Reset the select element
    breedSelect.selectedIndex = -1;

    /* let infoLists = document.createElement("div");
    infoLists.innerHTML = `<p>Description: ${selectedBreed.description}</p>`;
    h6.appendChild(infoLists); */

});

