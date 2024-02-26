import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import { createCurrentWeatherCard } from "./components.js";
import { createForecastViewToggler } from "./utils.js";
import {
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderForecastDisplay,
} from "./renderCards.js";

// Initialize app
async function initialize() {
  const weatherData = await getWeatherData();
  const parsedData = parseWeatherData(weatherData);
  const forecastArr = weatherData.forecast.forecastday;
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );

  // Create current weather card
  const currentWeatherCard = createCurrentWeatherCard(
    parsedData.time,
    parsedData.currentTemp.far,
    parsedData.currentTemp.cels,
    parsedData.condition.icon,
    parsedData.location,
    parsedData.condition.text,
    parsedData.feelsLike.far,
    parsedData.feelsLike.cels,
    parsedData.humidity,
    forecastArr[0].day.daily_chance_of_rain,
    parsedData.wind.mi,
    parsedData.wind.km
  );
  let forecastViewToggler = createForecastViewToggler();

  currentWeatherCard.createCard();
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

initialize();
