export function handleProfileFormSubmit(evt, profileTitle, profileDescription) {
  evt.preventDefault();
 
  const nameInput = evt.target.name;
  const descriptionInput = evt.target.description;
  if (nameInput.value || descriptionInput.value) {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
  }  
}
