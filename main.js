import * as Carousel from "./Carousel.js";
import * as Votes from "./Votes.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const carousel = document.getElementById("carouselInner");
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
const API_URL = `https://api.thecatapi.com/v1/`;
const userId = "user-99";
let storedBreeds = [];

async function initialLoad() {
    const URL = `${API_URL}breeds`;
    try {
        const response = await fetch(URL, {headers: {
            "x-api-key": API_KEY
        }});
        const jsonData = await response.json();
        storedBreeds = jsonData;
        
        //console.log(storedBreeds[0]);
        
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
    breedSelect.selectedIndex = -1;
}

initialLoad();

function clear(elementId) {
    const element = document.getElementById(elementId);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

getFavouritesBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const element = "grid";
    clear(element);

    document.getElementById("main-div").style.visibility = "visible";
    
    const selectedBreedId = breedSelect.value;
    const selectedBreedIndex = breedSelect.selectedIndex;

    let selectedBreed = storedBreeds[selectedBreedIndex]; 
    console.log(selectedBreed.id);
    //console.log(selectedBreedId);
    
    h6.innerHTML = selectedBreed.name;
    h6.appendChild(document.createElement("hr"));
    h6.appendChild(ul);
    li1.innerHTML = `<p>Description: ${selectedBreed.description}</p>`;
    li2.innerHTML = `<p>Temperament: ${selectedBreed.temperament}</p>`;
    li3.innerHTML = `<p>Origin: ${selectedBreed.origin}</p>`;
    li4.innerHTML = `<p>Life Span: ${selectedBreed.life_span}</p>`;
    li5.innerHTML = `<p>More Information: </p>`;
    wikiLink.setAttribute("href", `${selectedBreed.wikipedia_url}`);
    wikiLink.textContent = `${selectedBreed.wikipedia_url}`;
    li5.appendChild(wikiLink);

    let subId = userId;
    let imgId = selectedBreed.image.id;
    let imgSrc = selectedBreed.image.url;
    let imgAlt = selectedBreed.name;
    
    let clone = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
    Carousel.appendCarousel(clone); 

    Votes.voteImage(imgId, subId);
    
    // Reset the select element
    breedSelect.selectedIndex = -1;
});

export async function voteUp(imgId, subId) {
    const URL = `${API_URL}votes/`;
    const body = {
        "image_id": imgId,
        "sub_id": subId,
        "value": 1
    };
    
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to vote the image");
        }
        // Update UI to reflect the voted state
        console.log(response.json());
    }).then(data => {
        alert(`Vote Up: ${data.message}`);
        console.log(data)
    }).catch(error => {
        console.error('Error:', error);
    });
}

export async function voteDown(imgId, subId) {
    const URL = `${API_URL}votes/`;
    const body = {
        "image_id": imgId, 
        "sub_id": subId,  
        "value": -1      
    };
    
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to vote the image");
        }
        return response.json();
    }).then(data => {
        alert(`Vote Down: ${data.message}`);
        console.log(data)
    }).catch(error => {
        console.error('Error:', error);
    });
}

// Request to get the votes by 'sub_id'(User)
export async function getVotesByUserId(subId) {
    const URL = `${API_URL}votes?sub_id=${subId}`;
    try {
        const response = await fetch(URL, {
            headers: {"x-api-key": API_KEY,
                "Cotent-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const votes = await response.json();
        //console.log(votes);
        //console.log(votes[0].id);
        return votes;
    } catch (error) {
        console.log("Error fetching votes:", error);
    }
}

export async function deleteVote(imgId, subId) {
    const URL = `${API_URL}votes/`;
    const body = {
        "image_id": imgId, 
        "sub_id": subId,     
    };
    
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete the image");
        }
        return response.json();
    }).then(data => {
        alert(`Delete Vote: ${data.message}`);
        data.pop();
    }).catch(error => {
        console.error('Error:', error);
    });
}


export async function favourite(imgId) { 
    const URL = `${API_URL}favourites/`;
    const body = {
        "image_id": imgId,
        "sub_id": "user-99",
    };

    fetch(URL, {
        method: "POST",
        headers: {
            "Cotent-Type": "application/json",
            "x-api-key": API_KEY
        }, 
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to favorite image");
        }
        // Update UI to reflect the favorited state
        console.log(response.json());
    }).catch(error => {
        console.error('Error:', error);
    });
}
    