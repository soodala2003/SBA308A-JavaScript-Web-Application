import { favourite, clear } from "./main.js";

export function createCarouselItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#carouselItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
    //template.content: This is a DocumentFragment object representing the contents of the template.
    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
  
    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", () => {
        favourite(imgId);
    });
  
    return clone;
}

/* export function clear() {
    const carousel = document.querySelector("#carouselInner");
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
} */

export function appendCarousel(element) {
    const carousel = document.querySelector("#carouselInner");
   
    if (!carousel.firstElementChild) {
        carousel.appendChild(element);
    } else {
        const elementId = "carouselInner";
        clear(elementId);
        carousel.appendChild(element);
    }    
}
  
