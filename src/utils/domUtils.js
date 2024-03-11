// Utility functions for DOM manipulation

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

// Clear specified HTML container
function clearContainer(container) {
  container.innerHTML = "";
}

export { createEl, appendEl, clearContainer };
