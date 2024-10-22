import axios from "axios";

const API_KEY =
  "live_2L5qpy6HjWEc4qxT1JVDCifdbhbUKnvSXv3S5Awwj7ygiHvXZgwvqCPjpaBr0tvS";

const URL = "https://api.thecatapi.com/v1/breeds";
let storedBreeds = [];

async function initialLoad() {
    console.log("Request begins: ");
    const response = await axios.get(URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    
    //storedBreeds = response.data;
    //console.log(storedBreeds[0]);
    for (let i = 0; i < response.data.length; i++) {
      storedBreeds.push(response.data[i]); 
    }
    console.log(storedBreeds.length);
    console.log(storedBreeds[0]);
    return storedBreeds;
}

initialLoad();
console.log(storedBreeds.length);
