export function handlePlaceFormSubmit(evt, placeForm) {
    evt.preventDefault();
    const placeNameInput = placeForm["place-name"];
    const linkInput = placeForm["link"];
      const card = {
        name: placeNameInput.value,
        link: linkInput.value,
      };
      placeNameInput.value = "";
      linkInput.value = "";
  return card;
    
}
  