import axios from "axios";

const API_KEY =
  "live_2L5qpy6HjWEc4qxT1JVDCifdbhbUKnvSXv3S5Awwj7ygiHvXZgwvqCPjpaBr0tvS";

const url = "https://api.thecatapi.com/v1/breeds";
let storedBreeds = [];

async function initialLoad() {
    console.log("Request begins: ");
    const response = await axios.get(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
  
    storedBreeds = response.data;
}
initialLoad();
console.log(storedBreeds[0]);
