import { deleteCard, deleteLike, putLike } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(card, profileID, callbacks) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeButtonLikes = cardElement.querySelector(
    ".card__like-button-likes"
  );

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeButtonLikes.textContent = card.likes.length;

  cardElement.dataset.id = card._id;

  if (profileID === card.owner._id) {
    cardDeleteButton.addEventListener("click", () =>
      callbacks.removeCard(cardElement)
    );
  } else {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  }

  cardLikeButton.addEventListener("click", () =>
    callbacks.handleLike(cardLikeButton, cardLikeButtonLikes, card, profileID)
  );

  if (checkLike(card, profileID))
    cardLikeButton.classList.add("card__like-button_is-active");

  cardImage.addEventListener("click", () => callbacks.handleImageClick(card));

  return cardElement;
}

// Функция удаления карточки
export function removeCard(cardElement) {
  deleteCard(cardElement.dataset.id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Проверка лайка
function checkLike(card, profileID) {
  return card.likes.some((item) => {
    return item._id === profileID;
  });
}

// Функция лайка
export function handleLike(
  cardLikeButton,
  cardLikeButtonLikes,
  card,
  profileID
) {
  if (checkLike(card, profileID)) {
    deleteLike(card._id)
      .then((res) => {
        card.likes = Array.from(res.likes);
        cardLikeButtonLikes.textContent = card.likes.length;

        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(card._id)
      .then((res) => {
        card.likes = Array.from(res.likes);
        cardLikeButtonLikes.textContent = card.likes.length;

        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
