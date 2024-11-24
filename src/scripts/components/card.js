// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(card, deleteFunc, likeFunc, cardPopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardDeleteButton.addEventListener("click", () => deleteFunc(cardElement));
  cardLikeButton.addEventListener("click", () => likeFunc(cardElement));
  cardImage.addEventListener("click", () => cardPopup(cardElement));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка
export function likeFunc(cardElement) {
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    cardLikeButton.classList.remove("card__like-button_is-active");
  } else {
    cardLikeButton.classList.add("card__like-button_is-active");
  }  
}
