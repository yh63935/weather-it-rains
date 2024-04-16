import { getDayHourIntervals } from "../renderCards.js";

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

/* Object that maps key of weather condition to background image file
// backgroundWeatherImages properties are ordered in terms of priority, ie if a conditionText contains both thunder and rain words, 
it will return the backgroundWeatherImage of thunder
*/
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
  cloudy: "cloudy.jpg",
  sunny: "sunny.jpg",
  clear: "sunny.jpg",
};

// Return background weather image based on weather condition text
function getWeatherImageFromConditionText(conditionText) {
  // Format conditionText to be all lowercase
  const conditionTextLower = conditionText.toLowerCase();

  for (const [weatherCondition, backgroundWeatherImage] of Object.entries(
    backgroundWeatherImages
  )) {
    if (conditionTextLower.includes(weatherCondition)) {
      return backgroundWeatherImage;
    }
  }

  // Default to sunny image from backgroundWeatherImages if there is no valid image
  return backgroundWeatherImages.sunny;
}

// Set background image of backgroundImageContainer based on backgroundWeatherImage
function setBackgroundImage(backgroundImageContainer, backgroundWeatherImage) {
  backgroundImageContainer.style.backgroundImage = `url(./css/assets/${backgroundWeatherImage})`;
}

// Set nxt hour interval button to disabled or enabled depending on if the interval's end hour is 23
function setNxtHrIntervalButtonDisabledState(
  dayWeatherCardIndex,
  button,
  interval
) {
  // Get the specific day's intervals
  const dayHourIntervals = getDayHourIntervals(dayWeatherCardIndex);

  if (dayHourIntervals[interval].endHour == 23) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

export {
  createEl,
  appendEl,
  clearContainer,
  getWeatherImageFromConditionText,
  setBackgroundImage,
  setNxtHrIntervalButtonDisabledState,
};
