import * as Carousel from "./Modules/Carousel.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const carousel = document.getElementById("carouselInner");
const h4 = document.querySelector("h4");

const API_KEY =
  "live_2L5qpy6HjWEc4qxT1JVDCifdbhbUKnvSXv3S5Awwj7ygiHvXZgwvqCPjpaBr0tvS";
const URL = "https://api.thecatapi.com/v1/breeds";
let storedBreeds = [];

async function initialLoad() {
    //console.log("Request begins: ");
    const response = await axios.get(URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    
    storedBreeds = response.data;
    //console.log(storedBreeds[0]);
    /* for (let i = 0; i < response.data.length; i++) {
      storedBreeds.push(response.data[i]); 
    }
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
    createCarousel();
    // Reset the select element
    breedSelect.selectedIndex = -1;
}

initialLoad();
console.log(storedBreeds.length);

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
    const selectedBreedVal = breedSelect.value;
    const selectedBreedIndex = breedSelect.selectedIndex;
    console.log(selectedBreedVal);
    console.log(selectedBreedIndex);

    let selectedBreed = storedBreeds[selectedBreedIndex]; 
    console.log(selectedBreed.name);
    let carouselElement = document.getElementById(`${selectedBreedVal}`);

    carouselElement.setAttribute("class", "carousel-item active");
    Carousel.appendCarousel(carouselElement);
    h4.innerHTML = selectedBreed.name;

    let infoLists = document.createElement("div");
    infoLists.innerHTML = `<p>Description: ${selectedBreed.description}</p>`;
    h4.appendChild(infoLists);

});

