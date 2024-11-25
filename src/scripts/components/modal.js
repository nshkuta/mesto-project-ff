function closeModalByEsc(evt) {
  if (evt.key === "Escape")
    closeModal(document.querySelector(".popup_is-opened"));
}

function closeModalOverlay(evt) {
  if (evt.currentTarget === evt.target) closeModal(evt.target);
}

export function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
  element.addEventListener("click", closeModalOverlay);
  const closeButton = element.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(element));
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
  element.removeEventListener("click", closeModalOverlay);
}
