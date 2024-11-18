// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(card, deleteFunc) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card["link"];
  cardElement.querySelector(".card__image").alt = card["name"];
  cardElement.querySelector(".card__title").textContent = card["name"];
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunc);
  return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {
  event.target.parentElement.remove();
}

// Вывести карточки на страницу
placesList = document.querySelector(".places__list");

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});
