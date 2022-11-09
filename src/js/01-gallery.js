import { galleryItems } from "./gallery-items.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
var lightbox;

galleryContainer.innerHTML = makeGalleryMarkup(galleryItems);

galleryContainer.addEventListener("click", onClickGalleryImage);

window.addEventListener("keydown", closeModalbyEsc);

function makeGalleryMarkup(gallery) {
  const markup = gallery.map(({ preview, original, description }) => {
    return `
      <a class="gallery__item" href="${original}">
        <img
          class="gallery__image"
          src="${preview}" 
          alt="${description}"
        />
      </a>
    `;
  });
  return markup.join("");
}

function onClickGalleryImage(e) {
  e.preventDefault();
  const isGalleryImage = e.target.classList.contains("gallery__image");

  if (!isGalleryImage) {
    return;
  }
}

lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  fadeSpeed: 250,
  captionDelay: 250,
});

function closeModalbyEsc(e) {
  if (e.code === "Escape") {
    lightbox.close();
  }
}
