//import { votes } from "./main.js";

export async function votes() {
    let vote = 0;
    if (document.getElementById("btn1").clicked === true) {
        vote = 1;
    } else if (document.getElementById("btn2").clicked === true) {
        vote = -1;
    }

    return vote;
}

/* const API_KEY =
    "live_2L5qpy6HjWEc4qxT1JVDCifdbhbUKnvSXv3S5Awwj7ygiHvXZgwvqCPjpaBr0tvS";
const API_URL = `https://api.thecatapi.com/v1/`; */
