export function updateProfile(profileElements, newData) {
  if (newData.title) profileElements.title.textContent = newData.title;
  if (newData.description)
    profileElements.description.textContent = newData.description;
  if (newData.image)
    profileElements.imageDiv.style[
      "background-image"
    ] = `url('${newData.image}')`;
}
