// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(card, deleteFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardDeleteButton.addEventListener("click", () => deleteFunc(cardElement));

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Вывести карточки на страницу
placesList = document.querySelector(".places__list");

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});
