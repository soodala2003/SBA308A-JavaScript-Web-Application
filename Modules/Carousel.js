export function createCarouselItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#carouselItemTemplate");
    const clone = template.content.firstElementChild.cloneNode(true);
  
    const img = clone.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
  
    const favBtn = clone.querySelector(".favourite-button");
    favBtn.addEventListener("click", () => {
        favourite(imgId);
    });
  
    return clone;
}
  
export function clear() {
    const carousel = document.querySelector("#carouselInner");
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }
}
  
export function appendCarousel(element) {
    const carousel = document.querySelector("#carouselInner");
  
    const activeItem = document.querySelector(".carousel-item.active");
    if (!activeItem) element.classList.add("active");
  
    carousel.appendChild(element);
}
  