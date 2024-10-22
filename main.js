//import axios from "axios";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

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
    // Reset the select element
    breedSelect.selectedIndex = -1;
}

initialLoad();
console.log(storedBreeds.length);

getFavouritesBtn.addEventListener("click", function() {
    const selectedBreedVal = breedSelect.value;
    const selectedBreedIndex = breedSelect.selectedIndex;

    let selectedBreed = storedBreeds[selectedBreedIndex]; 
    console.log(selectedBreed.name);
    let carouselElement = document.getElementById(`${selectedBreedVal}`);

});