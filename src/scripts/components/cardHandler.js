export function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = evt.target["place-name"];
  const linkInput = evt.target["link"];
  const card = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  evt.target.reset();
  return card;
}
