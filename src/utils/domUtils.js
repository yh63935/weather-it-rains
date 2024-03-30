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

// Append element(s) to a parent element
function appendEl(parent, ...elements) {
  elements.forEach((el) => {
    parent.append(el);
  });
}

// Clear specified HTML container
function clearContainer(container) {
  container.innerHTML = "";
}

// If it has thunder, shunder should take priority
// If it has snow, it should take priority

// Object that maps key of weather condition to background image file
const backgroundWeatherImages = {
  thunder: "thunder.jpg",
  fog: "fog.jpg",
  overcast: "fog.jpg",
  mist: "fog.jpg",
  snow: "snow.jpg",
  blizzard: "snow.jpg",
  ice: "snow.jpg",
  drizzle: "rain.jpg",
  rain: "rain.jpg",
  sleet: "rain.jpg",
  sunny: "sunny.jpg",
};

