import { parseWeatherData, getUserLocationWeatherData } from "./api.js";
import { createCurrentWeatherCard } from "./components.js";
import { createForecastViewToggler } from "./utils.js";
import {
  renderCurrentWeatherCard,
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderForecastDisplay,
} from "./renderCards.js";

// Initializes app with user location weather data when user presses Enter
let userLocationInput = document.querySelector("#location");

userLocationInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getUserLocationWeatherData().then((userLocationWeatherData) => {
      initialize(userLocationWeatherData);
    });
  }
});

// Initialize app
async function initialize(userLocationWeatherData) {
  const parsedData = parseWeatherData(userLocationWeatherData);
  const forecastArr = userLocationWeatherData.forecast.forecastday;
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
<<<<<<< Updated upstream
  const userLocationInput = document.querySelector("#location");
  let forecastViewToggler = createForecastViewToggler();
  let currentWeatherCard = renderCurrentWeatherCard(forecastArr, parsedData);
=======

  let forecastViewToggler = createForecastViewToggler();
  renderCurrentWeatherCard(forecastArr, parsedData);
>>>>>>> Stashed changes
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
