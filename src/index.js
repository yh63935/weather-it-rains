import { parseWeatherData, getUserLocationWeatherData } from "./api.js";
import { createCurrentWeatherCard } from "./components.js";
import { clearContainer } from "./utils/domUtils.js";
import { createForecastViewToggler } from "./utils/formatUtils.js";
import {
  renderCurrentWeatherCard,
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderForecastDisplay,
} from "./renderCards.js";

initializeWeatherAppWithLocation("San Jose");

// Initializes app with user location weather data when user presses Enter
let userLocationInput = document.querySelector("#location");

userLocationInput.addEventListener("keyup", (e) => {
  const currentWeatherContainer = document.querySelector(
    ".current-weather-container"
  );
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );

  if (e.key === "Enter") {
    let userLocation = userLocationInput.value;
    clearContainer(currentWeatherContainer);
    clearContainer(forecastCardsContainer);
    initializeWeatherAppWithLocation(userLocation);

    // Clear user input after pressing enter
    userLocationInput.value = "";
  }
});

// Initialize weather app with location
function initializeWeatherAppWithLocation(userLocation) {
  getUserLocationWeatherData(userLocation)
    .then((userLocationWeatherData) => {
      initialize(userLocationWeatherData);
    })
    .catch((err) => {
      console.log(`Error in initializing weather app: ${err.message}`);
    });
}

// Initialize app
async function initialize(userLocationWeatherData) {
  const parsedData = parseWeatherData(userLocationWeatherData);
  const forecastArr = userLocationWeatherData.forecast.forecastday;
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
  const userLocationInput = document.querySelector("#location");
  let forecastViewToggler = createForecastViewToggler();
  let currentWeatherCard = renderCurrentWeatherCard(forecastArr, parsedData);
  renderDayWeatherCards(forecastArr, parsedData);

  // Display associated hourly forecast for the selected button of the day card when clicked
  forecastCardsContainer.addEventListener("click", (e) => {
    const selectedCard = e.target.closest(".day-weather-card");
    const selectedBtn = e.target.closest(".day-weather-card button");
    if (selectedBtn && selectedCard) {
      renderForecastDisplay(
        renderHourlyWeatherCards,
        forecastViewToggler,
        selectedCard,
        forecastArr
      );
    }
  });

  // Display day forecast when displayDayForecastBtn is clicked
  const displayDayForecastBtn = document.querySelector(".display-day-forecast");
  displayDayForecastBtn.addEventListener("click", () => {
    renderForecastDisplay(
      renderDayWeatherCards,
      forecastViewToggler,
      forecastArr,
      parsedData
    );
  });

  // Display imperial/metric units when convertImperialMetricBtn is clicked
  const convertImperialMetricBtn = document.querySelector(
    ".convert-imperial-metric"
  );
  convertImperialMetricBtn.addEventListener("click", () => {
    currentWeatherCard.toggleImperialMetric();
    const dayWeatherCards = getDayWeatherCards();
    const hourlyWeatherCards = getHourlyWeatherCards();
    dayWeatherCards.forEach((dayWeatherCard) => {
      dayWeatherCard.toggleImperialMetric();
    });
    hourlyWeatherCards.forEach((hourlyWeatherCard) => {
      hourlyWeatherCard.toggleImperialMetric();
    });
  });
}
