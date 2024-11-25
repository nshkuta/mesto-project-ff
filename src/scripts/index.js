import "../pages/index.css";

import { initialCards } from "./components/cards.js";
import { createCard, handleLike, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { handleProfileFormSubmit } from "./components/profileHandler.js";
import { handlePlaceFormSubmit } from "./components/cardHandler.js";

//Контейнер карточек
const placesList = document.querySelector(".places__list");

//Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

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

//Попап с картинкой
const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

//Коллбеки карточки
const cardCallbacks = {
  deleteCard: deleteCard,
  handleLike: handleLike,
  handleImageClick: handleImageClick,
};

// Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, cardCallbacks));
});

// Попап с фотографией
function handleImageClick(card) {
  popupImageImage.src = card.link;
  popupImageImage.alt = card.name;
  popupImageCaption.textContent = card.name;
  openModal(popupImage);
}

//События на кнопки и формы
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

profileEditButton.addEventListener("click", () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openModal(popupEdit);
});
profileAddButton.addEventListener("click", () => openModal(popupNewCard));

profileForm.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt, profileTitle, profileDescription);
  closeModal(popupEdit);
});

newPlaceForm.addEventListener("submit", (evt) => {
  const card = handlePlaceFormSubmit(evt);
  placesList.prepend(createCard(card, cardCallbacks));
  closeModal(popupNewCard);
});
