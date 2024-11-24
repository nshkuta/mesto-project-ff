import "../pages/index.css";

import {initialCards} from "./components/cards.js";
import {createCard, likeFunc, deleteCard} from "./components/card.js";
import {openModal, closeModal} from "./components/modal.js";
import {handleProfileFormSubmit} from "./components/profileHandler.js";
import {handlePlaceFormSubmit } from "./components/cardHandler.js";

//Контейнер карточек
const placesList = document.querySelector(".places__list");

//Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Модальные окна
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

//Профиль
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Формы
const profileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

// Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, likeFunc, cardPopup));
});

// Попап с фотографией
function cardPopup(cardElement){
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  const cardTitle = cardElement.querySelector(".card__title").textContent;
  image.src = cardElement.querySelector(".card__image").src;
  image.alt = cardTitle;
  caption.textContent = cardTitle;
  openModal(popupImage);  
}

//События на кнопки и формы
profileEditButton.addEventListener("click", () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openModal(popupEdit);
});
profileAddButton.addEventListener("click", () => openModal(popupNewCard));

profileForm.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt, profileTitle, profileDescription)
  closeModal(evt.target.closest(".popup"));
});

newPlaceForm.addEventListener("submit", (evt) => {
  const card = handlePlaceFormSubmit(evt, newPlaceForm);
  placesList.prepend(createCard(card, deleteCard, likeFunc, cardPopup));
  closeModal(evt.target.closest(".popup"));
});


