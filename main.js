import * as Carousel from "./Carousel.js";
import * as Votes from "./Votes.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const carousel = document.getElementById("carouselInner");
//const parentEl = document.getElementById("carouselInner");
const h6 = document.querySelector("h6");
const cloneDiv = document.getElementById("clone-div");

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
    //createCarousel();
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
        //carouselEl.setAttribute("class", "carousel-item");
        //carouselEl.textContent = `${breed.name}`;
        carousel.appendChild(carouselEl);
    }
}

getFavouritesBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const selectedBreedId = breedSelect.value;
    const selectedBreedIndex = breedSelect.selectedIndex;

    let selectedBreed = storedBreeds[selectedBreedIndex]; 
    console.log(selectedBreed.id);
    console.log(selectedBreedId);
    
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

    //let selectedImg = document.createElement("div");
    //selectedImg.setAttribute("id", selectedBreedId);

    //carouselElement.setAttribute("class", "carousel-item active");
    //Carousel.appendCarousel(carouselElement);
    //let img = document.createElement("img");
    //img.setAttribute("class", "d-block w-100 center");
    //img.style.maxWidth = "50%";
    //img.src = selectedBreed.image.url;
    //img.alt = selectedBreed.name;
    //selectedImg.appendChild(img); 
    //console.log(cloneDiv.firstElementChild);

    let subId = userId;
    let imgId = selectedBreed.image.id;
    let imgSrc = selectedBreed.image.url;
    let imgAlt = selectedBreed.name;
    
    let clone = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
    Carousel.appendCarousel(clone); 

    Votes.voteImage(imgId, subId);
    //voteImage(imgId, subId, vote);
    /* if (cloneDiv.firstElementChild === infoDump) {
        cloneDiv.insertBefore(clone, cloneDiv.firstElementChild);
        //console.log(cloneDiv); 
    } else {
        cloneDiv.removeChild(cloneDiv.firstElementChild);
        cloneDiv.insertBefore(clone, cloneDiv.firstElementChild);
    }  */
    
    
    //cloneParentDiv.insertBefore(clone, cloneParentDiv.firstChild);
    //carousel.insertBefore(clone, carousel.firstChild);
   
    // Reset the select element
    breedSelect.selectedIndex = -1;
});
// "image_url": imgUrl,
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
            throw new Error("Failed to vote image");
        }
        // Update UI to reflect the voted state
        console.log(response.json());
        //return response.json();
    }).then(data => {
        alert(data.message);
        console.log(data)
    }).catch(error => {
        console.error('Error:', error);
    });
}

export async function voteDown(imgId, subId) {
    const URL = `${API_URL}votes/`;
    const body = {
        "image_id": imgId, //selectedBreed.image.id
        "sub_id": subId,   //userId
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
            throw new Error("Failed to favorite image");
        }
        // Update UI to reflect the favorited state
        return response.json();
    }).then(data => {
        alert(data.message);
        console.log(data)
    }).catch(error => {
        console.error('Error:', error);
    });
}

// Request to get the votes by 'sub_id'(User)
async function getVotesByUserId(subId) {
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
        //console.log(votes); // array of voted 
        console.log(votes[0].image_id);
        return votes;
    } catch (error) {
        console.log("Error fetching votes:", error);
    }
}

getVotesByUserId(userId);
    /* .then(() => {
        // Process the retrieved votes
        console.log(`Votes for user, userId: ${userId}`);
        console.log(response[0]);
    }).catch(error => {
        console.error(error);
    }); */

console.log(getVotesByUserId(userId)); //returns Promise

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
    
    /* axios.post(apiUrl, 
        {headers: {"x-api-key": API_KEY}},
        {data: {"image_id": imgId}}
    ).then(response => {
        console.log('Cat added to favorites:', response.data);
    }).catch(error => {
        console.error("Error:", error);
    });   
}

 */