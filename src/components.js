// Create element with specified text and class
function createEl(el, text, className) {
  const element = document.createElement(el);
  element.innerText = text;

  // Only add class if provided
  if (className) {
    element.classList.add(className);
  }

  return element;
}
// Append element(s) to a parent
function appendEl(parent, ...elements) {
  elements.forEach((el) => {
    parent.append(el);
  });
}

export default weatherCard;
