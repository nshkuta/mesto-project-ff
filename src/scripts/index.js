import "../pages/index.css";

import { createCard, handleLike, removeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getCards,
  getProfile,
  addCard,
  saveProfile,
  setAvatar,
} from "./components/api.js";
import { updateProfile } from "./components/profile.js";

//Контейнер карточек
const placesList = document.querySelector(".places__list");

//Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const avatar = document.querySelector(".profile__image");

// Модальные окна
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_edit-avatar");

//Профиль
const profileElements = {
  title: document.querySelector(".profile__title"),
  description: document.querySelector(".profile__description"),
  imageDiv: document.querySelector(".profile__image"),
};

//Формы
const profileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const avatarForm = document.forms["edit-avatar"];

//Попап с картинкой
const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

//Коллбеки карточки
const cardCallbacks = {
  removeCard: removeCard,
  handleLike: handleLike,
  handleImageClick: handleImageClick,
};

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
  profileForm.name.value = profileElements.title.textContent;
  profileForm.description.value = profileElements.description.textContent;

  clearValidation(profileForm, validationConfig);
  openModal(popupEdit);
});

addButton.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupNewCard);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameInput = evt.target.name;
  const descriptionInput = evt.target.description;
  const submitButton = evt.target.querySelector(".popup__button");

  const newProfile = {
    title: nameInput.value,
    description: descriptionInput.value,
  };

  toggleButtonLoading(submitButton);

  saveProfile(newProfile)
    .then((res) => {
      const savedProfile = {
        title: res.name,
        description: res.about,
      };
      updateProfile(profileElements, savedProfile);
      closeModal(popupEdit);
      toggleButtonLoading(submitButton);
    })
    .catch((err) => {
      toggleButtonLoading(submitButton);
      console.log(err);
    });
});

newPlaceForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const placeNameInput = evt.target["place-name"];
  const linkInput = evt.target["link"];
  const submitButton = evt.target.querySelector(".popup__button");
  toggleButtonLoading(submitButton);

  let card = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  addCard(card)
    .then((res) => {
      placesList.prepend(createCard(res, res.owner._id, cardCallbacks));
      closeModal(popupNewCard);
      toggleButtonLoading(submitButton);
      evt.target.reset();
    })
    .catch((err) => {
      toggleButtonLoading(submitButton);
      console.log(err);
    });
});

avatar.addEventListener("click", (evt) => {
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  toggleButtonLoading(submitButton);

  const newAvatar = evt.target.avatar.value;
  setAvatar(newAvatar)
    .then(() => {
      updateProfile(profileElements, {
        image: newAvatar,
      });
      closeModal(popupAvatar);
      toggleButtonLoading(submitButton);
      evt.target.reset();
    })
    .catch((err) => {
      toggleButtonLoading(submitButton);
      console.log(err);
    });
});

//Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

//Запрос данных по пользователю и карточкам
const cardsPromise = getCards();
const profilePromise = getProfile();

Promise.all([cardsPromise, profilePromise])
  .then(([cards, profile]) => {
    cards.forEach((card) => {
      const newProfile = {
        title: profile.name,
        description: profile.about,
        image: profile.avatar,
        id: profile._id,
      };
      updateProfile(profileElements, newProfile);

      placesList.append(createCard(card, newProfile.id, cardCallbacks));
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Текст на кнопке
function toggleButtonLoading(buttonElement) {
  const buttonText = buttonElement.textContent;
  buttonElement.textContent = buttonElement.dataset.loading;
  buttonElement.dataset.loading = buttonText;
}
